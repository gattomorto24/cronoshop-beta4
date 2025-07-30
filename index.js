// ===================================================================================
//  INDEX.JS - SCRIPT PRINCIPALE PER LA HOMEPAGE DI CRONOSHOP
//  Versione: 3.1 - Con fallback dei prodotti integrato
//  Descrizione: Gestisce l'UI, il rendering dei prodotti, i popup interattivi
//  e la sincronizzazione con i dati utente (carrello, wishlist).
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTI GLOBALI DEL DOM ---
    const mainHeader = document.getElementById('mainHeader');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const overlay = document.getElementById('overlay');
    const productsGrid = document.getElementById('productsGrid');
    const productModal = document.getElementById('productModal');

    // --- INIEZIONE DINAMICA DELL'UI STANDARD (HEADER E MENU) ---
    // Questo garantisce che ogni pagina abbia la stessa struttura e funzionalità di base.
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

    // --- RICOLLEGAMENTO DEGLI ELEMENTI E LOGICA UI ---
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

    searchContainer.addEventListener('click', () => { searchContainer.classList.add('active'); searchInput.focus(); });
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchInput.value === '') searchContainer.classList.remove('active');
    });
    searchInput.addEventListener('blur', () => { if (searchInput.value === '') searchContainer.classList.remove('active'); });

    // --- GESTIONE DEL TEMA ---
    // Si interfaccia con themes.js per garantire la coerenza
    themeToggle.addEventListener('change', () => {
        if (window.themeManager && typeof window.themeManager.applySettings === 'function') {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            window.themeManager.settings.themeId = newTheme;
            window.themeManager.settings.customBg = null;
            window.themeManager.saveSettings();
            window.themeManager.applySettings();
        } else {
            // Fallback se themes.js non è ancora caricato
            document.body.classList.toggle('light-mode', !themeToggle.checked);
        }
    });
    // Sincronizzazione iniziale
    if (document.body.classList.contains('light-mode')) {
        if (themeToggle) themeToggle.checked = false;
    }

    // --- LOGICA SPECIFICA DELLA HOMEPAGE ---
    let allProducts = [];
    if (typeof window.products !== 'undefined') {
        allProducts = window.products;
    } else {
        console.warn("Dati dei prodotti (main.js) non trovati. Utilizzo della lista di fallback interna.");
        // Fallback: se main.js non carica i prodotti, usiamo questa lista predefinita.
        allProducts = [
            {
                id: "prod1",
                link: "https://amzn.to/3Z551fa",
                img: "https://m.media-amazon.com/images/I/61hiFJPpY9L._AC_SL1500_.jpg",
                nome: "Samsung Galaxy S25 Ultra",
                prezzo: 1199.00,
                prezzo_originale: 1599.00,
                sconto: 25,
                descrizione: "Smartphone AI con display 6.9\" QHD+ Dynamic AMOLED 2X, fotocamera da 200MP, RAM 12GB, memoria interna da 256GB, batteria da 5000 mAh. Colore Titanium Silverblue. Garanzia 3 anni.",
                categoria: "smartphone"
            },
            {
                id: "prod2",
                link: "https://amzn.to/4mB7UhK",
                img: "https://m.media-amazon.com/images/I/71b8mpCMTOL._AC_SL1500_.jpg",
                nome: "by Amazon Quinoa biologica, 500g",
                prezzo: 5.49,
                prezzo_originale: 6.99,
                sconto: 21,
                descrizione: "Quinoa biologica di alta qualità, ricca di proteine e fibre. Perfetta per insalate e piatti salutari.",
                categoria: "casa"
            },
            {
                id: "prod3",
                link: "https://www.amazon.it/dp/B0CHWV5HTM",
                img: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
                nome: "Apple iPhone 15 (128 GB)",
                prezzo: 645.00,
                prezzo_originale: 879.00,
                sconto: 27,
                descrizione: "Uno dei migliori smartphone per prestazioni e qualità fotografica, ora a un prezzo imbattibile. Display Super Retina XDR da 6,1 pollici e chip A16 Bionic.",
                categoria: "smartphone"
            },
            {
                id: "prod4",
                link: "https://amzn.to/4kCH9aV",
                img: "https://m.media-amazon.com/images/I/618ha2Ia5tL._AC_SL1500_.jpg",
                nome: "Samsung Galaxy S25 Smartphone AI",
                prezzo: 929.00,
                prezzo_originale: 1129.00,
                sconto: 18,
                descrizione: "Smartphone con display 6.2'' FHD+ Dynamic AMOLED 2X, fotocamera da 50MP, RAM 12GB, memoria interna 256GB, batteria da 4.000 mAh. Include 3 anni di garanzia. Colore: Mint.",
                categoria: "smartphone"
            },
            {
                id: "prod5",
                link: "https://amzn.to/3ZAt8T4",
                img: "https://m.media-amazon.com/images/I/61Wj-1t3TwL._AC_SL1500_.jpg",
                nome: "SAMSUNG Galaxy S25 Edge (512 GB)",
                prezzo: 1299.00,
                prezzo_originale: 1549.00,
                sconto: 16,
                descrizione: "Smartphone AI con display 6.7'' QHD+ Dynamic AMOLED 2X, fotocamera da 200MP, RAM 12GB, memoria interna da 512GB, batteria da 3.900 mAh. Include 3 anni di garanzia. Colore: Titanium Jetblack.",
                categoria: "smartphone"
            },
            {
                id: "prod6",
                link: "https://amzn.to/45gPEUX",
                img: "https://m.media-amazon.com/images/I/61y0hmQWlsL._AC_SL1500_.jpg",
                nome: "Samsung Galaxy S25+ Smartphone AI (512 GB)",
                prezzo: 1189.00,
                prezzo_originale: 1399.00,
                sconto: 15,
                descrizione: "Smartphone AI con display 6.7'' QHD+ Dynamic AMOLED 2X, fotocamera da 50MP, RAM 12GB, memoria interna da 512GB, batteria da 4.900 mAh. Include 3 anni di garanzia. Colore: Silver Shadow. Versione italiana.",
                categoria: "smartphone"
            },
            {
                id: "prod7",
                link: "https://amzn.to/3Z6Kc2W",
                img: "https://m.media-amazon.com/images/I/610vqacJO2L.__AC_SY445_SX342_QL70_ML2_.jpg",
                nome: "Apple iPhone 16e – 128 GB - Bianco",
                prezzo: 699.00,
                prezzo_originale: 829.00,
                sconto: 16,
                descrizione: "Progettato per Apple Intelligence, dotato di chip A18, autonomia grandiosa, fotocamera Fusion da 48MP e display Super Retina XDR da 6,1\".",
                categoria: "smartphone"
            }
        ];
    }

    /**
     * Controlla se un prodotto è presente nella wishlist salvata nel localStorage.
     * @param {string} productId - L'ID del prodotto da controllare.
     * @returns {boolean} - True se il prodotto è nella wishlist, altrimenti false.
     */
    const isProductInWishlist = (productId) => {
        try {
            const wishlist = JSON.parse(localStorage.getItem('cronoshop_wishlist') || '[]');
            return wishlist.some(item => item.id === productId);
        } catch { return false; }
    };

    /**
     * Renderizza la griglia dei prodotti, filtrando in base alla query di ricerca.
     * @param {string} filter - La stringa da usare per filtrare i prodotti.
     */
    const renderProducts = (filter = '') => {
        const query = filter.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.nome.toLowerCase().includes(query) ||
            product.descrizione.toLowerCase().includes(query)
        );
        if (productsGrid) {
            productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
        }
    };

    /**
     * Crea l'HTML per una singola card di prodotto.
     * @param {Object} product - L'oggetto del prodotto.
     * @returns {string} - La stringa HTML della card.
     */
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

    /**
     * Mostra un popup modale con i dettagli completi del prodotto.
     * @param {string} productId - L'ID del prodotto da visualizzare.
     */
    const showProductModal = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const price = parseFloat(product.prezzo) || 0;
        const originalPrice = parseFloat(product.prezzo_originale) || 0;
        const isLiked = isProductInWishlist(product.id);

        productModal.innerHTML = `
            <div class="modal-content glass" onclick="event.stopPropagation()">
                <img src="${product.img}" alt="${product.nome}" class="modal-image">
                <div class="modal-info">
                    <div class="modal-header">
                         <h2 class="modal-title">${product.nome}</h2>
                         <button class="header-btn" id="closeModalBtn" style="font-size:24px;"><i class="ph-bold ph-x"></i></button>
                    </div>
                    <p class="modal-description">${product.descrizione}</p>
                    <div class="modal-price">
                        €${price.toFixed(2)}
                        ${originalPrice > price ? `<span class="original">€${originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="modal-main-actions">
                         <button class="btn primary" data-link="${product.link}">Acquista Ora</button>
                         <button class="icon-btn" data-cart-id="${product.id}" style="width:50px; height:50px; font-size:24px;" aria-label="Aggiungi al carrello"><i class="ph ph-shopping-cart"></i></button>
                    </div>
                    <div class="modal-secondary-actions">
                         <button class="icon-btn ${isLiked ? 'active' : ''}" data-wishlist-id="${product.id}"><i class="ph ph-heart"></i> Preferiti</button>
                         <button class="icon-btn" data-share-id="${product.id}"><i class="ph ph-share-network"></i> Condividi</button>
                         <a href="products.html" class="icon-btn" style="text-decoration:none; display: flex; align-items: center; justify-content: center;"><i class="ph ph-arrows-out-simple"></i> Espandi</a>
                    </div>
                </div>
            </div>`;
        productModal.classList.add('visible');
    };

    /**
     * Gestisce l'aggiunta o la rimozione di un prodotto dalla wishlist.
     * @param {string} productId - L'ID del prodotto.
     */
    const toggleWishlist = (productId) => {
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
    };

    /**
     * Aggiunge un prodotto al carrello.
     * @param {string} productId - L'ID del prodotto.
     */
    const addToCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cronoshop_cart') || '[]');
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cronoshop_cart', JSON.stringify(cart));
        alert(`${product.nome} aggiunto al carrello!`);
    };

    /**
     * Condivide un prodotto usando l'API del browser.
     * @param {string} productId - L'ID del prodotto.
     */
    const shareProduct = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product || !navigator.share) {
            alert('Funzione di condivisione non supportata su questo browser.');
            return;
        }
        navigator.share({
            title: product.nome,
            text: `Guarda questa offerta per ${product.nome} su Cronoshop!`,
            url: product.link,
        });
    };

    // --- DELEGAZIONE DEGLI EVENTI ---
    // Un unico listener sul body per gestire tutti i click in modo efficiente.
    document.body.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.details-btn');
        const wishlistBtn = e.target.closest('[data-wishlist-id]');
        const cartBtn = e.target.closest('[data-cart-id]');
        const shareBtn = e.target.closest('[data-share-id]');
        const buyBtn = e.target.closest('[data-link]');
        const closeModalBtn = e.target.closest('#closeModalBtn');
        const modalContainer = e.target.closest('#productModal');

        if (detailsBtn) { showProductModal(detailsBtn.dataset.productId); }
        if (wishlistBtn) { toggleWishlist(wishlistBtn.dataset.wishlistId); }
        if (cartBtn) { addToCart(cartBtn.dataset.cartId); }
        if (shareBtn) { shareProduct(shareBtn.dataset.shareId); }
        if (buyBtn) { window.open(buyBtn.dataset.link, '_blank'); }
        if (closeModalBtn || (modalContainer && !e.target.closest('.modal-content'))) {
            productModal.classList.remove('visible');
        }
    });

    // Listener per la ricerca
    searchInput.addEventListener('input', () => renderProducts(searchInput.value));

    // --- CARICAMENTO INIZIALE ---
    renderProducts();
});
