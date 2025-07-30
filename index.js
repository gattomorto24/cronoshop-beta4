document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTI DEL DOM ---
    const mainHeader = document.getElementById('mainHeader');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const overlay = document.getElementById('overlay');
    const productsGrid = document.getElementById('productsGrid');
    const productModal = document.getElementById('productModal');

    // --- INIEZIONE DINAMICA HEADER E MENU ---
    mainHeader.innerHTML = `
        <button class="header-btn" id="leftSidebarBtn" aria-label="Apri menu"><i class="ph-bold ph-list"></i></button>
        <div class="search-container-wrapper">
            <div class="search-container glass" id="searchContainer">
                <i class="ph ph-magnifying-glass"></i>
                <input type="text" id="searchInput" placeholder="Cerca un'offerta...">
            </div>
        </div>
        <button class="header-btn" id="rightSidebarBtn" aria-label="Apri impostazioni"><i class="ph-bold ph-gear"></i></button>`;

    leftSidebar.innerHTML = `
        <div class="sidebar-header">
            <h3>Menu</h3>
            <button class="close-btn" id="closeLeftSidebarBtn"><i class="ph-bold ph-x"></i></button>
        </div>
        <nav class="sidebar-nav">
             <ul>
                <li><a href="index.html"><i class="ph ph-house"></i> Home</a></li>
                <li><a href="account.html"><i class="ph ph-user-circle"></i> Account</a></li>
                <li><a href="products.html"><i class="ph ph-shopping-bag"></i> Prodotti</a></li>
                <li><a href="wishlist.html"><i class="ph ph-heart"></i> Wishlist</a></li>
                <li><a href="cart.html"><i class="ph ph-shopping-cart"></i> Carrello</a></li>
                <li><a href="chisiamo.html"><i class="ph ph-info"></i> Chi Siamo</a></li>
                <li><a href="blog.html"><i class="ph ph-newspaper"></i> Blog</a></li>
                <li><a href="stats.html"><i class="ph ph-chart-bar"></i> Statistiche</a></li>
                <li><a href="themes.html"><i class="ph ph-palette"></i> Temi</a></li>
                <li><a href="faq.html"><i class="ph ph-question"></i> FAQ</a></li>
                <li><a href="privacy.html"><i class="ph ph-shield-check"></i> Privacy</a></li>
                <li><a href="terms.html"><i class="ph ph-file-text"></i> Termini</a></li>
            </ul>
        </nav>`;

    rightSidebar.innerHTML = `
        <div class="sidebar-header">
            <h3>Impostazioni</h3>
            <button class="close-btn" id="closeRightSidebarBtn"><i class="ph-bold ph-x"></i></button>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li>
                    <label class="setting-item" for="themeToggle">
                        <span><i class="ph ph-moon"></i> Tema Scuro</span>
                        <div class="toggle-switch">
                            <input type="checkbox" id="themeToggle" checked>
                            <span class="slider"></span>
                        </div>
                    </label>
                </li>
                 <li><a href="#"><i class="ph ph-bell"></i> Notifiche</a></li>
            </ul>
        </nav>`;

    // --- RICOLLEGAMENTO ELEMENTI DINAMICI E LOGICA UI ---
    const leftSidebarBtn = document.getElementById('leftSidebarBtn');
    const rightSidebarBtn = document.getElementById('rightSidebarBtn');
    const closeLeftSidebarBtn = document.getElementById('closeLeftSidebarBtn');
    const closeRightSidebarBtn = document.getElementById('closeRightSidebarBtn');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');

    const toggleSidebar = (sidebar, open) => {
        sidebar.classList.toggle('active', open);
        const anySidebarOpen = leftSidebar.classList.contains('active') || rightSidebar.classList.contains('active');
        overlay.classList.toggle('active', anySidebarOpen);
    };

    leftSidebarBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(leftSidebar, true); });
    rightSidebarBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(rightSidebar, true); });
    closeLeftSidebarBtn.addEventListener('click', () => toggleSidebar(leftSidebar, false));
    closeRightSidebarBtn.addEventListener('click', () => toggleSidebar(rightSidebar, false));
    overlay.addEventListener('click', () => {
        toggleSidebar(leftSidebar, false);
        toggleSidebar(rightSidebar, false);
    });

    searchContainer.addEventListener('click', () => {
        searchContainer.classList.add('active');
        searchInput.focus();
    });
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchInput.value === '') searchContainer.classList.remove('active');
    });
    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') searchContainer.classList.remove('active');
    });
    
    // --- GESTIONE TEMA ---
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (window.applyGlobalTheme) {
                const newTheme = themeToggle.checked ? 'dark' : 'light';
                window.applyGlobalTheme(newTheme);
            } else {
                 document.body.classList.toggle('light-mode', !themeToggle.checked);
            }
        });
    }
    if (document.body.classList.contains('light-mode')) {
         if (themeToggle) themeToggle.checked = false;
    }

    // --- GESTIONE PRODOTTI E MODALE ---
    let allProducts = [];

    const renderProducts = (filter = '') => {
        const query = filter.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.nome.toLowerCase().includes(query) ||
            product.descrizione.toLowerCase().includes(query)
        );
        if(productsGrid) {
            productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
        }
    };

    const createProductCard = (product) => {
        const price = parseFloat(product.prezzo) || 0;
        const isLiked = isProductInWishlist(product.id);
        
        return `
            <div class="product-card glass">
                <div class="product-card-clickable" data-product-id="${product.id}">
                    <img src="${product.img}" alt="${product.nome}" class="product-image">
                </div>
                <div class="product-info">
                    <h4>${product.nome}</h4>
                    <p class="price">€${price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="details-btn" data-product-id="${product.id}">Dettagli</button>
                        <button class="icon-btn ${isLiked ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Aggiungi alla wishlist">
                            <i class="ph ph-heart"></i>
                        </button>
                    </div>
                </div>
            </div>`;
    };

    const showProductModal = (product) => {
        const price = parseFloat(product.prezzo) || 0;
        const originalPrice = parseFloat(product.prezzo_originale) || 0;
        const isLiked = isProductInWishlist(product.id);

        productModal.innerHTML = `
            <div class="modal-content glass" onclick="event.stopPropagation()">
                <img src="${product.img}" alt="${product.nome}" class="modal-image">
                <div class="modal-info">
                    <h2 class="modal-title">${product.nome}</h2>
                    <p class="modal-description">${product.descrizione}</p>
                    <div class="modal-price">
                        €${price.toFixed(2)}
                        ${originalPrice > price ? `<span class="original">€${originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="modal-actions">
                         <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn primary">Vai su Amazon</a>
                         <button class="icon-btn ${isLiked ? 'active' : ''}" data-wishlist-id="${product.id}" style="width: 50px; height: 50px; font-size: 24px;"><i class="ph ph-heart"></i></button>
                    </div>
                </div>
            </div>`;
        productModal.classList.add('visible');
    };
    
    productModal.addEventListener('click', () => productModal.classList.remove('visible'));

    // --- LOGICA INTERATTIVA (WISHLIST, ETC.) ---
    const isProductInWishlist = (productId) => {
        try {
            const wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
            return wishlist.some(item => item.id === productId);
        } catch { return false; }
    };
    
    const toggleWishlist = (productId) => {
        try {
            let wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;
            
            const itemIndex = wishlist.findIndex(item => item.id === productId);
            const buttons = document.querySelectorAll(`[data-wishlist-id="${productId}"]`);

            if (itemIndex > -1) {
                wishlist.splice(itemIndex, 1);
                buttons.forEach(btn => btn.classList.remove('active'));
            } else {
                wishlist.push(product);
                buttons.forEach(btn => btn.classList.add('active'));
            }
            localStorage.setItem('cronoshop_wishlist', JSON.stringify(wishlist));
        } catch (e) { console.error("Wishlist Error:", e)}
    };

    document.body.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.details-btn');
        const wishlistBtn = e.target.closest('[data-wishlist-id]');
        
        if (detailsBtn) {
             const product = allProducts.find(p => p.id === detailsBtn.dataset.productId);
             if (product) showProductModal(product);
        }
        
        if (wishlistBtn) {
            toggleWishlist(wishlistBtn.dataset.wishlistId);
        }
    });

    // --- CARICAMENTO INIZIALE ---
    const init = () => {
        // Usa window.products definito in main.js
        if (typeof window.products !== 'undefined' && Array.isArray(window.products)) {
            allProducts = window.products;
            renderProducts();
        } else {
            console.error("Dati dei prodotti (main.js) non trovati.");
            if(productsGrid) productsGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Errore: impossibile caricare i prodotti. Assicurati che il file 'main.js' sia presente e corretto.</p>`;
        }
        searchInput.addEventListener('input', () => renderProducts(searchInput.value));
    };

    init();
});
