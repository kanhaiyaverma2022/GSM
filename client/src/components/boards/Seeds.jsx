import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Seeds = () => {
  const [teamsPoints, setTeamsPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState();
  const [loading, setLoading] = useState(true);
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [shuffledSeeds, setShuffledSeeds] = useState([]);

  useEffect(() => {
    fetchTeamsPoints();
  }, []);

  useEffect(() => {
    if (teamsPoints.length > 0) {
      showTeamsOneByOne();
    }
  }, [teamsPoints]);

  const fetchTeamsPoints = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`);
      setTeamsPoints(response.data?.teams.sort((a, b) => b.points - a.points));
      setTotalPoints(response.data?.totalPoints);
    } catch (error) {
      console.error('Error fetching teams points:', error);
    }
    setLoading(false);
  };



  
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };




  const showTeamsOneByOne = () => {
    const shuffled = shuffleArray(seeds);
    setShuffledSeeds(shuffled);
    shuffled.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTeams((prev) => [...prev, index]);
      }, index * 2400);
    });
  };

  const handleSubmit = async () => {
    console.log('Selected seeds:', shuffledSeeds);
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/seeds`, { seeds: shuffledSeeds });
        console.log('Seeds stored successfully');

        alert('saved successfully')
      } catch (error) {
        console.error('Error storing seeds:', error);
      }
  };

  const seeds = [
    "Seed 1",
    "Seed 2",
    "Seed 3",
    "Seed 4",
    "Seed 5",
    "Seed 6",
    "Seed 7",
    "Seed 8",
    "Seed 9",
    "Seed 10",
    "Seed 11",
  ];

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen bg-black py-4">
      <ul>
        {shuffledSeeds.map((team, index) => (
          <li
            key={index}
            className={`mx-4 shadow-md rounded px-4 py-2 mb-2 flex justify-between items-center bg-cover bg-white ${
              visibleTeams.includes(index) ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
          >
            <div className="flex justify-between w-full">
              <div className="flex text-6xl font font-cabin">{team}</div>
            </div>
          </li>
        ))}
      </ul>
      <button 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Seeds;
