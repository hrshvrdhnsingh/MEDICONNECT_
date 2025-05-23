import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import Link from 'next/link';

const socket = io(process.env.NEXT_PUBLIC_CHAT_SERVER_URL); // Connect to the backend server

const Chat = () => {
  const user_uid = Cookies.get('user_uid');
  const userType = Cookies.get('userType');
  const token = Cookies.get('token');

  // console.log('User UID:', user_uid);
  // console.log('User Type:', userType);

  const [list, setList] = useState([]); // doctors or patients
  const [selected, setSelected] = useState(null); // selected doctor or patient
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const f = async () => {
      const res = await fetch(`/api/check-user-or-doctor?uid=${user_uid}`);
      console.log('The response is:', res);
    };
    f();

    const emailCheck = async () => {
      const response = await fetch('/api/check-email-exists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
    emailCheck();

  }, []);
  // Fetch doctors (for user) or patients (for doctor)
  const fetchList = async () => {
    if (userType === 'doctor') {
      // Fetch patients who have chatted with this doctor
      const res = await fetch('/api/getPatientsForDoctor');
      const data = await res.json();
      console.log('Patients', data);
      setList(data.patients || []);
    } else {
      // Fetch all doctors
      const res = await fetch('/api/getDoctors');
      const data = await res.json();
      console.log('Doctors', data)
      setList(data.doctors || []);
    }
  };

  useEffect(() => {
    fetchList();
  }, [userType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Listen for new messages globally to update patient list for doctors
  // useEffect(() => {
  //   if (userType !== 'doctor') return;
  //   const handleNewMessage = () => {
  //     fetchList();
  //   };
  //   socket.on('receiveMessage', handleNewMessage);
  //   return () => {
  //     socket.off('receiveMessage', handleNewMessage);
  //   };
  // }, [userType]);

  // Join room and fetch previous messages when selection changes
  useEffect(() => {
    if (!selected) return;
    let doctor_uid, patient_uid;
    if (userType === 'doctor') {
      doctor_uid = user_uid;
      patient_uid = selected.uid;
    } else {
      doctor_uid = selected.uid;
      patient_uid = user_uid;
    }
    socket.emit('joinRoom', { user_uid: patient_uid, doctor_uid });

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages || []);
    });

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('receiveMessage');
    };
  }, [selected, user_uid, userType]);

  const sendMessage = () => {
    if (!message.trim() || !selected) return;
    let doctor_uid, patient_uid;
    if (userType === 'doctor') {
      doctor_uid = user_uid;
      patient_uid = selected.uid;
    } else {
      doctor_uid = selected.uid;
      patient_uid = user_uid;
    }
    socket.emit('sendMessage', {
      sender: userType || 'user',
      message,
      user_uid: patient_uid,
      doctor_uid,
    });
    setMessage('');
  };

  // UI labels
  const listTitle = isClient
    ? userType === 'doctor'
      ? 'Patients'
      : 'Doctors'
    : ''; // Avoid SSR/CSR mismatch

  const getDisplayName = (item) =>
    userType === 'doctor'
      ? item.fullname || item.name || item.email
      : `${item.firstName} ${item.lastName}`;

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {/* List (Doctors or Patients) */}
      <div className='w-2/12 flex flex-col gap-2 bg-[#071c3f] text-white p-1 overflow'>
        <div className='flex justify-between items-center px-2 py-3 font-medium text-2xl border-b-1 border-[#334155] min-h-8'>
          <Link href='/' type="button" className="text-white bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center">{'<'}</Link>
          {listTitle}
        </div>
        {list.map((item) => (
          <div 
            key={item.uid}
            className={`px-4 flex flex-col gap-2 rounded-xl py-3 cursor-pointer border-b border-[#334155] ${
              selected?.uid === item.uid ? 'bg-[#2563eb] font-bold' : 'bg-transparent font-normal'
            }`}
            onClick={() => setSelected(item)}
          >
            {getDisplayName(item)}
            {userType !== 'doctor' && Array.isArray(item.specialization) && item.specialization.length > 0 && (
              <div className={`${selected?.uid === item.id ? "font-semibold" : "font-normal"} text-xs font-medium text-gray-300`}>
                {item.specialization.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Chat Window */}
      <div className='flex flex-col bg-white w-10/12'>
        <div className='border-b-1 flex items-center gap-2 p-4 border-[#e5e7eb] font-medium text-xl bg-[#f1f5f9]'>
          {selected ? (
            <>
              <div className='font-semibold text-xl'>{getDisplayName(selected)}</div>
              {/* Only show specialization for doctors */}
              {userType !== 'doctor' && Array.isArray(selected.specialization) && selected.specialization.length > 0 && (
                <div className='text-sm text-gray-500'>{'('}{selected.specialization.join(', ')}{')'}</div>
              )}
            </>
          ) : isClient ? (
            <div className='font-medium text-xl'>
              Select a {userType === 'doctor' ? 'patient' : 'doctor'} to chat
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='flex-1  overflow-y-auto p-3 bg-[#f8fafc]'>
          {messages.length > 0 ? (
              messages.map((msg, idx) => {
                const isLast = idx === messages.length - 1;
                const isUser = msg.sender === userType;
                const isDoctor = msg.sender === 'doctor';
                const isPatient = msg.sender === 'patient';
                const displayName = isUser ? 'You' : msg.sender;

                // Decide the image based on the sender role
                const imageSrc = isDoctor
                  ? 'https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747493127/nczsnx2iewsmbo8vuv0m.png' // Replace with your doctor logo path
                  : 'https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747493384/f1siona09tbsca88ftlv.png'; // Replace with your patient logo path

                return (
                  <div
                    key={idx} ref={isLast ? messagesEndRef : null}
                    className={`mb-3 flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Logo on left if NOT user */}
                    {!isUser && (
                      <img
                        src={imageSrc}
                        alt={msg.sender}
                        className="lg:w-8 lg:h-8 h-6 w-6 mr-2 mb-2"
                      />
                    )}

                    {/* Message bubble */}
                    <div
                      className={`px-2 py-2 max-w-[50%] break-words ${
                        isUser ? 'bg-[#2563eb] text-white rounded-l-md rounded-t-md' : 'bg-[#34d76a] text-white rounded-r-md rounded-t-md'
                      }`}
                    >
                      <div className="text-xs text-gray-200 font-bold mb-1">{displayName}</div>
                      <div >{msg.message}</div>
                    </div>

                    {/* Logo on right if user */}
                    {isUser && (
                      <img
                        src={imageSrc}
                        alt={msg.sender}
                        className="lg:w-6 lg:h-6 h-4 w-4 ml-2 mb-2"
                      />
                    )}
                  </div>
                );
              })
            ) : (
            isClient && (
              <div className='text-[#64748b] mt-8'>
                Select a {userType === 'doctor' ? 'patient' : 'doctor'} to start
                chatting.
              </div>
            )
          )}
        </div>
        {/* Input */}
        <div className='p-2 border-t border-[#e5e7eb] bg-[#f1f5f9] flex gap-2'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              selected
                ? 'Type your message...'
                : isClient
                ? `Select a ${
                    userType === 'doctor' ? 'patient' : 'doctor'
                  } to chat`
                : ''
            }
            className={`flex-1 border border-[#cbd5e1] rounded-[6px] py-2 px-3 text-base outline-none ${
              selected ? 'bg-white' : 'bg-[#f1f5f9]'
            }`}
            disabled={!selected}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!selected || !message.trim()}
            className={`bg-[#2563eb] text-white border-none rounded-[6px] py-2 px-[18px] font-semibold ${
              selected && message.trim() ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-60'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
