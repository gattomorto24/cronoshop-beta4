document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const leftSidebarBtn = document.getElementById('leftSidebarBtn');
    const rightSidebarBtn = document.getElementById('rightSidebarBtn');
    const closeRightSidebarBtn = document.getElementById('closeRightSidebarBtn');
    const searchBtn = document.getElementById('searchBtn');
    const overlay = document.getElementById('overlay');
    const themeToggle = document.getElementById('themeToggle');

    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const dynamicSearchBar = document.getElementById('dynamicSearchBar');
    const searchInput = dynamicSearchBar.querySelector('.search-input');
    
    // --- Sidebar and Overlay Logic ---
    const toggleSidebar = (sidebar, show) => {
        sidebar.classList.toggle('visible', show);
        const anySidebarVisible = leftSidebar.classList.contains('visible') || rightSidebar.classList.contains('visible');
        overlay.classList.toggle('visible', anySidebarVisible);
    };

    leftSidebarBtn.addEventListener('click', () => toggleSidebar(leftSidebar, !leftSidebar.classList.contains('visible')));
    rightSidebarBtn.addEventListener('click', () => toggleSidebar(rightSidebar, !rightSidebar.classList.contains('visible')));
    closeRightSidebarBtn.addEventListener('click', () => toggleSidebar(rightSidebar, false));
    
    overlay.addEventListener('click', () => {
        toggleSidebar(leftSidebar, false);
        toggleSidebar(rightSidebar, false);
    });

    // --- Dynamic Search Bar Animation Logic ---
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = dynamicSearchBar.classList.toggle('visible');
        if (isVisible) {
            searchInput.focus();
        }
    });
    
    // Redirect to products page on search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            window.location.href = `products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
    });

    document.addEventListener('click', (e) => {
        if (!dynamicSearchBar.contains(e.target) && !searchBtn.contains(e.target)) {
            dynamicSearchBar.classList.remove('visible');
        }
    });

    // --- Product Loading Logic ---
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid && typeof products !== 'undefined' && Array.isArray(products) && products.length > 0) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const productsToDisplay = shuffled.slice(0, 8); // Display up to 8 random products

        let productHTML = '';
        productsToDisplay.forEach(p => {
            productHTML += `
            <div class="product-card card animated-card">
                <p class="title">${p.nome.substring(0, 40)}${p.nome.length > 40 ? '...' : ''}</p>
                <div class="image-placeholder" style="background-image: url('${p.img}')"></div>
                <div class="price-section">
                    <span class="price">€${p.prezzo.toFixed(2)}</span>
                    <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="action-icon" title="Vai all'offerta su Amazon">
                        <i class="ph ph-arrow-right"></i>
                    </a>
                </div>
            </div>`;
        });
        
        productsGrid.innerHTML = productHTML;
    } else if (productsGrid) {
        productsGrid.innerHTML = "<p>Nessun prodotto da mostrare. Controlla il file main.js</p>";
    }

    // --- Theme Toggle Logic ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('light-mode');
            themeToggle.checked = false;
        }
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    // --- Simple Fade-In Animation for Cards ---
    const animatedElements = document.querySelectorAll('.card, .main-header, .main-footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
