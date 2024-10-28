"use client"
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const TicTacToe = () => {
  const initGame = ["", "", "", "", "", "", "", "", ""]
  const [point, setPoint] = useState('')
  const [textStatus, setTextStatus] = useState('')
  const [winStreak, setWinStreak] = useState('')
  const [playerTurn, setPlayerTurn] = useState(true);
  const [endGamePopup, setEndGamePopup] = useState(false);
  const [data, setData] = useState(initGame)
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { data: session, status } = useSession();
  const box1 = useRef(null)
  const box2 = useRef(null)
  const box3 = useRef(null)
  const box4 = useRef(null)
  const box5 = useRef(null)
  const box6 = useRef(null)
  const box7 = useRef(null)
  const box8 = useRef(null)
  const box9 = useRef(null)

  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

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
        if (playerTurn) {
          won();
        } else {
          lost();
        }
        return true;
      }
    }

    return false;
  };

  const botTurn = useCallback((random: number) => {
    if (data[random] || lock) return;
    const newBoard = [...data];
    newBoard[random] = "o";
    setData(newBoard);
    box_array.forEach((box, index) => {
      if (random === index && box.current) {
        const target = box.current as HTMLButtonElement
        target.innerHTML = '<div class= "text-white flex w-full items-center justify-center text-7xl	">o</div>';
      }
    })
    checkWin(newBoard)
    setPlayerTurn((player) => !player)
  }, [checkWin, data, lock, box_array])



  const yourTurn = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, num: number) => {
    if (status === 'authenticated') {
      if (lock) {
        return 0
      }
      if (data[num] !== "") {

        return;
      }
      const target = evt.currentTarget;
      target.innerHTML = '<div class="text-gray-800 flex w-full items-center justify-center text-7xl	">x</div>';
      data[num] = "x";
      const newCount = count + 1;
      setCount(newCount)
      const newData = [...data]
      setData(newData);
      checkWin(data)
      setPlayerTurn((player) => !player)
    }
    else {
      setIsLogin((login: boolean) => !login)
    }
  }

  const resetGame = () => {
    setData(initGame);
    setLock(false);
    setEndGamePopup(false)
    box_array.forEach(e => {
      if (e.current) {
        const target = e.current as HTMLButtonElement
        target.innerHTML = "";
      }
    });
  }

  const won = () => {
    savePoint(point)
    setLock(true)
    setEndGamePopup(true)
  }

  const lost = () => {
    decresePoint(point)
    setTextStatus("Lose :(")
    setEndGamePopup(true)
    setLock(true)
  }

  const decresePoint = (point: string | null) => {
    let parsePoint = parseInt(point ?? '0')
    if (parsePoint > 0) {
      parsePoint--
    }
    const stringPoint = parsePoint.toString();
    setPoint(stringPoint)
    localStorage.setItem('point', stringPoint)
    localStorage.setItem('winStreak', '0')
  }

  const savePoint = (point: string | null) => {
    let parseStreak = parseInt(winStreak ?? '0')
    parseStreak++
    const stringWinStreak = parseStreak.toString();
    setWinStreak(stringWinStreak)
    localStorage.setItem('winStreak', stringWinStreak)

    let parsePoint = parseInt(point ?? '0')
    if (stringWinStreak === '2') {
      parsePoint += 2;
      localStorage.setItem('winStreak', '0')
      setTextStatus("Win! +2 point")
    } else {
      setTextStatus("Win! +1 point")
      parsePoint++
    }
    const stringPoint = parsePoint.toString();
    setPoint(stringPoint)
    localStorage.setItem('point', stringPoint)
  }

  useEffect(() => {
    const storePoint = localStorage.getItem('point')
    setPoint(storePoint ?? '0')
    const storeWinStreak = localStorage.getItem('winStreak')
    setWinStreak(storeWinStreak ?? '0')
  }, [point, winStreak])

  useEffect(() => {
    if (!playerTurn && !lock) {
      const availableMoves = data
        .map((cell, index) => (cell === "" ? index : null))
        .filter((index) => index !== null)
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      botTurn(randomMove);
    }
  }, [playerTurn, lock, botTurn, data]);

  return (
    <>
      {endGamePopup && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg max-w-md w-full ">
          <div >{textStatus}</div>
          <div>{point}</div>
          <button onClick={resetGame} className="text-red-500">
            Close
          </button>
        </div>
      </div>}
      {isLogin && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg max-w-md w-full ">
          <div >Please Sign In</div>
          <button onClick={() => signIn()} className="text-red-500">
            Sign In
          </button>
        </div>
      </div>}
      <div className="text-center">
        <h1 className="text-white text-6xl flex justify-center items-center">TicTacToe {status === 'authenticated' && point}</h1>
        <div className="flex justify-center">
          <div className="flex-row justify-center"  >
            <div className="grid grid-cols-3">
              {data.map((data: string, index: number) => {
                const key = `btn-block-${index}`
                return <button key={key} ref={box_array[index]} onClick={(e) => { yourTurn(e, index) }} className="flex h-24 w-24 bg-slate-400 border-slate-300 rounded cursor-pointer border-4 m-3 hover:border-slate-400"></button>
              })}
            </div>
          </div>
        </div>
        <button onClick={resetGame} className="w-32 h-16 border-none cursor-pointer bg-slate-400 rounded-full my-8">Reset</button>
      </div>
    </>
  )
}
export default TicTacToe