async function fetchTokenPrice() {
    const tokenSymbol = document.getElementById('tokenInput').value.toLowerCase();
    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd`;
    const chartUrl = `https://api.coingecko.com/api/v3/coins/${tokenSymbol}/market_chart?vs_currency=usd&days=30&interval=daily`;
  
    try {
      const priceResponse = await fetch(priceUrl);
      const priceData = await priceResponse.json();
      const price = priceData[tokenSymbol].usd;
      document.getElementById('priceDisplay').innerText = `Price: $${price}`;
  
      const chartResponse = await fetch(chartUrl);
      const chartData = await chartResponse.json();
      const prices = chartData.prices.map((item) => item[1]);
      const dates = chartData.prices.map((item) => new Date(item[0]).toLocaleDateString());
  
      renderChart(dates, prices);
    } catch (error) {
      document.getElementById('priceDisplay').innerText = 'Token not found or API error';
    }
  }
  
  function renderChart(dates, prices) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    const chart = new Chart(ctx, {
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