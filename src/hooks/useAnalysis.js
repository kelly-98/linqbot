const useAnalysis = () => {
  const fetchData = async () => {
    var response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${process.env.REACT_APP_TOKEN_CONTRACT}`
    );
    var data = await response.json();
    const pair = data.pairs[0];
    if (!pair)
      return {
        price: 0,
        liquidity: 0,
      };

    return {
      price: pair.priceUsd,
      liquidity: pair.liquidity.usd,
    };
  };

  return { fetchData };
};

export default useAnalysis;
