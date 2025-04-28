import React , { useEffect }  from 'react';

import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../redux/actions/locationActions";


import Hero from '../components/Hero';
import FAQ from '../components/FAQ'
import WhyBrajRides from '../components/WhyBrajRides';
import PopularBikes from '../components/PopularBikes';
import AboutUs from '../components/AboutUs';
import Locations from '../components/Locations';

const Home = () => {
  const dispatch = useDispatch();
    const { locations = [] } = useSelector((state) => state.locations || {});
    useEffect(() => {
      dispatch(fetchLocations());
  
    }, [dispatch]);
  
  return (
    <>
      <Hero locations={locations} />
      <AboutUs />
      <PopularBikes />
      <WhyBrajRides />
      <Locations locations={locations} />
      <FAQ />
    </>
  );
};

export default Home;
