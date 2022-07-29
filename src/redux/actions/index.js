// Coloque aqui suas actions
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';
const GET_COIN = 'GET_COIN';
const FAILED_REQUEST = 'FAILED_REQUEST';
const GET_CURRENCIES = 'GET_CURRENCIES';
const SUM_EXPENSES = 'SUM_EXPENSES';

export const loginAction = (payload) => ({ type: LOGIN_SUCESS, payload });

export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const expensesAction = (payload) => ({ type: SUM_EXPENSES, payload });

export const currenciesRequest = () => ({ type: CURRENCIES_REQUEST });

const getCoin = (payload) => ({ type: GET_COIN, payload });

const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

export function fetchCoin(payload) {
  return async (dispatch) => {
    dispatch(currenciesRequest());
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const promisse = await fetch(URL);
      const data = await promisse.json();
      dispatch(getCoin([{ ...payload, exchangeRates: { ...data } }]));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
