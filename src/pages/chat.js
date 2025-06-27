import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';
import ChatNavbar from '@/components/Navbar/chatNavbar';
import Cookies from 'js-cookie';
import Image from 'next/image';
// import { useRouter } from 'next/router'; // Added for redirect
let socket;

export async function getServerSideProps(context) {
  // Fix: Use require for 'cookie' in getServerSideProps to avoid undefined in SSR
  const cookieLib = require('cookie');
  const cookies = cookieLib.parse(context.req.headers.cookie || '');
  const userType = cookies.userType;
  const token = cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  let list = [];

  if (userType === 'doctor') {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/api/getPatientsForDoctor`,
      {
        headers: { Cookie: context.req.headers.cookie || '' },
      }
    );

    const data = await res.json();
    list = data.patients || [];
  } else if (userType) {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/api/getDoctors`,
      {
        headers: { Cookie: context.req.headers.cookie || '' },
      }
    );
    const data = await res.json();
    list = data.doctors || [];
  }

  return {
    props: {
      initialList: list,
    },
  };
}

const Chat = ({ initialList = [] }) => {
  const [list, setList] = useState(initialList); // doctors or patients
  const [selected, setSelected] = useState(null); // selected doctor or patient
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [initialUserType, setInitialUserType] = useState(null);
  const [initialUserUid, setInitialUserUid] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get userType, user_uid from cookies
    const userType = Cookies.get('userType');
    const user_uid = Cookies.get('user_uid');
    setInitialUserType(userType);
    setInitialUserUid(user_uid);
    if (!socket && typeof window !== 'undefined') {
      socket = io(process.env.NEXT_PUBLIC_CHAT_SERVER_URL);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    if (!selected || !socket) return;
    let doctor_uid, patient_uid;
    if (initialUserType === 'doctor') {
      doctor_uid = initialUserUid;
      patient_uid = selected.uid;
    } else {
      doctor_uid = selected.uid;
      patient_uid = initialUserUid;
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
  }, [selected, initialUserUid, initialUserType]);

  const sendMessage = () => {
    if (!message.trim() || !selected || !socket) return;
    let doctor_uid, patient_uid;
    if (initialUserType === 'doctor') {
      doctor_uid = initialUserUid;
      patient_uid = selected.uid;
    } else {
      doctor_uid = selected.uid;
      patient_uid = initialUserUid;
    }
    socket.emit('sendMessage', {
      sender: initialUserType || 'user',
      message,
      user_uid: patient_uid,
      doctor_uid,
    });
    setMessage('');
  };

  // UI labels
  const listTitle = initialUserType === 'doctor' ? 'Patients' : 'Doctors';

  const getDisplayName = (item) =>
    initialUserType === 'doctor'
      ? item.fullname || item.name || item.email
      : `${item.firstName} ${item.lastName}`;

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {/* List (Doctors or Patients) */}
      <div className='w-2/12 flex flex-col gap-2 bg-[#071c3f] text-white p-1 overflow'>
        <div className='flex justify-between items-center px-2 py-3 font-medium text-2xl border-b-1 border-[#334155] min-h-8'>
          <Link
            href='/'
            type='button'
            className='text-white bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center'
          >
            {'<'}
          </Link>
          {listTitle}
        </div>
        {list.map((item) => (
          <div
            key={item.uid}
            className={`px-4 flex flex-col gap-2 rounded-xl py-3 cursor-pointer border-b border-[#334155] ${
              selected?.uid === item.uid
                ? 'bg-[#2563eb] font-bold'
                : 'bg-transparent font-normal'
            }`}
            onClick={() => setSelected(item)}
          >
            {getDisplayName(item)}
            {initialUserType !== 'doctor' &&
              Array.isArray(item.specialization) &&
              item.specialization.length > 0 && (
                <div
                  className={`${
                    selected?.uid === item.id ? 'font-semibold' : 'font-normal'
                  } text-xs font-medium text-gray-300`}
                >
                  {item.specialization.join(', ')}
                </div>
              )}
          </div>
        ))}
      </div>
      {/* Chat Window */}
      <div className='flex flex-col bg-white w-10/12'>
        <div className='border-b-1 flex justify-between items-center gap-2 p-4 border-[#e5e7eb] font-medium text-xl bg-[#f1f5f9]'>
          {selected ? (
            <div className='flex justify-center items-center gap-2'>
              <div className='font-semibold text-xl'>
                {getDisplayName(selected)}
              </div>
              {/* Only show specialization for doctors */}
              {initialUserType !== 'doctor' &&
                Array.isArray(selected.specialization) &&
                selected.specialization.length > 0 && (
                  <div className='text-sm text-gray-500'>
                    {'('}
                    {selected.specialization.join(', ')}
                    {')'}
                  </div>
                )}
            </div>
          ) : (
            <div className='font-medium text-xl'>
              Select a {initialUserType === 'doctor' ? 'patient' : 'doctor'} to
              chat
            </div>
          )}
          <ChatNavbar className='border border-black' />
        </div>
        <div className='flex-1  overflow-y-auto p-3 bg-[#f8fafc]'>
          {messages.length > 0
            ? messages.map((msg, idx) => {
                const isLast = idx === messages.length - 1;
                const isUser = msg.sender === initialUserType;
                const isDoctor = msg.sender === 'doctor';
                const isPatient = msg.sender === 'patient';
                const displayName = isUser ? 'You' : msg.sender;

                // Decide the image based on the sender role
                const imageSrc = isDoctor
                  ? 'https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747493127/nczsnx2iewsmbo8vuv0m.png' // Replace with your doctor logo path
                  : 'https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747493384/f1siona09tbsca88ftlv.png'; // Replace with your patient logo path

                return (
                  <div
                    key={idx}
                    ref={isLast ? messagesEndRef : null}
                    className={`mb-3 flex items-end ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Logo on left if NOT user */}
                    {!isUser && (
                      <Image
                        src={imageSrc}
                        alt={msg.sender}
                        width={32}
                        height={32}
                        className='lg:w-8 lg:h-8 h-6 w-6 mr-2 mb-2'
                      />
                    )}

                    {/* Message bubble */}
                    <div
                      className={`px-2 py-2 max-w-[50%] break-words ${
                        isUser
                          ? 'bg-[#2563eb] text-white rounded-l-md rounded-t-md'
                          : 'bg-[#34d76a] text-white rounded-r-md rounded-t-md'
                      }`}
                    >
                      <div className='text-xs text-gray-200 font-bold mb-1'>
                        {displayName}
                      </div>
                      <div>{msg.message}</div>
                    </div>

                    {/* Logo on right if user */}
                    {isUser && (
                      <Image
                        src={imageSrc}
                        alt={msg.sender}
                        width={24}
                        height={24}
                        className='lg:w-6 lg:h-6 h-4 w-4 ml-2 mb-2'
                      />
                    )}
                  </div>
                );
              })
            : (
                <div className='text-[#64748b] mt-8'>
                  Select a {initialUserType === 'doctor' ? 'patient' : 'doctor'}{' '}
                  to start chatting.
                </div>
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
                : `Select a ${
                    initialUserType === 'doctor' ? 'patient' : 'doctor'
                  } to chat`
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
              selected && message.trim()
                ? 'cursor-pointer opacity-100'
                : 'cursor-not-allowed opacity-60'
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
