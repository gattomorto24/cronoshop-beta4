document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTI DEL DOM ---
    const leftSidebarBtn = document.getElementById('leftSidebarBtn');
    const rightSidebarBtn = document.getElementById('rightSidebarBtn');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const closeLeftSidebarBtn = document.getElementById('closeLeftSidebarBtn');
    const closeRightSidebarBtn = document.getElementById('closeRightSidebarBtn');
    const overlay = document.getElementById('overlay');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    const productsGrid = document.getElementById('productsGrid');
    const productModal = document.getElementById('productModal');

    // --- LOGICA UI (MENU, RICERCA, OVERLAY) ---
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
        if (!searchContainer.contains(e.target) && searchInput.value === '') {
            searchContainer.classList.remove('active');
        }
    });
    searchInput.addEventListener('blur', () => {
        if(searchInput.value === '') searchContainer.classList.remove('active');
    });

    // --- GESTIONE TEMA ---
    themeToggle.addEventListener('change', () => {
        // Questa funzione è definita in themes.js ma la invochiamo da qui
        if (window.applyGlobalTheme) {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            window.applyGlobalTheme(newTheme);
        }
    });

    // --- GESTIONE PRODOTTI ---
    let allProducts = [];

    const renderProducts = (filter = '') => {
        const query = filter.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.nome.toLowerCase().includes(query) ||
            product.descrizione.toLowerCase().includes(query)
        );
        productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
    };

    const createProductCard = (product) => {
        const price = parseFloat(product.prezzo) || 0;
        const isLiked = isProductInWishlist(product.id);
        
        return `
            <div class="product-card glass" data-product-id="${product.id}">
                <img src="${product.img}" alt="${product.nome}" class="product-image">
                <div class="product-info">
                    <h4>${product.nome}</h4>
                    <p class="price">€${price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="buy-btn" data-link="${product.link}">Acquista</button>
                        <button class="icon-btn ${isLiked ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Aggiungi alla wishlist">
                            <i class="ph ph-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    // --- GESTIONE MODALE PRODOTTO ---
    const showProductModal = (product) => {
        const price = parseFloat(product.prezzo) || 0;
        const originalPrice = parseFloat(product.prezzo_originale) || 0;

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
                    <div class="product-actions">
                         <a href="${product.link}" target="_blank" class="buy-btn" style="text-decoration: none;">Vai su Amazon</a>
                         <button class="icon-btn" data-wishlist-id="${product.id}"><i class="ph ph-heart"></i></button>
                    </div>
                </div>
            </div>`;
        productModal.classList.add('visible');
    };
    
    productModal.addEventListener('click', () => {
        productModal.classList.remove('visible');
    });

    // --- INTERAZIONI (WISHLIST, ACQUISTO, ETC.) ---
    const isProductInWishlist = (productId) => {
        const wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
        return wishlist.some(item => item.id === productId);
    };
    
    const toggleWishlist = (productId, button) => {
        let wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;
        
        const itemIndex = wishlist.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            wishlist.splice(itemIndex, 1); // Rimuovi
            button.classList.remove('active');
        } else {
            wishlist.push(product); // Aggiungi
            button.classList.add('active');
        }
        localStorage.setItem('cronoshop_wishlist', JSON.stringify(wishlist));
    };

    productsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return;

        const wishlistBtn = e.target.closest('[data-wishlist-id]');
        const buyBtn = e.target.closest('.buy-btn');

        if (wishlistBtn) {
            toggleWishlist(wishlistBtn.dataset.wishlistId, wishlistBtn);
            return;
        }

        if (buyBtn) {
            window.open(buyBtn.dataset.link, '_blank');
            return;
        }

        // Se non è stato cliccato un pulsante, apri il modale
        const product = allProducts.find(p => p.id === card.dataset.productId);
        if (product) showProductModal(product);
    });

    // --- CARICAMENTO INIZIALE ---
    const init = () => {
        if (typeof window.products !== 'undefined') {
            allProducts = window.products;
            renderProducts();
        } else {
            console.error("Dati dei prodotti (main.js) non trovati.");
        }
        searchInput.addEventListener('input', () => renderProducts(searchInput.value));
    };

    init();
});
