"use client"
import React, { useState } from "react";

const TicTacToe = () => {
  let data = ["","","","","","","","",""]
let [count, setCount] = useState(0);
let [lock, setLock] = useState(false);

const toggle = (evt:any, num:any) => {
  if(lock){
    return 0;
  }
  if(count%2 === 2){
    evt.target.innerHTML = '<div>x</div>';
    data[num] = "x";
    setCount(++count);
  }
  else{
    evt.target.innerHTML = '<div>o</div>';
    data[num] ="0";
    setCount(++count);
  }
}

  return (
    <div className="text-center">
      <h1 className="text-white text-6xl flex justify-center items-center">TicTacToe</h1>
      <div className="flex justify-center">
        <div className="flex-row justify-center"  >
        <div className="flex">
          <div onClick={(e)=> {toggle(e, 0)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> {toggle(e, 1)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> {toggle(e, 2)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
        </div>
        <div className="flex">
          <div  onClick={(e)=> {toggle(e, 3)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> toggle(e, 4)} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> {toggle(e, 5)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
        </div> 
        <div   className="flex">
          <div  onClick={(e)=> {toggle(e, 6)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> {toggle(e, 7)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
          <div  onClick={(e)=> {toggle(e, 8)}} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer  border-4 m-3 hover:border-slate-400"></div>
        </div>
      </div>
      </div>
      <button className="w-32 h-16 border-none cursor-pointer bg-slate-400 rounded-full my-8">Reset</button>
    </div>
  )
}
export default TicTacToe