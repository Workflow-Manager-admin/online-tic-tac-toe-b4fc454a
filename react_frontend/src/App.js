import React, { useState, useEffect } from 'react';
import './App.css';

// Theme colors from requirements
const COLORS = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#FF4081'
};

// Helpers to check win/draw
const WINNING_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

function calculateWinner(board) {
  for (let combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return {winner: board[a], line: combo};
    }
  }
  if (board.every(cell => cell)) {
    return {winner: 'draw'};
  }
  return null;
}

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Main game component for Tic Tac Toe. Handles board state, moves, win/draw logic, and UI.
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Next: X');
  const [gameOver, setGameOver] = useState(false);
  const [winnerLine, setWinnerLine] = useState([]);

  // Effect: Evaluate game status after each move
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      if (result.winner === 'draw') {
        setStatus('Draw!');
        setGameOver(true);
      } else {
        setStatus(`Winner: ${result.winner}`);
        setGameOver(true);
        setWinnerLine(result.line || []);
      }
    } else {
      setStatus(`Next: ${xIsNext ? 'X' : 'O'}`);
      setGameOver(false);
      setWinnerLine([]);
    }
  }, [board, xIsNext]);

  // PUBLIC_INTERFACE
  const handleCellClick = idx => {
    if (board[idx] || gameOver) return;
    setBoard(prev => {
      const newBoard = prev.slice();
      newBoard[idx] = xIsNext ? 'X' : 'O';
      return newBoard;
    });
    setXIsNext(prev => !prev);
  };

  // PUBLIC_INTERFACE
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerLine([]);
  };

  // PUBLIC_INTERFACE
  const startNewGame = () => {
    restartGame();
  };

  // Board rendering with highlight for winning cells
  const renderCell = index => (
    <button
      className={`ttt-cell${winnerLine.includes(index) ? ' winner' : ''}`}
      key={index}
      onClick={() => handleCellClick(index)}
      aria-label={`Tic tac toe cell ${index+1}, ${board[index] ? board[index] : 'empty'}`}
      disabled={gameOver || !!board[index]}
      tabIndex={0}
      style={{
        color: board[index] === 'X' ? COLORS.primary : COLORS.accent
      }}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="ttt-outer-container" style={{background: 'var(--bg-primary)'}}>
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status" style={{ color: gameOver && status.startsWith('Winner') ? COLORS.primary : COLORS.secondary}}>
          {status}
        </div>
        <div className="ttt-board">
          {board.map((_, idx) => renderCell(idx))}
        </div>
        <div className="ttt-controls">
          <button
            className="ttt-btn"
            onClick={startNewGame}
            style={{
              background: COLORS.primary,
              color: '#fff'
            }}
            aria-label="Start new game"
          >New Game</button>
          <button
            className="ttt-btn"
            onClick={restartGame}
            style={{
              background: COLORS.accent,
              color: '#fff'
            }}
            aria-label="Restart game"
          >Restart</button>
        </div>
        <div className="ttt-credits">
          <span style={{ color: COLORS.secondary, fontSize: 12}}>Player vs Player • Minimal UI</span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Single-component interface
  return (
    <TicTacToe />
  );
}

export default App;
