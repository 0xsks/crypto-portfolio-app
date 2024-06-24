// cryptoNews.js

document.addEventListener('DOMContentLoaded', function() {
    const newsList = document.getElementById('newsList');
    const apiKey = '6e7be33834c37d6e3a5796ccc239508a6af2c7db'; // Cryptopanic API key

    // Fetch recent crypto news from Cryptopanic API
    axios.get('https://cryptopanic.com/api/posts/?auth_token=' + apiKey)
        .then(response => {
            const newsData = response.data.results;

            // Display the news articles in the newsList
            newsData.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching crypto news:', error);
        });
});
