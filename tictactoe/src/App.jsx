// src/App.jsx
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
`

function App() {
  return (
    <Container>
      <Title>Tic Tac Toe</Title>
    </Container>
  )
}

export default App