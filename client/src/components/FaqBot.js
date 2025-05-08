import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

const FaqBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const toggleBot = () => setIsOpen(!isOpen);

  useEffect(() => {
    socket.on('faqAnswer', (data) => {
      setChat((prevChat) => [...prevChat, { type: 'bot', text: data.answer }]);
    });

    return () => socket.off('faqAnswer');
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setChat((prevChat) => [...prevChat, { type: 'user', text: input }]);
    socket.emit('faqQuestion', input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className={`faq-bot-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className="faq-bot-card shadow rounded">
          <div className="faq-bot-header d-flex justify-content-between align-items-center">
            <h6 className="m-0">❓ FAQ Bot</h6>
            <button className="btn btn-sm btn-outline-secondary" onClick={toggleBot}>–</button>
          </div>
          <div className="faq-bot-body">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.type}`}>
                <div className="msg-text">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="faq-bot-input d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary ms-1" onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <button className="faq-bot-toggle btn btn-primary rounded-circle shadow" onClick={toggleBot}>
          ?
        </button>
      )}
    </div>
  );
};

export default FaqBot;
