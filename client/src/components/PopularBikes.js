import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularVehicles } from '../redux/actions/vehicleActions';
import './PopularBikes.css';

const PopularBikes = () => {
  const dispatch = useDispatch();

  const vehicleState = useSelector((state) => state.vehicleData);
  const { popularVehicles, loading, error } = vehicleState;

  useEffect(() => {
    dispatch(fetchPopularVehicles());
  }, [dispatch]);

  return (
    <section className="popular-bikes section">
      <h2 className="heading">Popular Bikes for Rent</h2>

      {loading ? (
        <p>Loading popular bikes...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="bikes-container">
          {popularVehicles.map((bike, index) => (
            <div key={index} className="bike-item">
              {bike.brand} {bike.model}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularBikes;
