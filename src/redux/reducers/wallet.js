// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'COIN_REQUEST':
    return {
      ...state, isFetching: true,
    };
  case 'GET_COIN':
    return {
      ...state, currencies: [...action.payload], isFetching: false,
    };
  case 'FAILED_REQUEST':
    return {
      ...state, error: `${action.payload}`, isFetching: false,
    };
  default:
    return state;
  }
};

export default wallet;
