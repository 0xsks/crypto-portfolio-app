// Mapping of ticker symbols to CoinGecko token IDs
const tokenMapping = {
    btc: 'bitcoin',
    eth: 'ethereum',
    ltc: 'litecoin',
    // Add more mappings as needed
};

async function fetchTokenPrice(tokenInput = 'btc') { // Added default value for tokenInput
    const tokenSymbol = tokenMapping[tokenInput] || tokenInput; // Use mapped ID or input as fallback
    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd`;
    const chartUrl = `https://api.coingecko.com/api/v3/coins/${tokenSymbol}/market_chart?vs_currency=usd&days=30&interval=daily`;

    try {
      const priceResponse = await fetch(priceUrl);
      if (!priceResponse.ok) throw new Error('Failed to fetch price');
      const priceData = await priceResponse.json();
      if (!priceData[tokenSymbol] || !priceData[tokenSymbol].usd) throw new Error('Price data not found');
      const price = priceData[tokenSymbol].usd;
      document.getElementById('priceDisplay').innerText = `Price: $${price}`;

      const chartResponse = await fetch(chartUrl);
      if (!chartResponse.ok) throw new Error('Failed to fetch chart');
      const chartData = await chartResponse.json();
      if (!chartData.prices) throw new Error('Chart data not found');
      const prices = chartData.prices.map((item) => item[1]);
      const dates = chartData.prices.map((item) => new Date(item[0]).toLocaleDateString());

      renderChart(dates, prices);
      fetchTopTenCryptos(); // Ensure this is called after rendering the chart
    } catch (error) {
      document.getElementById('priceDisplay').innerText = error.message;
    }
  }
  
  function renderChart(dates, prices) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    // Check if the chart instance already exists and destroy it if it does
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Price in USD',
          data: prices,
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

document.getElementById('tokenInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to stop submitting the form
        fetchTokenPrice();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetchTokenPrice('btc'); // Load Bitcoin price and chart by default
});
