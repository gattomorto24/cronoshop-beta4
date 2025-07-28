// Index page functionality
class CronoshopIndex {
  constructor() {
    this.products = []
    this.init()
  }

  init() {
    this.loadProducts()
    this.setupEventListeners()
    this.setupSidebars()
    this.setupSearch()
    this.loadTheme()
  }

  loadProducts() {
    // Try multiple sources for products
    if (window.products && Array.isArray(window.products)) {
      this.products = window.products
      console.log(`Loaded ${this.products.length} products from window.products`)
    } else if (typeof window.products !== "undefined" && Array.isArray(window.products)) {
      this.products = window.products
      console.log(`Loaded ${this.products.length} products from global products`)
    } else {
      // Fallback products
      this.products = [
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
  },
  {
    id: "prod8",
    link: "https://amzn.to/3ZEqKut",
    img: "https://m.media-amazon.com/images/I/61cUeqowwZL._AC_SL1500_.jpg",
    nome: "Apple iPhone 16 Pro Max – 256 GB - Titanio Nero",
    prezzo: 1195.00,
    prezzo_originale: 1489.00,
    sconto: 20,
    descrizione: "Telefono 5G con controllo fotocamera avanzato, registrazione video Dolby Vision 4K a 120 fps e autonomia senza precedenti. Compatibile con AirPods.",
    categoria: "smartphone"
  },
  {
    id: "prod9",
    link: "https://amzn.to/43t1D0l",
    img: "https://m.media-amazon.com/images/I/61BGE6iu4AL.__AC_SY445_SX342_QL70_ML2_.jpg",
    nome: "Apple iPhone 14 Plus – 128 GB - Azzurro",
    prezzo: 871.00,
    prezzo_originale: 1029.00,
    sconto: 15,
    descrizione: "Smartphone Apple con 128 GB di memoria, display Super Retina XDR da 6,7\", ottime prestazioni e autonomia. Un mix di potenza e stile.",
    categoria: "smartphone"
  },
  {
    id: "prod10",
    link: "https://amzn.to/4mBncTC",
    img: "https://m.media-amazon.com/images/I/51v1hYXGsdL._AC_SL1500_.jpg",
    nome: "Google Pixel 9 Pro XL (128 GB) - Grigio Verde",
    prezzo: 879.00,
    prezzo_originale: 1099.00,
    sconto: 20,
    descrizione: "Smartphone Android sbloccato con Gemini, sistema a tripla fotocamera posteriore, batteria con autonomia fino a 24 ore e display Super Actua da 6,8\".",
    categoria: "smartphone"
  },
      ]
      console.log(`Using fallback products: ${this.products.length} items`)
    }

    this.renderProducts()
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    // Keep the big product card and add real products
    const bigProductCard = grid.querySelector(".big-product")

    const productCards = this.products.map((product) => this.createProductCard(product)).join("")

    if (bigProductCard) {
      grid.innerHTML = bigProductCard.outerHTML + productCards
    } else {
      grid.innerHTML =
        `
                <div class="product-card big-product">
                    <h3>🔥 Offerte Speciali</h3>
                    <p>Scopri i prodotti più scontati della settimana</p>
                </div>
            ` + productCards
    }

    // Hide loading indicator
    const loadingIndicator = document.getElementById("loadingIndicator")
    if (loadingIndicator) {
      loadingIndicator.style.display = "none"
    }
  }

  createProductCard(product) {
    const price = typeof product.prezzo === "number" ? product.prezzo : Number.parseFloat(product.prezzo) || 0
    const originalPrice = product.prezzo_originale
      ? typeof product.prezzo_originale === "number"
        ? product.prezzo_originale
        : Number.parseFloat(product.prezzo_originale)
      : null

    return `
            <div class="product-card" data-product-id="${product.id}">
                ${
                  product.img
                    ? `<img src="${product.img}" alt="${product.nome}" class="product-image" onerror="this.src='/placeholder.svg?height=120&width=200&text=Prodotto'">`
                    : `<div class="image-placeholder">Immagine prodotto</div>`
                }
                <div class="category">${this.getCategoryName(product.categoria)}</div>
                <div class="title">${product.nome}</div>
                <div class="description">${product.descrizione || ""}</div>
                <div class="price-section">
                    <div>
                        <span class="price" onclick="window.open('${product.link}', '_blank')">€${price.toFixed(2)}</span>
                        ${originalPrice ? `<span class="original-price">€${originalPrice.toFixed(2)}</span>` : ""}
                        ${product.sconto ? `<span class="discount-badge">-${product.sconto}%</span>` : ""}
                    </div>
                    <button class="action-icon" onclick="cronoshopIndex.addToWishlist('${product.id}')" title="Aggiungi alla wishlist">
                        <i class="ph ph-heart"></i>
                    </button>
                </div>
            </div>
        `
  }

  getCategoryName(category) {
    const categoryNames = {
      smartphone: "Smartphone",
      tech: "Tecnologia",
      fashion: "Moda",
      casa: "Casa & Cucina",
      salute: "Salute & Bellezza",
      sport: "Sport & Tempo Libero",
    }
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  setupEventListeners() {
    // Favorite button
    const favoriteBtn = document.getElementById("favoriteBtn")
    favoriteBtn?.addEventListener("click", () => {
      favoriteBtn.style.color = favoriteBtn.style.color === "rgb(255, 215, 0)" ? "" : "#ffd700"
      this.showNotification(
        favoriteBtn.style.color === "rgb(255, 215, 0)" ? "Aggiunto ai preferiti!" : "Rimosso dai preferiti!",
        "success",
      )
    })
  }

  setupSidebars() {
    const leftSidebarBtn = document.getElementById("leftSidebarBtn")
    const rightSidebarBtn = document.getElementById("rightSidebarBtn")
    const closeRightSidebarBtn = document.getElementById("closeRightSidebarBtn")
    const leftSidebar = document.getElementById("leftSidebar")
    const rightSidebar = document.getElementById("rightSidebar")
    const overlay = document.getElementById("overlay")

    // Left sidebar toggle
    leftSidebarBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      leftSidebar?.classList.toggle("visible")
      overlay?.classList.toggle("visible")
    })

    // Right sidebar toggle
    rightSidebarBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      rightSidebar?.classList.toggle("visible")
      overlay?.classList.toggle("visible")
    })

    // Close right sidebar
    closeRightSidebarBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      rightSidebar?.classList.remove("visible")
      overlay?.classList.remove("visible")
    })

    // Close on overlay click
    overlay?.addEventListener("click", () => {
      leftSidebar?.classList.remove("visible")
      rightSidebar?.classList.remove("visible")
      overlay?.classList.remove("visible")
    })

    // Dark mode toggle in left sidebar
    const darkModeToggle = document.getElementById("darkModeToggle")
    darkModeToggle?.addEventListener("change", (e) => {
      this.toggleTheme(e.target.checked)
    })

    // Sidebar search
    const sidebarSearchInput = document.getElementById("sidebarSearchInput")
    sidebarSearchInput?.addEventListener("input", (e) => {
      this.handleSearch(e.target.value)
    })

    // Voice search in sidebar
    const sidebarVoiceBtn = document.getElementById("sidebarVoiceBtn")
    sidebarVoiceBtn?.addEventListener("click", () => {
      this.startVoiceSearch()
    })
  }

  setupSearch() {
    const searchBtn = document.getElementById("searchBtn")
    const dynamicSearchBar = document.getElementById("dynamicSearchBar")
    const searchInput = document.getElementById("searchInput")
    const voiceSearchBtn = document.getElementById("voiceSearchBtn")

    // Toggle search bar
    searchBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      dynamicSearchBar?.classList.toggle("visible")
      if (dynamicSearchBar?.classList.contains("visible")) {
        searchInput?.focus()
      }
    })

    // Search input
    searchInput?.addEventListener("input", (e) => {
      this.handleSearch(e.target.value)
    })

    // Voice search
    voiceSearchBtn?.addEventListener("click", () => {
      this.startVoiceSearch()
    })

    // Close search on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dynamicSearchBar?.classList.remove("visible")
        const leftSidebar = document.getElementById("leftSidebar")
        const rightSidebar = document.getElementById("rightSidebar")
        const overlay = document.getElementById("overlay")
        leftSidebar?.classList.remove("visible")
        rightSidebar?.classList.remove("visible")
        overlay?.classList.remove("visible")
      }
    })
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.renderProducts()
      return
    }

    const filteredProducts = this.products.filter(
      (product) =>
        product.nome.toLowerCase().includes(query.toLowerCase()) ||
        product.descrizione?.toLowerCase().includes(query.toLowerCase()) ||
        product.categoria.toLowerCase().includes(query.toLowerCase()),
    )

    this.renderFilteredProducts(filteredProducts)
  }

  renderFilteredProducts(products) {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    if (products.length === 0) {
      grid.innerHTML = `
                <div class="product-card big-product">
                    <h3>🔍 Nessun risultato</h3>
                    <p>Prova con altri termini di ricerca</p>
                </div>
            `
      return
    }

    const productCards = products.map((product) => this.createProductCard(product)).join("")
    grid.innerHTML =
      `
            <div class="product-card big-product">
                <h3>🔍 Risultati ricerca</h3>
                <p>Trovati ${products.length} prodotti</p>
            </div>
        ` + productCards
  }

  startVoiceSearch() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "it-IT"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const searchInput = document.getElementById("searchInput")
        const sidebarSearchInput = document.getElementById("sidebarSearchInput")

        if (searchInput) searchInput.value = transcript
        if (sidebarSearchInput) sidebarSearchInput.value = transcript

        this.handleSearch(transcript)
        this.showNotification(`Ricerca vocale: "${transcript}"`, "info")
      }

      recognition.onerror = () => {
        this.showNotification("Errore nel riconoscimento vocale", "error")
      }

      recognition.start()
      this.showNotification("Parla ora...", "info")
    } else {
      this.showNotification("Ricerca vocale non supportata", "error")
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("cronoshop_theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    if (shouldUseDark) {
      document.body.classList.add("dark-mode")
      const darkModeToggle = document.getElementById("darkModeToggle")
      if (darkModeToggle) darkModeToggle.checked = true
    }
  }

  toggleTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("cronoshop_theme", "dark")
      this.showNotification("Tema scuro attivato", "success")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("cronoshop_theme", "light")
      this.showNotification("Tema chiaro attivato", "success")
    }
  }

  addToWishlist(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    try {
      const wishlist = JSON.parse(localStorage.getItem("cronoshop_wishlist") || "[]")
      const existingItem = wishlist.find((item) => item.id === productId)

      if (existingItem) {
        this.showNotification("Prodotto già nella wishlist", "info")
        return
      }

      wishlist.push(product)
      localStorage.setItem("cronoshop_wishlist", JSON.stringify(wishlist))
      this.showNotification("Prodotto aggiunto alla wishlist!", "success")

      // Update badges if navigation is loaded
      if (window.cronoshopNav) {
        window.cronoshopNav.updateBadges()
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      this.showNotification("Errore nell'aggiungere alla wishlist", "error")
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    const colors = {
      success: "#48bb78",
      error: "#ff4757",
      info: "#4299e1",
      warning: "#ed8936",
    }

    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: 14px;
            font-weight: 500;
            max-width: 280px;
        `

    const icons = {
      success: "check-circle",
      error: "x-circle",
      info: "info",
      warning: "warning",
    }

    notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="ph ph-${icons[type]}"></i>
                <span>${message}</span>
            </div>
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }
}

// Initialize when DOM is loaded
let cronoshopIndex
document.addEventListener("DOMContentLoaded", () => {
  cronoshopIndex = new CronoshopIndex()
  window.cronoshopIndex = cronoshopIndex
})
