// script.js
const apiKey = '844e33f62f9146a4b01b1c8e36feb5a2';
const apiUrl = 'https://newsapi.org/v2/everything?q=co2&sortBy=popularity&';
const newsContainer = document.getElementById('news-container');
const refreshButton = document.getElementById('refresh');

// "GET https://newsapi.org/v2/everything?q=CO2&apiKey=YOUR_API_KEY"

// Fetch and display random news
async function fetchNews() {
  try {
    const response = await fetch(`${apiUrl}?apikey=${apiKey}&language=en`);
    const data = await response.json();
    displayRandomNews(data.results || []);
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
  }
}

function displayRandomNews(newsList) {
  newsContainer.innerHTML = '';
  if (newsList.length === 0) {
    newsContainer.innerHTML = '<p>No news available right now.</p>';
    return;
  }

  // Shuffle news to ensure randomness
  const shuffledNews = newsList.sort(() => Math.random() - 0.5);

  shuffledNews.slice(0, 6).forEach(news => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <h3>${news.title}</h3>
      <p>${news.description || 'No description available.'}</p>
      <a href="${news.link}" target="_blank">Read More</a>
    `;
    newsContainer.appendChild(newsCard);
  });
}

// Event listener for refreshing news
refreshButton.addEventListener('click', fetchNews);

// Initial fetch
fetchNews();
