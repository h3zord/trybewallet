import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';
import styles from './Login.module.css';
import logoWallet from '../images/logoTrybeWallet.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
      isDisabled: true,
    };
  }

  handleLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.handleVerifyLogin(); });
  }

  handleVerifyLogin = () => {
    const { email, pass } = this.state;
    const NUMBER = 6;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && pass.length >= NUMBER) this.setState({ isDisabled: false });
    else { this.setState({ isDisabled: true }); }
  }

  sucessLogin = () => {
    const { history, loginSucessAction } = this.props;
    const { email } = this.state;
    loginSucessAction(email);
    history.push('/carteira');
  }

  render() {
    const { email, pass, isDisabled } = this.state;
    return (
      <div className={ styles.container }>
        <div className={ styles.formCard }>
          <div className={ styles.imgContainer }>
            <img src={ logoWallet } alt="Logo trybe wallet" />
          </div>
          <input
            type="email"
            className={ styles.email }
            placeholder="Digite seu email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleLogin }
          />
          <input
            type="password"
            className={ styles.pass }
            placeholder="Digite sua senha de 6 dígitos"
            data-testid="password-input"
            name="pass"
            value={ pass }
            onChange={ this.handleLogin }
          />
          <button
            type="button"
            className={ isDisabled ? styles.buttonDisabled : styles.buttonEnabled }
            disabled={ isDisabled }
            onClick={ this.sucessLogin }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginSucessAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginSucessAction: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
