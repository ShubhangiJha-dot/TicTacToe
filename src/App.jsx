import './App.css'
import { useState } from 'react'

function App() {
  const [board, setBoard]=useState(Array(9).fill(null))
  const [isXTurn, setXTurn]=useState(true)
  const [xScore, setXScore]=useState(0)
  const [oScore, setOScore]=useState(0)
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo]=useState([])
  function checkWinner(board) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningCombo([a,b,c])
        return board[a]; // 'X' or 'O'
      }
    }

    return null;
  }

  console.log(board)

  function handleClick(idx){
    if(board[idx] || winner) return; //otherwise overwriting on already clicked button or game end
    const newBoard=[...board]
    newBoard[idx]= isXTurn? "X":"0"
    if(newBoard[idx]=="X") setXScore(xScore=>xScore+1)
    else setOScore(oScore=>oScore+1)
    setBoard(newBoard)
    
    const win=checkWinner(newBoard)
    if(win) setWinner(win)
    else setXTurn(!isXTurn)
  }

  function handleReset(){
    setBoard(Array(9).fill(null))
    setXTurn(true)
    setWinner(null)
    setWinningCombo([])
    setXScore(0)
    setOScore(0)
  }

  return (
    <div class="game">
      <h1 class="font-serif bg-linear-to-r from-rose-300 via-red-400 to-rose-400 bg-clip-text text-5xl font-extrabold text-transparent">TIC TAC TOE</h1>

      <div className="status flex flex-row ">
        <span className={`w-40 bg-rose-200 h-12 flex items-center justify-center rounded-l-lg text-center font-sans text-xl font-bold transition-all duration-200 ease-in-out ${isXTurn? "border-0 border-b-3 border-rose-500":"border-transparent"}`} >X-{xScore}</span>
        <div className="w-0.5 h-12 bg-rose-400"></div>
        <span className={`w-40 bg-rose-200 h-12 flex items-center justify-center rounded-r-lg text-center font-sans text-xl font-bold transition-all duration-200 ease-in-out ${!isXTurn? "border-0 border-b-3 border-rose-500":"border-transparent"}`}>0-{oScore}</span>
      </div>

      <div className="grid grid-cols-3 grid-row-3 gap-0">
        {board.map((value,idx)=>(
          <button 
          onClick={()=>handleClick(idx)}
          className={`tile shadow-xl shadow-rose-900/30 border-2 border-rose-300 text-rose-400 font-bold text-2xl ${winningCombo.includes(idx)?"win":""}`} key={idx} >{value}</button>
        ))}
      </div>

      <h2 className='winner bg-linear-to-r from-rose-300 via-red-400 to-rose-400 bg-clip-text text-transparent text-xl font-bold'>{winner ? `${winner} Won!`: board.every(cell => cell) ? "It's a Draw!" : ""}</h2>

      <button 
      onClick={()=>handleReset()}
      class="reset-btn font-serif text-white bg-gradient-to-r from-rose-300 via-red-400 to-rose-400 px-4 py-2 rounded-lg font-semibold h-10 w-32 shadow-xl hover:shadow-rose-400/50">
        Reset Game
      </button>

    </div>
  )
}

export default App
