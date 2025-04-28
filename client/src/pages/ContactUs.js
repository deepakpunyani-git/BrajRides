import React from 'react';
import FAQ from '../components/FAQ'
import ContactUs from '../components/ContactUs';
const Home = () => {
  return (
    <>
        <section className=' my-5 section'>
      <ContactUs />
      <FAQ />
      </section>
    </>
  );
};

export default Home;
