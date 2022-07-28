// Coloque aqui suas actions
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const HANDLE_WALLET = 'HANDLE_WALLET';

export const loginAction = (payload) => ({ type: LOGIN_SUCESS, payload });
export const walletAction = () => ({ type: HANDLE_WALLET });
