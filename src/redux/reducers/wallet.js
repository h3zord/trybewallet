// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
  isFetching: false,
  totalExpenses: 0.00,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return {
      ...state, currencies: [...action.payload], isFetching: false,
    };
  case 'SUM_EXPENSES':
    return {
      ...state, totalExpenses: action.payload,
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state, expenses: [...action.payload],
    };
  case 'EDIT_EXPENSE':
    return {
      ...state, idToEdit: action.payload, editor: true,
    };
  case 'FINISH_EDIT':
    return {
      ...state, editor: false,
    };
  case 'CURRENCIES_REQUEST':
    return {
      ...state, isFetching: true,
    };
  case 'GET_COIN':
    return {
      ...state, expenses: [...state.expenses, ...action.payload], isFetching: false,
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
