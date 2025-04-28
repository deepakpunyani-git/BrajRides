import React from 'react';
import './AboutUs.css';  
import aboutImage from '../assets/about-image.jpg';

const AboutUs = () => {
  return (
    <section className="about-us section" id="about-us">
      <h2 className='heading'>About Braj Rides</h2>
      <div className="about-container">
      <div className="about-image">
          <img src={aboutImage} alt="About Braj Rides" />
        </div>
        <div className="about-text">
        <p>
            Braj Rides is a trusted bike rental service focused on delivering reliable, safe, 
            and affordable mobility solutions. Whether you need a two-wheeler for daily commuting, 
            a quick ride across the city, or a weekend getaway, Braj Rides has got you covered with a fleet 
            of well-maintained bikes and scooters.
          </p>
          <p>
            Our mission is to make your spontaneous trips easy and affordable. 
            We want you to ditch the tour guides and unkept promises to travel whenever you feel like you need a break. 
            At Braj Rides, you will rediscover the joy of travelling as we bring you the best handpicked and 
            carefully curated tours, activities, and attractions in and around your city. 
            We give you the freedom to be spontaneous, because the best holidays are!
          </p>
          <p>
            We believe in making transportation hassle-free and accessible to everyone. 
            Our flexible rental plans and user-friendly mobile app allow customers to choose a bike at their convenience 
            and enjoy seamless rides.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;
