import React, { useEffect, useState, useRef } from 'react';

const faqData = [
  { keywords: ['cancel', 'cancellation'], answer: 'You can request a booking cancellation from the "My Bookings" page if your booking starts in more than 24 hours.' },
  { keywords: ['refund'], answer: 'Refunds are processed within 5-7 business days after cancellation approval.' },
  { keywords: ['location', 'where'], answer: 'You can view all available locations on the "Our Locations" page.' },
  { keywords: ['price', 'cost'], answer: 'Pricing depends on the vehicle and rental duration. Search using our filters to see exact prices.' },
  { keywords: ['contact', 'support'], answer: 'You can reach our support team via the "Contact Us" page or by emailing support@brajrides.com.' },
  { keywords: ['hi', 'hello', 'hey', 'greetings'], answer: 'Hello! How can I assist you today?' },
  { keywords: ['help', 'assist', 'support'], answer: 'How may I help you? Feel free to ask your question.' },
  { keywords: ['how are you', 'how do you do', 'how are you doing'], answer: "I'm doing great, thank you for asking! How can I assist you?" },
  { keywords: ['thank you', 'thanks'], answer: "You're welcome! If you need anything else, just let me know." },
  { keywords: ['vehicle', 'bike', 'cars'], answer: 'We offer a variety of vehicles including bikes, scooters, and cars for rent. Check our "Vehicles" section for more details.' },
  { keywords: ['rental policy', 'terms', 'agreement'], answer: 'You can find our rental policy and terms on the "Terms and Conditions" page.' },
  { keywords: ['booking', 'reserve', 'book'], answer: 'You can book a vehicle directly through the "Book Ride" page. Just select the location and vehicle.' },
  { keywords: ['availability', 'available', 'in stock'], answer: 'Vehicle availability is shown in real-time on the "Pricing" and "Booking" pages.' },
  { keywords: ['payment', 'pay', 'checkout'], answer: 'We accept multiple payment methods, including credit/debit cards and Authorize.Net. Check out on the "Checkout" page.' },
  { keywords: ['membership', 'loyalty', 'discounts'], answer: 'We offer special discounts for loyal customers. Check the "Pricing" page for more details on ongoing offers.' },
  { keywords: ['working hours', 'hours of operation'], answer: 'We are open from 9 AM to 6 PM, Monday to Saturday.' },
  { keywords: ['holiday', 'off days', 'closed'], answer: 'We are closed on Sundays and public holidays. Please check our "Contact Us" page for more details.' },
  { keywords: ['contact us', 'get in touch', 'reach out'], answer: 'You can contact us via the "Contact Us" page or send an email to support@brajrides.com.' },
  { keywords: ['terms', 'policy', 'rules'], answer: 'Please refer to our "Terms and Conditions" page for all rental policies and rules.' },
  { keywords: ['account', 'login', 'register'], answer: 'You can log in or register through the "Account" page to manage your bookings and preferences.' },
];

const getFaqAnswer = (userMessage) => {
  const lowerMsg = userMessage.toLowerCase();
  for (const faq of faqData) {
    for (const keyword of faq.keywords) {
      if (lowerMsg.includes(keyword)) {
        return faq.answer;
      }
    }
  }
  return "Sorry, I couldn't find an answer to that. Please contact support.";
};

const FaqBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null); 
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    { type: 'bot', text: 'Hi! I\'m your assistant. How can I help you today?' },
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    const botReply = { type: 'bot', text: getFaqAnswer(input) };
    
    setChat((prev) => [...prev, userMsg, botReply]);
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
