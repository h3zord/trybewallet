import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { initialState } from './helpers/mockData/'
import { mockData } from './helpers/mockData'

describe('Desenvolvendo o requisito 5', () => {
  test('Testando a página de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passInput = screen.getByPlaceholderText(/Digite sua senha/i);
    const buttonInput = screen.getByRole('button', { name: /Entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
    expect(buttonInput).toBeDisabled();

    userEvent.type(emailInput, 'lucaschmain@gmail.com');
    userEvent.type(passInput, '123456');

    expect(buttonInput).not.toBeDisabled();

    userEvent.click(buttonInput);

    expect(history.location.pathname).toBe('/carteira');

  });

  test('Testando o componente Header', () => {
  
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const emailText = screen.getByText(/Email:/i);
    const emailField = screen.getByTestId('email-field');
    const expenseText = screen.getByText(/Despesa Total/i);
    const expenseField =  screen.getByTestId('total-field');

    expect(emailText).toBeInTheDocument();
    expect(emailField).toHaveTextContent('teste@teste.com')
    expect(expenseText).toBeInTheDocument();
    expect(expenseField).toHaveTextContent(73.17);

  });

  test('Testando o componente WalletForm', () => {    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState });
    
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    const valueInput = screen.getByLabelText(/Valor/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const currencyInput = screen.getByLabelText(/Moeda/i);
    const methodInput = screen.getByLabelText(/Forma de pagamento/i);
    const tagInput = screen.getByLabelText(/Tag/i);
    const buttonInput = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
    
    userEvent.type(valueInput, '12');
    userEvent.type(descriptionInput, 'Games');
    userEvent.click(buttonInput);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(global.fetch).toHaveBeenCalledTimes(2);
   
  });

  test('Testando o componente Table', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState });
    
    const valueInput = screen.getByLabelText(/Valor/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const buttonAddInput = screen.getByRole('button', { name: /Adicionar despesa/i });
    const buttonInputEdit = screen.getAllByRole("button", { name: /editar/i })[0];
    userEvent.type(valueInput, '15');
    userEvent.type(descriptionInput, 'Games');
    userEvent.click(buttonAddInput);
    userEvent.click(buttonInputEdit);
    const buttonEditExpense = screen.getByRole('button', { name: /editar despesa/i })
    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'Teste');
    userEvent.click(buttonEditExpense);
    const expenseField =  screen.getByTestId('total-field');

    expect(expenseField).toHaveTextContent(142.59);

    const buttonDeleteInput = screen.getAllByRole("button", { name: /excluir/i })[0];
    userEvent.click(buttonDeleteInput);

    expect(expenseField).toHaveTextContent(95.06);

  });

  // test('Testando uma falha na API', () => {
  //   global.fetch = jest.fn().mockRejectedValue(new Error('Request Failure'));

  //   renderWithRouterAndRedux(<Wallet />)

  //   expect(global.fetch).toThrow()
  // });
});
