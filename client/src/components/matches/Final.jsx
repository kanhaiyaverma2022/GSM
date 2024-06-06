import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';


const teams = [
  { teamTitle: "Animals" },
  { teamTitle: "Bust Your Balls" },
  { teamTitle: "Calm-Chorz" },
  { teamTitle: "Kill Squad" },
  { teamTitle: "Motley Crew" },
  { teamTitle: "Sultans" },
  { teamTitle: "Squashers" },
  { teamTitle: "Warriors" },
];

const levels = [
  "quarter final",
  "semi final",
  "final"
];

// const players = [
//   { playerName: "Player 1" },
//   { playerName: "Player 2" },
//   { playerName: "Player 3" },
//   { playerName: "Player 4" },
//   { playerName: "Player 5" }
// ];


const players = [
 {playerName: "Abhishek Goyal"},
 {playerName:"Abhishek Kalia"},
 {playerName:"Adeep Arora"},
 {playerName:"Ajay Kohli"},
 {playerName:"Ajay Kumar"},
 {playerName:"Ajnav Dhawan"},
 {playerName:"Akhil Puri"},
 {playerName:"Akul Juneja"},
 {playerName:"Amit Bhatia"},
 {playerName:"Amit Jain"},
 {playerName:"Amit Malik"},
 {playerName:"Amit Mina"},
 {playerName:"Amol Kalra"},
 {playerName:"Anirudh Sood"},
 {playerName:"Arjun Berry"},
 {playerName:"Arjun Mehta"},
 {playerName:"Ashim Shrivastava"},
 {playerName:"Ashish Gupta"},
 {playerName:"Ashish Kumar"},
 {playerName:"Asit Dhingra"},
 {playerName: "Atishay Kumar"},
 {playerName: "Bawa Chandhok"},
 {playerName: "Chetan Malhotra"},
 {playerName: "Chirag Galundia"},
 {playerName:"Deepak Thakran"},
 {playerName:"Dhiraj Khanna"},
 {playerName:"Dhruv Sahai"},
 {playerName:"Divay Pratap"},
 {playerName:"Gaurav Goel"},
 {playerName:"Gaurav Marwah"},
 {playerName:"Gaurav Verma"},
 {playerName:"Gautam Singh"},
 {playerName:"Hardesh Chawla"},
 {playerName:"Harjinder Singh"},
 {playerName:"Harpreet Chawla"},
 {playerName:"Harshit Juneja"},
 {playerName: "Karan Bedi"},
 {playerName: "Kushal Gupta"},
 {playerName:"Manish Handa"},
 {playerName:"Manmeet Walia"},
 {playerName: "Matthew Koshy"},
 {playerName:"Mrigank Tripathi"},
 {playerName:"Nandy Narang"},
 {playerName:"Nikhil Rajpal"},
 {playerName:"Nitin Aggarwal"},
 {playerName:"Nitin Soni"},
 {playerName:"Parry Juneja"},
 {playerName:"Pavandeep Choudhary"},
 {playerName: "Piyush Sachdeva"},
 {playerName:"Pranav Bassi"},
 {playerName:"Pranay Kapoor"},
 {playerName: "Prashant Jetley"},
 {playerName: "Rachit Bahri"},
 {playerName:"Rahul Batra"},
 {playerName:"Rahul Bharti"},
 {playerName:"Rahul Keswani"},
 {playerName: "Rahul Shah"},
 {playerName: "Rajan Puri"},
 {playerName:"Ranjan Pal"},
 {playerName:"Ravi Sharma"},
 {playerName:"Robin Groser"},
 {playerName:"Rohit Dalal"},
 {playerName:"Rohit Sehgal"},
 {playerName: "Roopam Jain"},
 {playerName: "Sachin Jain"},
 {playerName:"Sahil Jain"},
 {playerName:"Salil Malhotra"},
 {playerName:"Samir Dewan"},
 {playerName:"Sandeep Roperia"},
 {playerName:"Sanjay Gupta"},
 {playerName:"Saurabh Mehta"},
 {playerName:"Saurav Khemani"},
 {playerName:"Shantanu Ghosh"},
 {playerName:"Shikhar Sharma"},
 {playerName:"Siddhant Madan"},
 {playerName:"Sikander Kamal"},
  {playerName:"SukhSagar Singh"},
  {playerName:"Sukrita Panigrahi"},
  {playerName:"Sumit Kumar Domyan"},
  {playerName:"Sumit Kumar Johri"},
  {playerName:"Sumit Nanda"},
  {playerName:"Sunil Pahuja"},
  {playerName:"Tanmay Khandelawal"},
  {playerName:"Vikas Phogaat"},
  {playerName:"Vipin Gupta"},
  {playerName:"Vir Mehta"},
  {playerName:"Viraj Sinh"},
  {playerName: "Yashwinder Chikkara"}
];


const Final = ({ fetchTeamsPoints ,setRefresh}) => {
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState('');
  const [winnerTeam, setWinnerTeam] = useState('');
  const [loserTeam, setLoserTeam] = useState('');
  const [winnerPlayer, setWinnerPlayer] = useState('');
  const [loserPlayer, setLoserPlayer] = useState('');
  const [winnerScore, setWinnerScore] = useState('');
  const [loserScore, setLoserScore] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filteredRound , setFilteredRound]=useState(null);
  const [loading , setLoading]= useState(false)


 

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/matches`);
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const addMatch = async () => {
    
    const newMatch = { round, winnerTeam, loserTeam, winnerPlayer, loserPlayer, winnerScore, loserScore, currentlyPlaying };
    for (let key in newMatch) {
      if (newMatch[key] === "" || newMatch[key] === null) {
          alert(`${key} cannot be empty or null.`);
          return;
      }
  }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/matches`, newMatch);
      setMatches([...matches, response.data]);
      resetForm();
      fetchTeamsPoints(); // Refresh team points in ScoreBoard
      alert("Score updated successfully!");
      setRefresh(true);
      setLoading(false)
    } catch (error) {
      console.error('Error adding match:', error);
      setLoading(false)
    }
  };

  const deleteMatch = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${id}`);
      setMatches(matches.filter(match => match._id !== id));
      fetchTeamsPoints(); // Refresh team points in ScoreBoard
      
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const editMatch = (match) => {
    setWinnerTeam(match.winnerTeam);
    setRound(match.round);
    setLoserTeam(match.loserTeam);
    setWinnerPlayer(match.winnerPlayer);
    setLoserPlayer(match.loserPlayer);
    setWinnerScore(match.winnerScore);
    setLoserScore(match.loserScore);
    setCurrentlyPlaying(match.currentlyPlaying || false);
    setEditing(true);
    setEditId(match._id);
  };

  const updateMatch = async () => {
    const updatedMatch = { round, winnerTeam, loserTeam, winnerPlayer, loserPlayer, winnerScore, loserScore, currentlyPlaying };
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${editId}`, updatedMatch);
      setMatches(matches.map(match => (match._id === editId ? updatedMatch : match)));
      resetForm();
      fetchTeamsPoints(); // Refresh team points in ScoreBoard
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  const resetForm = () => {
    setWinnerTeam('');
    setLoserTeam('');
    setWinnerPlayer('');
    setLoserPlayer('');
    setWinnerScore('');
    setLoserScore('');
    setRound('');
    setCurrentlyPlaying(false);
    setEditing(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateMatch();
    } else {
      addMatch();
    }
  };
  ///show randomly seed 1- 11
   /// netlify random

  const filteredDataList = (filteredRound !== null) ?  matches.filter(match => match.round === filteredRound) : matches;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="p-6 bg-gray-800 text-white flex justify-between">
          <div>
            <Link to="/" className="mr-4">Final</Link>
            <Link to="/scoreboard">ScoreBoard</Link>
          </div>
        </nav>
      <h1 className="text-4xl font-bold mb-6 text-center">Team Matches</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className='text-4xl text-center'>Select the match round</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Round:</label>
          <select value={round} onChange={(e) => setRound(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select round</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <h1 className='text-4xl text-center font-bold text-green-200'>Winning Team</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Winning Team:</label>
          <select value={winnerTeam} onChange={(e) => setWinnerTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select winning team</option>
            {teams.map((team, index) => (
              <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Winning Player:</label>
          <select value={winnerPlayer} onChange={(e) => setWinnerPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select winning player</option>
            {players.map((player, index) => (
              <option key={index} value={player.playerName}>{player.playerName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Winning Score:</label>
          <select value={winnerScore} onChange={(e) => setWinnerScore(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select winning score</option>
            {[2].map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Winning Score:</label>
          <input
            type="number"
            value={winnerScore}
            onChange={(e) => setWinnerScore(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <h1 className='text-4xl text-center font-bold text-red-200'>Losing Team</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Losing Team:</label>
          <select value={loserTeam} onChange={(e) => setLoserTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select losing team</option>
            {teams.map((team, index) => (
              <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Losing Player:</label>
          <select value={loserPlayer} onChange={(e) => setLoserPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select losing player</option>
            {players.map((player, index) => (
              <option key={index} value={player.playerName}>{player.playerName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Losing Score:</label>
          <select value={loserScore} onChange={(e) => setLoserScore(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select losing score</option>
            {[0,1].map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={currentlyPlaying}
              onChange={(e) => setCurrentlyPlaying(e.target.checked)}
              className="mr-2 leading-tight"
            />
            
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {loading ? "Loading..." :(editing ? 'Update Match' : 'Add Match')}
          </button>
          <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reset
          </button>
        </div>
      </form>
      <h2 className="text-3xl font-bold mb-4">Matches</h2>
     
        <div className="mb-4  ">
          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Filter Round:</label>
          <div className='flex gap-2'>
          <select value={filteredRound} onChange={(e) => setFilteredRound(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="" disabled>Select Round</option>
            {levels.map((s, index) => (
              <option key={index} value={s}>
                {s}                
                
                 </option>
            ))}
               
          </select>
          <div className='w-8'>
          {filteredRound && <div className="cursor-pointer text-2xl text-red-200 hover:bg-red-100 text-center rounded-full" onClick={()=>setFilteredRound(null)} >X</div>}
          </div>
          </div>
          </div>
         
       
        
      </div>

      
      <ul>
        {filteredDataList.map(match => (
          <li key={match._id} className="bg-white border border-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
            <div className=' w-full'>
              <p className='text-center pb-4 underline text-2xl capitalize'><strong>Round:</strong> {match.round}</p>
              <div className='flex flex-row w-full'>
              <div className='flex-1 text-green-200'>
              <p><strong>Winning Team:</strong> {match.winnerTeam}</p>
              <p><strong>Winning Player:</strong> {match.winnerPlayer}</p>
              <p><strong>Winning Score:</strong> {match.winnerScore}</p>
              </div>
              <div className='flex-1 text-red-200'>
              <p><strong>Losing Team:</strong> {match.loserTeam}</p>
              <p><strong>Losing Player:</strong> {match.loserPlayer}</p>
              <p><strong>Losing Score:</strong> {match.loserScore}</p>
              </div>
              </div>
            </div>
            <div>
              <button onClick={() => editMatch(match)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                Edit
              </button>
              <button onClick={() => deleteMatch(match._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
              <p><strong>Currently Playing:</strong> {match.currentlyPlaying ? 'Yes' : 'No'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Final;



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
//       alert("Score updated succesfully!")

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
// <h1 className='text-4xl text-center font-bold text-green-200'>Winning Team</h1>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winning Team:</label>
//           <select value={winnerTeam} onChange={(e) => setWinnerTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select winner team</option>
//             {teams.map((team, index) => (
//               <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winning Player:</label>
//           <select value={winnerPlayer} onChange={(e) => setWinnerPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select winner player</option>
//             {players.map((player, index) => (
//               <option key={index} value={player.playerName}>{player.playerName}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Winning Score:</label>
//           <input
//             type="number"
//             value={winnerScore}
//             onChange={(e) => setWinnerScore(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <h1 className='text-4xl text-center font-bold text-red-200'>Losing Team</h1>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Losing Team:</label>
//           <select value={loserTeam} onChange={(e) => setLoserTeam(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select loser team</option>
//             {teams.map((team, index) => (
//               <option key={index} value={team.teamTitle}>{team.teamTitle}</option>
//             ))}
//           </select>
//         </div>

       

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Losing Player:</label>
//           <select value={loserPlayer} onChange={(e) => setLoserPlayer(e.target.value)} className="shadow capitalize appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//             <option value="" disabled>Select loser player</option>
//             {players.map((player, index) => (
//               <option key={index} value={player.playerName}>{player.playerName}</option>
//             ))}
//           </select>
//         </div>

       

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Losing Score:</label>
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
//           <li key={match._id} className="bg-white border border-black shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
//             <div className=' w-full'>
//               <p className='text-center pb-4 underline text-2xl capitalize'><strong>Round:</strong> {match.round}</p>
//               <div className='flex flex-row w-full'>
//               <div className='flex-1 text-green-200'>
//               <p><strong>Winning Team:</strong> {match.winnerTeam}</p>
//               <p><strong>Winning Player:</strong> {match.winnerPlayer}</p>
//               <p><strong>Winning Score:</strong> {match.winnerScore}</p>
//               </div>
//               <div className='flex-1 text-red-200'>
//               <p><strong>Losing Team:</strong> {match.loserTeam}</p>
//               <p><strong>Losing Player:</strong> {match.loserPlayer}</p>
//               <p><strong>Losing Score:</strong> {match.loserScore}</p>
//               </div>
//               </div>
              
              
//             </div>
//             <div>
//               <button onClick={() => editMatch(match)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
//                 Edit
//               </button>
//               <button onClick={() => deleteMatch(match._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Delete
//               </button>
//               <p><strong>Currently Playing:</strong> {match.currentlyPlaying ? 'Yes' : 'No'}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Final;

