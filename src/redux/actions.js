export const addCrypto = (crypto) => ({
    type: 'ADD_CRYPTO',
    payload: crypto,
  });
  
  export const removeCrypto = (id) => ({
    type: 'REMOVE_CRYPTO',
    payload: id,
  });
  
  export const setCryptos = (cryptos) => ({
    type: 'SET_CRYPTOS',
    payload: cryptos,
  });
  