import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    return (
      <div>
        <div>
          <span>Email: </span>
          <span data-testid="email-field">{ getEmail }</span>
        </div>
        <span>Despesa Total: </span>
        <span data-testid="total-field">{ getExpenses }</span>
        <span data-testid="header-currency-field"> BRL</span>
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
