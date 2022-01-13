import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Action from './Action'

//mocks
import { profile } from '../../mocks/profile.json';
import profileSuccess from '../../mocks/profileSuccess.json';

it('Should render Action', () => {
  const { container, debug, getByText } = render(<Action balls={profile.balls} />)
  const button = getByText('Invocar').closest('button')

  expect(getByText('Invocar shenlong')).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

it('Should open modal if user dont have all dragon balls', () => {
  const { debug, getByText } = render(<Action balls={profile.balls} />)
  const button = getByText('Invocar').closest('button')

  fireEvent.click(button)
  expect(getByText('Você não tem todas as esferas para invocar o shenlong')).toBeInTheDocument()

  const backButton = getByText('Voltar').closest('button')
  fireEvent.click(backButton)

  expect(getByText('Invocar shenlong')).toBeInTheDocument()
})

it('Should show shenlong', () => {
  const { container, debug, getByText, getByTestId } = render(<Action balls={profileSuccess.profile.balls} />)
  const button = getByText('Invocar').closest('button')

  fireEvent.click(button)
  expect(getByTestId('shenlong')).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})


