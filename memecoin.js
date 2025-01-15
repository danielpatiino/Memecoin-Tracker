document.addEventListener('DOMContentLoaded', () => {
    fetchMemecoins();
});

// Fetch data for popular memecoins
async function fetchMemecoins() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin,shiba-inu,pepe,bonk,floki,&order=market_cap_desc'
        );
        const data = await response.json(); // Convert response to JSON
        displayMemecoins(data); // Call a function to display the data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display the data on the webpage
function displayMemecoins(coins) {
    const container = document.getElementById('crypto-container');
    container.innerHTML = ''; // Clear the container first

    coins.forEach((coin) => {
        // Create a div for each coin
        const coinDiv = document.createElement('div');
        coinDiv.classList.add('coin-card');
        coinDiv.innerHTML = `
            <img src="${coin.image}" alt="${coin.name} logo" width="50">
            <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
            <p>Price: $${coin.current_price.toFixed(8)}</p>
            <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
            <p>Market Cap: $${(coin.market_cap / 1e9).toFixed(2)}B</p>
        `;
        container.appendChild(coinDiv); // Append to the container
    });
}
