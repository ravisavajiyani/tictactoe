import React from 'react'
import styled from 'styled-components'
import Board from './components/Board'
import GameHistory from './components/GameHistory'

function App() {
  const [games, setGames] = React.useState([])

  const handleGameEnd = (squares, winner) => {
    setGames(prevGames => [...prevGames, { squares, winner }])
  }

  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <Main>
        <Board onGameEnd={handleGameEnd} />
        <GameHistory games={games} />
      </Main>
    </Container>
  )
}

export default App

// #region styles
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1rem, 5vw, 2rem);
  background-color: #f5f5f5;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: clamp(1rem, 5vw, 2rem);
  font-size: clamp(1.5rem, 6vw, 2rem);
  text-align: center;
`

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`
// #endregion