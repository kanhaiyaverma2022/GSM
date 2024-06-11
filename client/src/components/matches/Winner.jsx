// WinnerScreen.js

import React from 'react';
import Confetti from 'react-confetti'
import {
    useWindowSize,
   
  } from '@react-hook/window-size'

import image5 from '../../assets/—Pngtree—golden star isolated on a_14563449.png'  

const WinnerScreen = ({ name, score }) => {



    const { width, height } = useWindowSize()
  return (
    <>
    <Confetti
    width={width}
    height={height}
/>
    <div className="flex flex-col items-center justify-center h-screen bg-black text-yellow-500">
       <div className='inline-flex items-center justify-center'>
       <img src={image5} className='w-48 h-48'/>
       <img src={image5} className='w-64 h-64'/>
       <img src={image5} className='w-96 h-96'/>
       <img src={image5} className='w-64 h-64'/>
       <img src={image5} className='w-48 h-48'/>
       </div>
        
      <div className="flex items-center text-9xl font-bold">
        <img className="w-12 h-12 text-yellow-100" />
        <span className="mx-4 text-yellow-200">{"Worriors"}</span>
        <img className="w-12 h-12 text-yellow-500" />
      </div>
      <div className="mt-4 text-6xl font-bold">{"870"} Points</div>
    </div>
    </>
  );
};

export default WinnerScreen;







// import React from 'react';
// import Confetti from 'react-confetti';
// import { useWindowSize } from '@react-hook/window-size';

// import image5 from '../../assets/—Pngtree—golden star isolated on a_14563449.png';

// const WinnerScreen = () => {
//   const winners = [ {name : "name1", points:1} , {points: 2 ,name: "name2" }, {points: 3 , name : "name3"}]

  
  
//   const { width, height } = useWindowSize();

//   const rankColors = ['bg-yellow-500', 'bg-gray-400', 'bg-yellow-700'];
//   const rankTextColors = ['text-yellow-500', 'text-gray-400', 'text-yellow-700'];

//   return (
//     <>
//       <Confetti width={width} height={height} />
//       <div className="flex flex-col items-center justify-center h-screen bg-black text-yellow-500">
//         <div className="flex justify-around items-end w-full max-w-5xl mx-auto">
//           {winners.map((winner, index) => (
//             <div key={index} className={`flex flex-col items-center justify-center ${rankColors[index]} p-4 m-2 rounded-lg`}>
//               <img src={image5} className={`w-${index === 0 ? 64 : index === 1 ? 48 : 32} h-${index === 0 ? 64 : index === 1 ? 48 : 32}`} alt="star" />
//               <div className={`text-${index === 0 ? '4xl' : '3xl'} font-bold ${rankTextColors[index]}`}>
//                 {winner.name}
//               </div>
//               <div className={`text-${index === 0 ? '2xl' : 'xl'} font-semibold ${rankTextColors[index]}`}>
//                 {winner.score} Points
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default WinnerScreen;
