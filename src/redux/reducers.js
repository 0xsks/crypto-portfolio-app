const initialState = {
    cryptos: [],
  };
  
  export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CRYPTO':
        return {
          ...state,
          cryptos: [...state.cryptos, action.payload],
        };
      case 'REMOVE_CRYPTO':
        return {
          ...state,
          cryptos: state.cryptos.filter((crypto) => crypto.id !== action.payload),
        };
      case 'SET_CRYPTOS':
        return {
          ...state,
          cryptos: action.payload,
        };
      default:
        return state;
    }
  };
  