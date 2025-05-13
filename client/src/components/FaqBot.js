import React, { useEffect, useState } from 'react';

const FaqBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const es = new EventSource('/api/faq');

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message) {
        setChat(prev => [...prev, { type: 'bot', text: data.message }]);
      }
    };

    es.onerror = () => {
      console.error('SSE connection lost.');
      es.close();
    };

    return () => es.close();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setChat(prev => [...prev, { type: 'user', text: input }]);

    const res = await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    setChat(prev => [...prev, { type: 'bot', text: data.answer }]);
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
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsOpen(false)}>–</button>
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
        <button className="faq-bot-toggle btn btn-primary rounded-circle shadow" onClick={() => setIsOpen(true)}>
          ?
        </button>
      )}
    </div>
  );
};

export default FaqBot;
