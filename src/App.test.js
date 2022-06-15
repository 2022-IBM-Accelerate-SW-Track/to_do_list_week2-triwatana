import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders', () => {
  render(<App />, container);
 });

 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.click(element)
  const date = Date().toLocaleString('en-US').split(" ",4).join(' ');
  const checkDate = screen.getByText(new RegExp(date, "i"))
  expect(checkDate).toBeInTheDocument();
  const check = screen.getByText(/History Test/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.click(element)
  const date = Date().toLocaleString('en-US').split(" ",4).join(' ');
  const checkDate = screen.getByText(new RegExp(date, "i"))
  expect(checkDate).toBeInTheDocument();
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.click(element)
  const check = screen.getAllByText(/Test/i)
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a blank task', () => {
  render(<App />);
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
    const element = screen.getByRole('button', {name: /Add/i}) ;
    fireEvent.change(inputTask, { target: { value: "History Test"}})
    fireEvent.click(element)
    const date = Date().toLocaleString('en-US').split(" ",4).join(' ');
    const checkDate = screen.getByText(new RegExp(date, "i"))
    expect(checkDate).toBeInTheDocument();
    const checkTask = screen.getByRole('checkbox')
    fireEvent.click(checkTask)
    const check = screen.getByText(/You have no todo's left/i)
    expect(check).toBeInTheDocument();
   });
  
