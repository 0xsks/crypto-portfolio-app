import React from 'react';
import { useSelector } from 'react-redux';

const txhistory = () => {
  const cryptos = useSelector((state) => state.portfolio.cryptos);

  return (
    <div>
      <h1>Your Transaction History</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>{crypto.name} - {crypto.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default txhistory;
