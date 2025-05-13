const faqData = [
  { keywords: ['cancel', 'cancellation'], answer: 'You can request a booking cancellation from the "My Bookings" page if your booking starts in more than 24 hours.' },
  { keywords: ['refund'], answer: 'Refunds are processed within 5-7 business days after cancellation approval.' },
  { keywords: ['location', 'where'], answer: 'You can view all available locations on the "Our Locations" page.' },
  { keywords: ['price', 'cost'], answer: 'Pricing depends on the vehicle and rental duration. Search using our filters to see exact prices.' },
  { keywords: ['contact', 'support'], answer: 'You can reach our support team via the "Contact Us" page or by emailing support@brajrides.com.' },
  { keywords: ['hi', 'hello', 'hey', 'greetings'], answer: 'Hello! How can I assist you today?' },
  { keywords: ['help', 'assist', 'support'], answer: 'How may I help you? Feel free to ask your question.' },
  { keywords: ['how are you'], answer: 'I\'m doing great, thank you for asking! How can I assist you?' },
  { keywords: ['thank you', 'thanks'], answer: 'You\'re welcome! If you need anything else, just let me know.' },
  { keywords: ['vehicle', 'bike', 'cars'], answer: 'We offer a variety of vehicles including bikes, scooters, and cars for rent. Check our "Vehicles" section for more details.' },
  { keywords: ['rental policy', 'terms', 'agreement'], answer: 'You can find our rental policy and terms on the "Terms and Conditions" page.' },
  { keywords: ['booking', 'reserve', 'book'], answer: 'You can book a vehicle directly through the "Book Ride" page. Just select the location and vehicle.' },
  { keywords: ['availability', 'available'], answer: 'Vehicle availability is shown in real-time on the "Pricing" and "Booking" pages.' },
  { keywords: ['payment', 'checkout'], answer: 'We accept multiple payment methods including credit/debit cards and Authorize.Net.' },
  { keywords: ['membership', 'loyalty'], answer: 'We offer loyalty discounts. Check the "Pricing" page for more details.' },
  { keywords: ['working hours'], answer: 'We are open from 9 AM to 6 PM, Monday to Saturday.' },
  { keywords: ['holiday', 'closed'], answer: 'We are closed on Sundays and public holidays. See "Contact Us" for more.' },
  { keywords: ['account', 'login', 'register'], answer: 'You can log in or register from the "Account" page.' },
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
  return "Sorry, I couldn't find an answer. Please contact support.";
};

module.exports = { getFaqAnswer };
