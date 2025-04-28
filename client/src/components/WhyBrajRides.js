import React from 'react';
import './WhyBrajRides.css';  

const WhyBrajRidesItem = ({ icon, title, description }) => (
  <div className="why-braj-rides-item">
    <div>{icon}</div>
    <h3> {title}</h3>
    <p>{description}</p>
  </div>
);

const WhyBrajRides = () => {
  const reasons = [
    {
      icon: '🚲',
      title: 'Safe Rides',
      description:
        'Your safety is our priority. From sanitizing all bikes before every use, to extensive on-ground safety measures, your rides with Braj Rides will always be safe and reliable.',
    },
    {
      icon: '💼',
      title: 'Flexible Ownership',
      description:
        'Enjoy the freedom of owning a two-wheeler without the hefty down-payments, EMIs, and paperwork. Choose from rent-to-own, monthly/quarterly bookings, and even daily plans.',
    },
    {
      icon: '📱',
      title: 'Smarter Mobility',
      description:
        'With your trusty Braj Rides app, you can choose any bike, make instant payments, get offers, and manage all aspects of your Braj Rides experience right from the comfort of your mobile app.',
    },
    {
      icon: '🅿️',
      title: 'Braj Rides Stations',
      description:
        'Your local Braj Rides Station ensures that your two-wheeler experience is flawless. Get your bike maintained, sanitized, and more at the nearest station.',
    }
  ];

  return (
    <section className="why-braj-rides section">
      <h2 className='heading'>Why Braj Rides?</h2>
      <div className="why-braj-rides-items">
        {reasons.map((reason, index) => (
          <WhyBrajRidesItem 
            key={index} 
            icon={reason.icon} 
            title={reason.title} 
            description={reason.description} 
          />
        ))}
      </div>
    </section>
  );
};

export default WhyBrajRides;
