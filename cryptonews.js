// cryptoNews.js

document.addEventListener('DOMContentLoaded', async function() {
    const newsList = document.getElementById('newsList');
    const apiKey = '6e7be33834c37d6e3a5796ccc239508a6af2c7db'; // Cryptopanic API key

    try {
        const response = await fetch(`https://cryptopanic.com/api/posts/?auth_token=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch crypto news');
        }
        const data = await response.json();

        const newsData = data.results;

        newsData.forEach(article => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
            newsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching crypto news:', error);
    }
});

