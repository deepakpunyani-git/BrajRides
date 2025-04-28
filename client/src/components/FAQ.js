import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import './FAQ.css';

const FAQ = () => {
  return (
    <section className="faq-section section" id="faq">
      <h2 className="heading">Top FAQs</h2>
      <Container>
        <Accordion defaultActiveKey="0">
          {[
            {
              question: "What is Braj Rides?",
              answer: "Braj Rides is a bike rental service offering long-term and short-term plans for your commuting needs."
            },
            {
              question: "How do I book a bike?",
              answer: "You can book a bike through our website by selecting the city, start date, and end date, then proceed to checkout."
            },
            {
              question: "What are the available payment options?",
              answer: "We accept multiple payment options, including credit/debit cards, net banking, and digital wallets."
            },
            {
              question: "Where can I pick up the bike from?",
              answer: "While booking your bike, you’ll be given an option to select a pick-up location in your vicinity."
            },
            {
              question: "What documents do I need to show while booking?",
              answer: "Customer must handover his/her original Driving License during pick up of bike at the station to the delivery executive. It is mandatory to handover a local address proof/ Company ID copy/ Hotel Receipt/ or any other recognized local address proof to the delivery executive."
            },
            {
              question: "Will I be getting a complimentary helmet?",
              answer: "One complimentary helmet is provided at no additional cost. An additional helmet (Extra) can be rented from the station for Rs. 50. Customers can only rent 2 helmets per booking. A fee of Rs. 800 will be imposed if the helmet is damaged or lost."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>
        </Container>
      </section>
  
  );
};

export default FAQ;
