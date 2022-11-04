import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.container2 }>
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
