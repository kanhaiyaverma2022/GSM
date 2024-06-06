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
        <span className="mx-4 text-yellow-200">{"Motley Crew"}</span>
        <img className="w-12 h-12 text-yellow-500" />
      </div>
      <div className="mt-4 text-6xl font-bold">{"870"} Points</div>
    </div>
    </>
  );
};

export default WinnerScreen;
