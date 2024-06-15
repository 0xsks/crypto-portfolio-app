import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCryptoPrices } from '../api/cryptoApi';

const Portfolio = () => {
  const cryptos = useSelector((state) => state.portfolio.cryptos);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await getCryptoPrices();
      setPrices(data);
    };
    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Your Portfolio</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} - {crypto.amount} - ${prices[crypto.name.toLowerCase()]?.usd || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
