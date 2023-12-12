import React, { useState, useEffect } from 'react';
import { FaFemale, FaMale, FaChild } from 'react-icons/fa';
import axios from 'axios';

const getIconForGender = (gender) => {
  switch (gender) {
    case 'female':
      return <FaFemale />;
    case 'male':
      return <FaMale />;
    case 'boy':
      return <FaChild />;
    case 'girl':
      return <FaChild />;
    default:
      return null;
  }
};

const People = () => {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/getStats');
        setPeopleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderPeopleStats = () => {
    return peopleData.map((person, index) => (
      <li key={index}>
        {getIconForGender(person.gender)} {person.count}
      </li>
    ));
  };

  return (
    <div>
      <h1>People</h1>
      <ul>
        {peopleData.length > 0 ? (
          renderPeopleStats()
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
};

export default People;

