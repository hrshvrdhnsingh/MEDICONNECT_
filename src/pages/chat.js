import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io('https://mediconnectfork-3.onrender.com'); // Connect to the backend server

const Chat = () => {
  const user_uid = Cookies.get('user_uid');
  const userType = Cookies.get('userType');
  const token = Cookies.get('token');

  console.log('User UID:', user_uid);
  console.log('User Type:', userType);
  // console.log('The token is:', token);
  const [list, setList] = useState([]); // doctors or patients
  const [selected, setSelected] = useState(null); // selected doctor or patient
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

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
      setList(data.patients || []);
    } else {
      // Fetch all doctors
      const res = await fetch('/api/getDoctors');
      const data = await res.json();
      setList(data.doctors || []);
    }
  };

  useEffect(() => {
    fetchList();
  }, [userType]);

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
    <div
      style={{
        display: 'flex',
        height: '80vh',
        background: '#f5f7fa',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 24,
      }}
    >
      {/* List (Doctors or Patients) */}
      <div
        style={{
          width: 260,
          background: '#1e293b',
          color: '#fff',
          padding: 0,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: 16,
            fontWeight: 600,
            fontSize: 20,
            borderBottom: '1px solid #334155',
            minHeight: 28,
          }}
        >
          {listTitle}
        </div>
        {list.map((item) => (
          <div
            key={item.uid}
            style={{
              padding: '14px 18px',
              cursor: 'pointer',
              background:
                selected?.uid === item.uid ? '#334155' : 'transparent',
              borderBottom: '1px solid #334155',
              fontWeight: selected?.uid === item.uid ? 700 : 400,
            }}
            onClick={() => setSelected(item)}
          >
            {getDisplayName(item)}
          </div>
        ))}
      </div>
      {/* Chat Window */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: '1px solid #e5e7eb',
            fontWeight: 600,
            fontSize: 18,
            background: '#f1f5f9',
          }}
        >
          {
            selected
              ? getDisplayName(selected)
              : isClient
              ? `Select a ${
                  userType === 'doctor' ? 'patient' : 'doctor'
                } to chat`
              : '' /* Avoid SSR/CSR mismatch */
          }
        </div>
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            background: '#f8fafc',
          }}
        >
          {selected ? (
            messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 12,
                    textAlign: msg.sender === userType ? 'right' : 'left',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      background:
                        msg.sender === userType ? '#2563eb' : '#e0e7ef',
                      color: msg.sender === userType ? '#fff' : '#22223b',
                      borderRadius: 8,
                      padding: '8px 14px',
                      maxWidth: '70%',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.message}
                  </span>
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>
                    {msg.sender === userType ? 'You' : msg.sender}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', marginTop: 24 }}>
                No messages yet.
              </div>
            )
          ) : (
            isClient && (
              <div style={{ color: '#64748b', marginTop: 24 }}>
                Select a {userType === 'doctor' ? 'patient' : 'doctor'} to start
                chatting.
              </div>
            )
          )}
        </div>
        {/* Input */}
        <div
          style={{
            padding: 16,
            borderTop: '1px solid #e5e7eb',
            background: '#f1f5f9',
            display: 'flex',
            gap: 8,
          }}
        >
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
            style={{
              flex: 1,
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: 16,
              outline: 'none',
              background: selected ? '#fff' : '#f1f5f9',
            }}
            disabled={!selected}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!selected || !message.trim()}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 600,
              cursor: selected && message.trim() ? 'pointer' : 'not-allowed',
              opacity: selected && message.trim() ? 1 : 0.6,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
