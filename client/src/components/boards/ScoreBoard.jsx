import React, { useEffect, useState } from 'react';
import axios from 'axios';

import goldBg from '../../assets/9975067.jpg'
import silverBg from '../../assets/shiny-metal-plate-grunge-background.jpg'
import bronzeBg from '../../assets/metallic-background-with-rose-gold-tint.jpg'

const ScoreBoard = () => {
  const [teamsPoints, setTeamsPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState();
  const [loading, setLoading] = useState(true);
  const [visibleTeams, setVisibleTeams] = useState([]);

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

  const showTeamsOneByOne = () => {
    teamsPoints.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTeams((prev) => [...prev, index]);
      }, index * 800); // 800ms delay for each item
    });
  };

  const highestScore = teamsPoints.reduce((max, team) => (team.points > max ? team.points : max), 0);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Loading...</h1>
      </div>
    );
  }

  // Determine the top 3 unique scores
  const topScores = [...new Set(teamsPoints.map(team => team.points))].slice(0, 3);
  const getColorForScore = (score) => {
    switch (score) {
      case topScores[0]: return  goldBg;
      case topScores[1]: return silverBg;
      case topScores[2]: return bronzeBg;
      default: return 'bg-white';
    }
  };


  function addGap(teams) {
    // Find the highest score
    let highestScore = Math.max(...teams.map(team => team.points));

    // Calculate the gap for each team
    teams.forEach(team => {
        if (team.points !== highestScore) {
            team.gap = highestScore - team.points;
        } else {
            team.gap = 0; // No gap for the highest score teams
        }
    });

    return teams;
}

console.log(addGap(teamsPoints));



  return (
    <div className="mx-auto min-h-screen h-screen bg-black">
      {/* <button onClick={handleRefresh}>Reload</button> */}
      <div className='flex justify-between text-4xl items-center px-4 py-1 cursor-pointer' onClick={()=>window.location.reload()}>
      <div className='text-white text-left font-extrabold  text-4xl '>
        Remaining Points: {totalPoints?.totalPoints}/605
      </div>
      <div className='flex gap-28 text-white text-left font-extrabold py-2 px-4'>
        <h1>Points</h1>
        <h1 className='pr-8'>Gap</h1>
      </div>
      </div>
      <ul>
        {teamsPoints.map((team, index) => (
          <li
            key={team._id}
            style={{ backgroundImage: `url(${getColorForScore(team.points)})` }}
            className={`mx-4 shadow-md rounded px-4 py-2 mb-2 flex justify-between items-center bg-cover  bg-white ${
              team.points === highestScore ? 'font-extrabold' : ''
            } ${visibleTeams.includes(index) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          >
            <div className='flex justify-between w-full'>
            <div className='flex text-6xl font  font-cabin'>
             
              {team.teamTitle}
            </div>
            <div className='flex gap-8'>
            <div className={`flex-none w-[150px] flex text-7xl font-extrabold text-center px-2`}>
              {/* {team.points === highestScore && <img src={icon2} className='w-16 h-16 animate-spin'/>} */}
              {team.points}
            </div>
            <div className='flex-none w-[150px] flex text-7xl font-extrabold text-center justify-center items-center'>
              
              {team.gap === 0 ? "" : team.gap}
            </div>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import icon1 from '../../assets/person.png'
// import icon2 from '../../assets/star.png'

// const ScoreBoard = () => {
//   const [teamsPoints, setTeamsPoints] = useState([]);
//   const [totalPoints, setTotalPoints] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTeamsPoints();
//   }, []);

//   const fetchTeamsPoints = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`);
//       setTeamsPoints(response.data?.teams);
//       setTotalPoints(response.data?.totalPoints);
//     } catch (error) {
//       console.error('Error fetching teams points:', error);
//     }
//     setLoading(false);
//   };
//   const sortedTeamsPoints = teamsPoints.sort((a, b) => b.points - a.points);
//   let highestScore = 0;
//   teamsPoints.forEach(team => {
//     if (team.points > highestScore) {
//       highestScore = team.points;
//     }
//   });

//   if (loading) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4 text-center">Loading...</h1>
//       </div>
//     );
//   }
// const handleRefresh= ()=>{
//   window.location.reload()
// }
//   return (
//     <div className=" mx-auto min-h-screen h-screen bg-black">
//       {/* <button onClick={handleRefresh}>Reload</button> */}
//       <h1 className='text-white text-center font-extrabold py-2 text-6xl '>Remaining Points: {totalPoints?.totalPoints}/605</h1>
//       <ul>
//         {teamsPoints.map(team => (
//           <li key={team._id} className={`mx-4 bg-white shadow-md rounded px-4 py-2 mb-2 flex justify-between items-center ${team.points === highestScore ? 'bg-gradient-to-r from-cyan-400 to-[#AC60F9] font-extrabold' : ''}`}>
//             {/* <div> */}
//               <div className='flex-1 flex text-4xl'> 
//               <img src={icon1} className='w-16 h-16'/>
//               {team.teamTitle}</div>
//               <div className='flex-none flex  text-7xl font-extrabold'>
// { team.points === highestScore && <img src={icon2} className='w-16 h-16 animate-spin'/>}
//                  {team.points}
                 
//                  </div>
//             {/* </div> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScoreBoard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ScoreBoard = () => {
//   const [teamsPoints, setTeamsPoints] = useState([]);
//   const [totalPoints , setTotalPoints]=useState()

//   useEffect(() => {
//     fetchTeamsPoints();
//   }, []);

//   const fetchTeamsPoints = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`);
//       setTeamsPoints(response.data?.teams);
//       setTotalPoints(response.data?.totalPoints);
//     } catch (error) {
//       console.error('Error fetching teams points:', error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1>Remaining Points : {totalPoints?.totalPoints}</h1>
//       <h2 className="text-3xl font-bold mb-4 text-center">Team Points</h2>
//       <ul>
//         {teamsPoints.map(team => (
//           <li key={team._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
//             <div>
//               <p><strong>Team:</strong> {team.teamTitle}</p>
//               <p><strong>Points:</strong> {team.points}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScoreBoard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const teams = [
//   { teamTitle: "Bust Your Balls" },
//   { teamTitle: "Sultans" },
//   { teamTitle: "Kill Squad" },
//   { teamTitle: "Warriors" },
//   { teamTitle: "Drop You Till You Drop" },
//   { teamTitle: "Squashers" },
//   { teamTitle: "Animals" },
//   { teamTitle: "Calm-Chorz" }
// ];

// const levels = [
//   "quarter final",
//   "semi final",
//   "final"
// ];

// const players = [
//   { playerName: "Player 1" },
//   { playerName: "Player 2" },
//   { playerName: "Player 3" },
//   { playerName: "Player 4" },
//   { playerName: "Player 5" }
// ];

// const Final = () => {
//   const [matches, setMatches] = useState([]);
//   const [round, setRound] = useState('');
//   const [winnerTeam, setWinnerTeam] = useState('');
//   const [loserTeam, setLoserTeam] = useState('');
//   const [winnerPlayer, setWinnerPlayer] = useState('');
//   const [loserPlayer, setLoserPlayer] = useState('');
//   const [winnerScore, setWinnerScore] = useState('');
//   const [loserScore, setLoserScore] = useState('');
//   const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [teamsPoints, setTeamsPoints] = useState([]);

//   useEffect(() => {
//     fetchMatches();
//     fetchTeamsPoints();
//   }, []);

//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/matches`);
//       setMatches(response.data);
//     } catch (error) {
//       console.error('Error fetching matches:', error);
//     }
//   };

//   const fetchTeamsPoints = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`);
//       setTeamsPoints(response.data);
//     } catch (error) {
//       console.error('Error fetching teams points:', error);
//     }
//   };

//   const addMatch = async () => {
//     const newMatch = { round, winnerTeam, loserTeam, winnerPlayer, loserPlayer, winnerScore, loserScore, currentlyPlaying };
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/matches`, newMatch);
//       setMatches([...matches, response.data]);
//       resetForm();
//       fetchTeamsPoints(); // Update team points
//     } catch (error) {
//       console.error('Error adding match:', error);
//     }
//   };

//   const deleteMatch = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${id}`);
//       setMatches(matches.filter(match => match._id !== id));
//       fetchTeamsPoints(); // Update team points
//     } catch (error) {
//       console.error('Error deleting match:', error);
//     }
//   };

//   const editMatch = (match) => {
//     setWinnerTeam(match.winnerTeam);
//     setRound(match.round);
//     setLoserTeam(match.loserTeam);
//     setWinnerPlayer(match.winnerPlayer);
//     setLoserPlayer(match.loserPlayer);
//     setWinnerScore(match.winnerScore);
//     setLoserScore(match.loserScore);
//     setCurrentlyPlaying(match.currentlyPlaying || false);
//     setEditing(true);
//     setEditId(match._id);
//   };

//   const updateMatch = async () => {
//     const updatedMatch = { round, winnerTeam, loserTeam, winnerPlayer, loserPlayer, winnerScore, loserScore, currentlyPlaying };
//     try {
//       await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${editId}`, updatedMatch);
//       setMatches(matches.map(match => (match._id === editId ? updatedMatch : match)));
//       resetForm();
//       fetchTeamsPoints(); // Update team points
//     } catch (error) {
//       console.error('Error updating match:', error);
//     }
//   };

//   const resetForm = () => {
//     setWinnerTeam('');
//     setLoserTeam('');
//     setWinnerPlayer('');
//     setLoserPlayer('');
//     setWinnerScore('');
//     setLoserScore('');
//     setRound('');
//     setCurrentlyPlaying(false);
//     setEditing(false);
//     setEditId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editing) {
//       updateMatch();
//     } else {
//       addMatch();
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6 text-center">Team Matches</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h1 className='text-4xl text-center'>Select the match round</h1>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Round:</label>
//           <select value={round} onChange={(e) => setRound(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select round</option>
//             {levels.map((level, index) => (
//               <option key={index} value={level}>{level}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winner Team:</label>
//           <select value={winnerTeam} onChange={(e) => setWinnerTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select winner team</option>
//             {teams.map((team, index) => (
//               <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Loser Team:</label>
//           <select value={loserTeam} onChange={(e) => setLoserTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select loser team</option>
//             {teams.map((team, index) => (
//               <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winner Player:</label>
//           <select value={winnerPlayer} onChange={(e) => setWinnerPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select winner player</option>
//             {players.map((player, index) => (
//               <option key={index} value={player.playerName}>{player.playerName}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Loser Player:</label>
//           <select value={loserPlayer} onChange={(e) => setLoserPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select loser player</option>
//             {players.map((player, index) => (
//               <option key={index} value={player.playerName}>{player.playerName}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winner Score:</label>
//           <input
//             type="number"
//             value={winnerScore}
//             onChange={(e) => setWinnerScore(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Loser Score:</label>
//           <input
//             type="number"
//             value={loserScore}
//             onChange={(e) => setLoserScore(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             <input
//               type="checkbox"
//               checked={currentlyPlaying}
//               onChange={(e) => setCurrentlyPlaying(e.target.checked)}
//               className="mr-2 leading-tight"
//             />
//             Currently Playing
//           </label>
//         </div>

//         <div className="flex items-center justify-between">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             {editing ? 'Update Match' : 'Add Match'}
//           </button>
//           <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Reset
//           </button>
//         </div>
//       </form>

//       <h2 className="text-3xl font-bold mb-4">Matches</h2>
//       <ul>
//         {matches.map(match => (
//           <li key={match._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
//             <div>
//               <p><strong>Round:</strong> {match.round}</p>
//               <p><strong>Winner Team:</strong> {match.winnerTeam}</p>
//               <p><strong>Loser Team:</strong> {match.loserTeam}</p>
//               <p><strong>Winner Player:</strong> {match.winnerPlayer}</p>
//               <p><strong>Loser Player:</strong> {match.loserPlayer}</p>
//               <p><strong>Winner Score:</strong> {match.winnerScore}</p>
//               <p><strong>Loser Score:</strong> {match.loserScore}</p>
//               <p><strong>Currently Playing:</strong> {match.currentlyPlaying ? 'Yes' : 'No'}</p>
//             </div>
//             <div>
//               <button onClick={() => editMatch(match)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
//                 Edit
//               </button>
//               <button onClick={() => deleteMatch(match._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Final;
