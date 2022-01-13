import React from 'react'
import { render, fireEvent, getByText } from '@testing-library/react'
import { Router } from 'react-router-dom'
import App from './App'

it('Should render correct router', () => {
  const history = createMemoryHistory()
  const { container, getByText, debug } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  debug()
})