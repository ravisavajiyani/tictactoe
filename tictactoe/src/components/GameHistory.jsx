import React from 'react'
import styled from 'styled-components'

function GameHistory({ games }) {
  if (games.length === 0) return null

  return (
    <HistoryContainer>
      <HistoryTitle>Game History</HistoryTitle>
      <GamesGrid>
        {games.map((game, gameIndex) => (
          <GameCard key={gameIndex}>
            <GameTitle>Game {gameIndex + 1}</GameTitle>
            <MiniBoardGrid>
              {game.squares.map((value, i) => (
                <MiniCell key={i} value={value}>
                  {value}
                </MiniCell>
              ))}
            </MiniBoardGrid>
            <GameResult>
              {game.winner ? `Winner: ${game.winner}` : "Draw"}
            </GameResult>
          </GameCard>
        ))}
      </GamesGrid>
    </HistoryContainer>
  )
}

export default GameHistory

// #region styles
const HistoryContainer = styled.section`
  margin-top: 2rem;
  width: 100%;
`

const HistoryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`

const GameCard = styled.article`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const GameTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`

const MiniBoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #eee;
  padding: 2px;
  border-radius: 4px;
`

const MiniCell = styled.div`
  aspect-ratio: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: ${props =>
    props.value === 'X' ? '#2C5282' :
    props.value === 'O' ? '#9C4221' :
    '#333'};
`

const GameResult = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
`
// #endregion