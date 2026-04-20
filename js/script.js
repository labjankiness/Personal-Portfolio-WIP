// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dark/Light theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '&#9728;';
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '&#9790;';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '&#9728;';
        }
    });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.container, .hero-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Project filtering
const filterNames = {
    all: 'All Projects',
    security: 'Cybersecurity Projects',
    os: 'Operating Systems Projects',
    ai: 'AI / ML Projects',
    web: 'Web Projects',
    game: 'Game Dev Projects'
};

function applyFilter(filter) {
    const cards = document.querySelectorAll('.projects-grid .card[data-category]');
    const buttons = document.querySelectorAll('.filter-btn');
    const title = document.getElementById('filter-title');

    cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    if (title) {
        title.textContent = filterNames[filter] || 'All Projects';
    }
}

// Filter button clicks
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        applyFilter(filter);
        // Update URL without reload
        const url = new URL(window.location);
        if (filter === 'all') {
            url.searchParams.delete('filter');
        } else {
            url.searchParams.set('filter', filter);
        }
        history.replaceState(null, '', url);
    });
});

// Apply filter from URL on page load
const urlFilter = new URLSearchParams(window.location.search).get('filter');
if (urlFilter) {
    applyFilter(urlFilter);
}
