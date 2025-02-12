import React from 'react'
import styled from 'styled-components'

function Board({ onGameEnd }) {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = React.useState(true)
  const [gameEnded, setGameEnded] = React.useState(false)
  
  const nextPlayer = xIsNext ? 'X' : 'O'
  const winner = calculateWinner(squares)
  const status = winner 
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Game is a draw!"
    : `Next player: ${nextPlayer}`

  React.useEffect(() => {
    const isGameOver = winner || squares.every(Boolean)
    if (isGameOver && !gameEnded) {
      onGameEnd(squares, winner)
      setGameEnded(true)
    }
  }, [winner, squares, gameEnded, onGameEnd])

  const handleClick = (index) => {
    if (squares[index] || winner) return
    
    const newSquares = squares.slice()
    const piece = xIsNext ? 'X' : 'O'
    newSquares[index] = piece
    
    // announce the move for screen reader users
    const row = Math.floor(index / 3) + 1
    const col = (index % 3) + 1
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'alert')
    announcement.style.position = 'absolute'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = `Placed ${piece} at row ${row}, column ${col}`
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
    
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const handleNewGame = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setGameEnded(false)
    
    // announce the new game for screen reader users
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'alert')
    announcement.textContent = 'New game started'
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
  }

  const isGameOver = winner || squares.every(Boolean)

  return (
    <BoardContainer role="region" aria-label="Tic Tac Toe Board">
      <GameStatus role="status" aria-live="polite">
        {status}
      </GameStatus>
      <Grid role="grid">
        {squares.map((value, index) => {
          const row = Math.floor(index / 3) + 1
          const col = (index % 3) + 1
          return (
            <Cell
              key={index}
              onClick={() => handleClick(index)}
              disabled={Boolean(value) || Boolean(winner)}
              aria-label={`${value || 'Empty'} cell at row ${row}, column ${col}`}
              role="gridcell"
              value={value}
            >
              {value}
            </Cell>
          )
        })}
      </Grid>
      {isGameOver && (
        <NewGameButton
          onClick={handleNewGame}
          aria-label="Start new game"
        >
          New Game
        </NewGameButton>
      )}
    </BoardContainer>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Board

// #region styles
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(90vw, 500px);
  margin: 0 auto;
`

const GameStatus = styled.div`
  text-align: center;
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 500;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: min(90vw, 500px);
  aspect-ratio: 1;
`

const Cell = styled.button`
  aspect-ratio: 1;
  background: #fff;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: clamp(1.5rem, 8vw, 3rem);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props =>
    props.value === 'X' ? '#2C5282' :
    props.value === 'O' ? '#9C4221' :
    '#333'};

  &:hover:not(:disabled) {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (pointer: coarse) {
    min-height: 44px;
  }
`
const NewGameButton = styled.button`
  background: #2C5282;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #2B6CB0;
  }

  &:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
  }
`
// #endregion