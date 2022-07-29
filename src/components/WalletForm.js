import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDog } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      coin: '',
      payment: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { fetchDogRequest } = this.props;
    fetchDogRequest();
  }

  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, coin, payment, tag } = this.state;
    const { dataCoin } = this.props;
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
            onChange={ this.handleInputs }
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
            onChange={ this.handleInputs }
          />
        </label>

        <label htmlFor="coin-id">
          Moeda:
          <select
            data-testid="currency-input"
            id="coin-id"
            name="coin"
            value={ coin }
            onChange={ this.handleInputs }
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

          <label htmlFor="payment-id">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="payment-id"
              name="payment"
              value={ payment }
              onChange={ this.handleInputs }
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
              onChange={ this.handleInputs }
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
        </label>
      </fieldset>
    );
  }
}

WalletForm.propTypes = {
  fetchDogRequest: PropTypes.func.isRequired,
  dataCoin: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (store) => ({
  dataCoin: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDogRequest: () => dispatch(fetchDog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
