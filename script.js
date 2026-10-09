// Portal App JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    initSearch();
    initCards();
});

function initSearch() {
    const searchInput = document.querySelector('header input[type="text"]');
    const searchBtn = document.querySelector('header button');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterCards(e.target.value);
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchInput?.focus();
        });
    }
}

function filterCards(query) {
    const cards = document.querySelectorAll('.app-card');
    const lowerQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.app-card-title')?.textContent.toLowerCase() || '';
        const match = title.includes(lowerQuery);
        card.hidden = !match;
    });
}

function initCards() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach(card => {
        card.querySelector('.app-card-action').addEventListener('click', () => {
            const title = card.querySelector('.app-card-title')?.textContent || 'Aplikasi';
            console.log(`Opening: ${title}`);
            // Navigate to app
        });
    });
}
