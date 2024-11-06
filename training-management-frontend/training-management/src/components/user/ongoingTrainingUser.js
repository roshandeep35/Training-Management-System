import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './ongoingTrainingUser.css';

const OngoingTrainingUser = () => {
  const [ongoingTrainings, setOngoingTrainings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOngoingTrainings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/ongoing-trainings`);
        setOngoingTrainings(response.data);
      } catch (error) {
        console.error('Error fetching ongoing trainings:', error);
      }
    };

    fetchOngoingTrainings();
  }, []);
  const handleViewDetails = (trainingId) => {
    navigate(`/training-details/${trainingId}`);
  };
  return (
    <div className="ongoing-training-page">
      <h2>Ongoing Trainings</h2>
      <div className="training-list">
        {ongoingTrainings.map((training) => (
          <div className="training-item" key={training.id}>
            <h3>{training.topic}</h3>
            <p><strong>Location:</strong> {training.location}</p>
            <p><strong>Duration:</strong> {training.startDate} to {training.endDate}</p>
            <p><strong>Trainer:</strong> {training.trainerName}</p>
            <button onClick={() => handleViewDetails(training.id)}>View Details</button>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">Go Back to Home</Link>
    </div>
  );
};

export default OngoingTrainingUser;