// src/components/Board.jsx
import React from 'react'
import styled from 'styled-components'

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = React.useState(true)
  
  const nextPlayer = xIsNext ? 'X' : 'O'
  const winner = calculateWinner(squares)
  const status = winner 
    ? `Winner: ${winner}` 
    : squares.every(Boolean)
    ? "Game is a draw!"
    : `Next player: ${nextPlayer}`

  const handleClick = (index) => {
    if (squares[index] || winner) return

    const newSquares = squares.slice()
    newSquares[index] = nextPlayer
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

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
// #endregion