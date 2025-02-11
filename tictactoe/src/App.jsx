// src/App.jsx
import React from 'react'
import styled from 'styled-components'
import Board from './components/Board'

function App() {
  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <main>
        <Board />
      </main>
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
// #endregion