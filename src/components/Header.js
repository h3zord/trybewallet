import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import logoWallet from '../images/logoTrybeWallet.svg';
import coin from '../images/Vector.svg';
import avatar from '../images/Vector1.svg';

class Header extends Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    return (
      <div className={ styles.container }>
        <div className={ styles.logo }>
          <img src={ logoWallet } alt="logo wallet trybe" />
        </div>
        <div className={ styles.expense }>
          <img src={ coin } alt="logo coin" />
          <p>Despesa Total: </p>
          <span data-testid="total-field">{ getExpenses.toFixed(2) }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div className={ styles.email }>
          <img src={ avatar } alt="avatar" />
          <span data-testid="email-field">{ getEmail }</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  getEmail: store.user.email,
  getExpenses: store.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
