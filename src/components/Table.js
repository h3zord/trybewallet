import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction, updateExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { className } = target;
    const { dataExpenses, updateExpenseAction, totalSumExpenses } = this.props;
    const filteredExpenses = dataExpenses
      .filter((expense) => (expense.id).toString() !== className);
    const totalExpenses = filteredExpenses.reduce((acc, curr) => {
      acc += (parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask));
      return acc;
    }, 0);
    updateExpenseAction(filteredExpenses);
    totalSumExpenses(totalExpenses);
  }

  render() {
    const { dataExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            dataExpenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat((expense.value)).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {
                    (parseFloat(expense.value)
                    * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className={ expense.id }
                    onClick={ () => {} }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className={ expense.id }
                    onClick={ this.deleteExpense }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dataExpenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  updateExpenseAction: PropTypes.func.isRequired,
  totalSumExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateExpenseAction: (payload) => dispatch(updateExpense(payload)),
  totalSumExpenses: (payload) => dispatch(expensesAction(payload)),
});

const mapStateToProps = (store) => ({
  dataExpenses: store.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
