// Portal App JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
    initCards();
});

function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        root.dataset.theme = savedTheme;
    }

    function isDark() {
        return root.dataset.theme === 'dark' || (!root.dataset.theme && systemTheme.matches);
    }

    function updateToggle() {
        const dark = isDark();
        toggle.querySelector('span').textContent = dark ? '\u2600' : '\u263E';
        toggle.setAttribute('aria-label', dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
        toggle.setAttribute('aria-pressed', String(dark));
    }

    toggle?.addEventListener('click', () => {
        const nextTheme = isDark() ? 'light' : 'dark';
        root.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);
        updateToggle();
    });

    systemTheme.addEventListener('change', () => {
        if (!root.dataset.theme) {
            updateToggle();
        }
    });

    updateToggle();
}

function initSearch() {
    const searchInput = document.querySelector('header input[type="text"]');
    const searchBtn = document.getElementById('search-btn');
    
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

let searchDebounce;
function filterCards(query) {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        const q = query.toLowerCase().trim();
        document.querySelectorAll('.app-card').forEach(card => {
            const title = card.querySelector('.app-card-title')?.textContent || '';
            const desc  = card.querySelector('.app-card-description')?.textContent || '';
            const tags  = card.querySelector('.app-card-tags')?.textContent || '';
            const text  = (title + ' ' + desc + ' ' + tags).toLowerCase();
            card.classList.toggle('is-hidden', !text.includes(q));
        });
    }, 250);
}

function initCards() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach(card => {
        card.querySelector('.app-card-action').addEventListener('click', (e) => {
            e.preventDefault();
            const title = card.querySelector('.app-card-title')?.textContent || 'Aplikasi';
            console.log(`Opening: ${title}`);
        });
    });
}
