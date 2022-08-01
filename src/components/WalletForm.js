import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesRequest,
  expensesAction,
  fetchCoin, finishEdit, getCurrencies, updateExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const { fetchCurrencies, fetchCurrencysRequest } = this.props;
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    fetchCurrencysRequest();
    const promisse = await fetch(URL);
    const data = await promisse.json();
    const filteredData = Object.entries(data)
      .filter((coin) => coin[0] !== 'USDT')
      .map((coinName) => coinName[0]);
    fetchCurrencies(filteredData);
  }

  sumExpenses = (dataExpenses) => {
    const { totalSumExpenses } = this.props;
    const totalExpenses = dataExpenses.reduce((acc, curr) => {
      acc += (parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask));
      return acc;
    }, 0);
    totalSumExpenses(parseFloat(totalExpenses));
  }

  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { getExpenses } = this.props;
    this.setState((prev) => ({ id: prev.id + 1 }), () => {
      getExpenses(this.state);
      this.setState({ value: '', description: '' });
    });
    setTimeout(() => {
      const { dataExpenses } = this.props;
      this.sumExpenses(dataExpenses);
    }, 100);
  }

  updateExpense = () => {
    const { idToEditAction, dataExpenses, updateExpenseAction } = this.props;
    const { value, description, currency, method, tag } = this.state;
    dataExpenses[idToEditAction].value = value;
    dataExpenses[idToEditAction].description = description;
    dataExpenses[idToEditAction].currency = currency;
    dataExpenses[idToEditAction].method = method;
    dataExpenses[idToEditAction].tag = tag;
    updateExpenseAction(dataExpenses);
    return dataExpenses;
  }

  handleInputsEdit = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.updateExpense();
    });
  }

  handleClickEdit = () => {
    const { finishEditAction } = this.props;
    const dataExpenses = this.updateExpense();
    this.sumExpenses(dataExpenses);
    this.setState({ value: '', description: '' });
    finishEditAction();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { dataCoin, switchButton } = this.props;
    return (
      <fieldset>
        <label htmlFor="value-id">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value-id"
            min="0"
            name="value"
            value={ value }
            onChange={ switchButton ? this.handleInputsEdit : this.handleInputs }
          />
        </label>

        <label htmlFor="description-id">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-id"
            name="description"
            value={ description }
            onChange={ switchButton ? this.handleInputsEdit : this.handleInputs }
          />
        </label>

        <label htmlFor="currency-id">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-id"
            name="currency"
            value={ currency }
            onChange={ switchButton ? this.handleInputsEdit : this.handleInputs }
          >
            {
              dataCoin.map((coinName) => (
                <option
                  key={ coinName }
                  value={ coinName }
                >
                  {`${coinName}`}
                </option>
              ))
            }
          </select>

        </label>
        <label htmlFor="method-id">
          Forma de pagamento:
          <select
            data-testid="method-input"
            id="method-id"
            name="method"
            value={ method }
            onChange={ switchButton ? this.handleInputsEdit : this.handleInputs }
          >
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag-id">
          Tag:
          <select
            data-testid="tag-input"
            id="tag-id"
            name="tag"
            value={ tag }
            onChange={ switchButton ? this.handleInputsEdit : this.handleInputs }
          >
            <option value="Alimentação">
              Alimentação
            </option>
            <option value="Lazer">
              Lazer
            </option>
            <option value="Trabalho">
              Trabalho
            </option>
            <option value="Transporte">
              Transporte
            </option>
            <option value="Saúde">
              Saúde
            </option>
          </select>
        </label>

        <button
          type="button"
          onClick={ switchButton ? this.handleClickEdit : this.handleClick }
        >
          { switchButton ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </fieldset>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  fetchCurrencysRequest: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  totalSumExpenses: PropTypes.func.isRequired,
  updateExpenseAction: PropTypes.func.isRequired,
  finishEditAction: PropTypes.func.isRequired,
  switchButton: PropTypes.bool.isRequired,
  idToEditAction: PropTypes.number.isRequired,
  dataCoin: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dataExpenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

const mapStateToProps = (store) => ({
  dataCoin: store.wallet.currencies,
  dataExpenses: store.wallet.expenses,
  switchButton: store.wallet.editor,
  idToEditAction: store.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (payload) => dispatch(getCurrencies(payload)),
  fetchCurrencysRequest: () => dispatch(currenciesRequest()),
  getExpenses: (payload) => dispatch(fetchCoin(payload)),
  totalSumExpenses: (payload) => dispatch(expensesAction(payload)),
  updateExpenseAction: (payload) => dispatch(updateExpense(payload)),
  finishEditAction: () => dispatch(finishEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
