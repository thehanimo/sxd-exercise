import { fireEvent, render, screen } from '@testing-library/react';
import App from '@/pages/_app';
import { appMachine } from '@/appMachine'

const goToSurvey = ()=>{
  render(<App />);
  const name = screen.getByLabelText('Name')
  const email = screen.getByLabelText('Email')
  fireEvent.change(name, {target: {value: 'John Doe'}})
  fireEvent.change(email, {target: {value: 'johndoe@gmail.com'}})
  fireEvent.click(screen.getByText(/Next/i))
}

const goToConfirmation = ()=>{
  goToSurvey();
  const nyc = screen.getByTestId("label-input-city-New York City")
  fireEvent.click(nyc)
  const fb = screen.getByTestId("label-input-hear-Facebook")
  fireEvent.click(fb)
  fireEvent.click(screen.getByText(/Next/i))
}

it('should reach "survey" given "userInfo" when the "SUBMIT_USER_INFO" event occurs', () => {
  const expectedValue = 'survey';
  const actualState = appMachine.transition('userInfo', { type: 'SUBMIT_USER_INFO' });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "confirmation" given "survey" when the "SUBMIT_SURVEY" event occurs', () => {
  const expectedValue = 'confirmation';
  const actualState = appMachine.transition('survey', { type: 'SUBMIT_SURVEY' });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "survey" given "confirmation" when the "BACK_TO_SURVEY" event occurs', () => {
  const expectedValue = 'survey';
  const actualState = appMachine.transition('confirmation', { type: 'BACK_TO_SURVEY' });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "userInfo" given "survey" when the "BACK_TO_USER_INFO" event occurs', () => {
  const expectedValue = 'userInfo';
  const actualState = appMachine.transition('survey', { type: 'BACK_TO_USER_INFO' });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

it('should reach "userInfo" given "confirmation" when the "RESET" event occurs', () => {
  const expectedValue = 'userInfo';
  const actualState = appMachine.transition('confirmation', { type: 'RESET' });
  expect(actualState.matches(expectedValue)).toBeTruthy();
});

test('renders userInfo', () => {
  render(<App />);
  expect(screen.getByText(/User Information/i)).toBeInTheDocument();
});

test('null name', () => {
  render(<App />);
  const name = screen.getByLabelText('Name')
  fireEvent.change(name, {target: {value: ''}})
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
});

test('null email', () => {
  render(<App />);
  const email = screen.getByLabelText('Email')
  fireEvent.change(email, {target: {value: ''}})
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
});

test('invalid email', () => {
  render(<App />);
  const email = screen.getByLabelText('Email')
  fireEvent.change(email, {target: {value: 'Hani'}})
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();
});

test('valid userInfo', () => {
  render(<App />);
  const name = screen.getByLabelText('Name')
  const email = screen.getByLabelText('Email')
  fireEvent.change(name, {target: {value: 'John Doe'}})
  fireEvent.change(email, {target: {value: 'johndoe@gmail.com'}})
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.queryByText(/Invalid Name/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Invalid Email/i)).not.toBeInTheDocument();
});

test('invalid survey', () => {
  goToSurvey();
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.getAllByText(/Please select a value/i)[0]).toBeInTheDocument();
});

test('valid survey', () => {
  goToSurvey();
  const nyc = screen.getByTestId("label-input-city-New York City")
  fireEvent.click(nyc)
  const fb = screen.getByTestId("label-input-hear-Facebook")
  fireEvent.click(fb)
  fireEvent.click(screen.getByText(/Next/i))
  expect(screen.getByText(/Confirmation/i)).toBeInTheDocument();
});

test('valid confirmation', () => {
  goToConfirmation();
  fireEvent.click(screen.getByText(/^Confirm$/i))
  expect(screen.getByText(/Your submission has been recorded/i)).toBeInTheDocument();
});

test('back to survey', () => {
  goToConfirmation();
  fireEvent.click(screen.getByText(/^Back$/i))
  expect(screen.getByText(/Survey/i)).toBeInTheDocument();
});

test('back to userInfo', () => {
  goToSurvey();
  fireEvent.click(screen.getByText(/^Back$/i))
  expect(screen.getByText(/User Information/i)).toBeInTheDocument();
});