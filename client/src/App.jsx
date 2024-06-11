
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Final from './components/matches/Final';
import ScoreBoard from './components/boards/ScoreBoard';
import WinnerScreen from './components/matches/Winner';
import axios from 'axios';
import Seeds from './components/boards/Seeds';

const App = () => {
 
  const [teamsPoints, setTeamsPoints] = useState([]);
  const [totalPoints, setTotalPoints] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  // useEffect(() => {
  //   fetchTeamsPoints();
  // }, []);




  const fetchTeamsPoints = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`);
      setTeamsPoints(response.data?.teams);
      setTotalPoints(response.data?.totalPoints);
    } catch (error) {
      console.error('Error fetching teams points:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (refresh) {
      fetchTeamsPoints();
      setRefresh(false);
    }
    console.log('data refreshed')
  }, [refresh]);

  return (
    <Router>
      <div>
        
        <Routes>
          <Route 
            path="/" 
            element={<Final 
              setRefresh={ setRefresh }
              fetchTeamsPoints={fetchTeamsPoints} />} 
          />
          <Route 
            path="/scoreboard" 
            element={<ScoreBoard 
                      teamsPoints={teamsPoints} 
                      totalPoints={totalPoints} 
                      loading={loading} 
                    />} 
          />
          <Route 
            path="/seeds" 
            element={<Seeds 
                      teamsPoints={teamsPoints} 
                      totalPoints={totalPoints} 
                      loading={loading} 
                    />} 
          />
          <Route 
            path="/winner" 
            element={<WinnerScreen
                      teamsPoints={teamsPoints} 
                      totalPoints={totalPoints} 
                      loading={loading} 
                    />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Final from './components/matches/Final';
// import ScoreBoard from './components/boards/ScoreBoard';
// import WinnerScreen from './components/matches/Winner';
// import axios from 'axios';

// const App = () => {
//   const myIp = "192.168.1.13" //The IP address of the current user
//   const allowedIps = ["192.168.1.11", "192.168.1.12","192.168.1.13"]; // The IP address that is allowed to access the routes
//   const [teamsPoints, setTeamsPoints] = useState([]);
//   const [totalPoints, setTotalPoints] = useState();
//   const [loading, setLoading] = useState(true);
//   const [refresh, setRefresh] = useState(false); // State to trigger refresh

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

//   useEffect(() => {
//     if (refresh) {
//       fetchTeamsPoints();
//       setRefresh(false);
//     }
//     console.log('data refreshed');
//   }, [refresh]);

//   return (
//     <Router>
//       <div>
//         {allowedIps.includes(myIp) ? (
//           <Routes>
//             <Route 
//               path="/form" 
//               element={<Final 
//                 setRefresh={setRefresh}
//                 fetchTeamsPoints={fetchTeamsPoints} />} 
//             />
//             <Route 
//               path="/scoreboard" 
//               element={<ScoreBoard 
//                         teamsPoints={teamsPoints} 
//                         totalPoints={totalPoints} 
//                         loading={loading} 
//                       />} 
//             />
//             <Route 
//               path="/winner" 
//               element={<WinnerScreen
//                         teamsPoints={teamsPoints} 
//                         totalPoints={totalPoints} 
//                         loading={loading} 
//                       />} 
//             />
//             <Route path="*" element={<Navigate to="/form" />} />
//           </Routes>
//         ) : (
//           <div>Access Denied</div>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;








