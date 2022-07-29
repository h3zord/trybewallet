// Coloque aqui suas actions
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const COIN_REQUEST = 'COIN_REQUEST';
const GET_COIN = 'GET_COIN';
const FAILED_REQUEST = 'FAILED_REQUEST';

export const loginAction = (payload) => ({ type: LOGIN_SUCESS, payload });

const coinRequest = () => ({ type: COIN_REQUEST });

const getCoin = (payload) => ({ type: GET_COIN, payload });

const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

export function fetchDog() {
  return async (dispatch) => {
    dispatch(coinRequest());
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const promisse = await fetch(URL);
      const data = await promisse.json();
      const dataFiltered = Object.entries(data)
        .filter((coin) => coin[0] !== 'USDT')
        .map((coinName) => coinName[0]);
      dispatch(getCoin(dataFiltered));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
