import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';

describe('Desenvolvendo o requisito 5', () => {
  test('Testando se existe 2 inputs e 1 botão na pagina de login', () => {
    renderWithRouterAndRedux(<App />);
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

  })
  test('Testando se os inputs e o botão estão presentes na tela da wallet', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);
    history.push('/carteira')  
    const emailText = screen.getByText(/Email:/i);
    const expenseText = screen.getByText(/Despesa Total/i);
    const valueInput = screen.getByLabelText(/Valor/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const currencyInput = screen.getByLabelText(/Moeda/i);
    const methodInput = screen.getByLabelText(/Forma de pagamento/i);
    const tagInput = screen.getByLabelText(/Tag/i);
    const buttonInput = screen.getByRole('button', { name: /Adicionar despesa/i });
    
    expect(emailText).toBeInTheDocument();
    expect(expenseText).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Pizza');
    userEvent.click(buttonInput);

  });

  test('teste provisório', () => {
    renderWithRouterAndRedux(<Table />);
    expect(screen.getByText(/Table/i)).toBeInTheDocument()
  })
});
