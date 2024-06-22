async function fetchTopTenCryptos() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch top cryptocurrencies');
        const data = await response.json();
        createTopTenTable(data);
    } catch (error) {
        console.error('Error fetching top cryptocurrencies:', error);
    }
}

function createTopTenTable(cryptos) {
    const table = document.createElement('table');
    table.setAttribute('id', 'topTenTable');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    ['Rank', 'Name', 'Symbol', 'Price (USD)', 'Market Cap'].forEach(text => {
        const headerCell = document.createElement('th');
        headerCell.textContent = text;
        headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    cryptos.forEach((crypto, index) => {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        const nameCell = document.createElement('td');
        nameCell.textContent = crypto.name;
        const symbolCell = document.createElement('td');
        symbolCell.textContent = crypto.symbol.toUpperCase();
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${crypto.current_price.toFixed(2)}`;
        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = `$${crypto.market_cap.toLocaleString()}`;
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(marketCapCell);
        tbody.appendChild(row);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    const tableContainer = document.getElementById('tableContainer'); // Ensure this element exists in your HTML
    tableContainer.innerHTML = ''; // Clear previous tables if any
    tableContainer.appendChild(table);
}

// Call fetchTopTenCryptos after the chart is rendered or on page load
fetchTopTenCryptos();