"use client"
import React, { useEffect, useRef, useState } from "react";

const TicTacToe = () => {
  const initGame = ["", "", "", "", "", "", "", "", ""]
  let [point, setPoint] = useState(localStorage.getItem('point'))
  let [winStreak, setWinStreak] = useState(localStorage.getItem('winStreak'))
  let [endGamePopup, setEndGamePopup] = useState(false);
  let [data, setData] = useState(initGame)
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let box1 = useRef(null)
  let box2 = useRef(null)
  let box3 = useRef(null)
  let box4 = useRef(null)
  let box5 = useRef(null)
  let box6 = useRef(null)
  let box7 = useRef(null)
  let box8 = useRef(null)
  let box9 = useRef(null)

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

  useEffect(() => {
    if (!point) {
      localStorage.setItem('point', '0')
    }
    if (!winStreak) {
      localStorage.setItem('winStreak', '0')
    }
  }, [])

  const toggle = (evt: any, num: any) => {
    if (lock) {
      return 0
    }
    if (data[num] !== "") {

      return;
    }
    if (count % 2 === 0) {
      evt.target.innerHTML = '<div>x</div>';
      data[num] = "x";
      setCount(++count);
    }
    else {
      evt.target.innerHTML = '<div>o</div>';
      data[num] = "0";
      setCount(++count);
    }
    const newData = [...data]
    setData(newData);
    checkWin(data)
  }

  const resetGame = () => {
    setData(initGame);
    setLock(false);
    setEndGamePopup(false)
    box_array.forEach((e: any) => {
      e.current.innerHTML = "";
    });
  }



  const checkWin = (data: string[]) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];


    for (const [a, b, c] of winConditions) {
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== "") {
        won(data);
        return true;
      }
    }

    return false;
  };


  const won = (winner: any) => {
    savePoint(point)
    setLock(true)
    setEndGamePopup(true)
  }

  const savePoint = (point: string | null) => {
    let parseStreak = parseInt(winStreak ?? '0')
    parseStreak++
    const stringWinStreak = parseStreak.toString();    
    setWinStreak(stringWinStreak)
    localStorage.setItem('winStreak', stringWinStreak)

    let parsePoint = parseInt(point ?? '0')
    if(stringWinStreak === '3'){
      parsePoint += 3;
      localStorage.setItem('winStreak', '0')
    }else{
      parsePoint++
    }
    const stringPoint = parsePoint.toString();
    setPoint(stringPoint)
    localStorage.setItem('point', stringPoint)
    
  }

  return (
    <div className="text-center">
      {endGamePopup && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg max-w-md w-full ">
          <div >{`You Win! +${1}`}</div>
          <div>{point}</div>
          <button onClick={resetGame} className="text-red-500">
            Close
          </button>
        </div>
      </div>}

      <h1 className="text-white text-6xl flex justify-center items-center">TicTacToe {point}</h1>
      <div className="flex justify-center">
        <div className="flex-row justify-center"  >
          <div className="grid grid-cols-3">
            {data.map((data: string, index: number) => {
              const key = `btn-block-${index}`
              return <button key={key} ref={box_array[index]} onClick={(e) => { toggle(e, index) }} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer border-4 m-3 hover:border-slate-400"></button>
            })}
          </div>
        </div>
      </div>
      <button onClick={resetGame} className="w-32 h-16 border-none cursor-pointer bg-slate-400 rounded-full my-8">Reset</button>
    </div>
  )
}
export default TicTacToe