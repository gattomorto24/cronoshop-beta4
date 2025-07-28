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
          nome: "Samsung Galaxy S25 Ultra",
          prezzo: 1199.0,
          prezzo_originale: 1599.0,
          sconto: 25,
          descrizione: 'Smartphone AI con display 6.9" QHD+',
          categoria: "smartphone",
          img: "/placeholder.svg?height=120&width=200&text=Samsung+Galaxy",
          link: "https://amzn.to/3Z551fa",
        },
        {
          id: "prod2",
          nome: "Apple iPhone 15 Pro",
          prezzo: 899.0,
          prezzo_originale: 1199.0,
          sconto: 25,
          descrizione: "iPhone 15 Pro con chip A17 Pro",
          categoria: "smartphone",
          img: "/placeholder.svg?height=120&width=200&text=iPhone+15",
          link: "https://amzn.to/iphone15",
        },
        {
          id: "prod3",
          nome: "MacBook Air M3",
          prezzo: 1299.0,
          prezzo_originale: 1599.0,
          sconto: 19,
          descrizione: "MacBook Air con chip M3",
          categoria: "tech",
          img: "/placeholder.svg?height=120&width=200&text=MacBook+Air",
          link: "https://amzn.to/macbook",
        },
        {
          id: "prod4",
          nome: "AirPods Pro 2",
          prezzo: 229.0,
          prezzo_originale: 279.0,
          sconto: 18,
          descrizione: "AirPods Pro di 2ª generazione",
          categoria: "tech",
          img: "/placeholder.svg?height=120&width=200&text=AirPods+Pro",
          link: "https://amzn.to/airpods",
        },
        {
          id: "prod5",
          nome: "Nike Air Max 270",
          prezzo: 89.99,
          prezzo_originale: 150.0,
          sconto: 40,
          descrizione: "Scarpe sportive Nike Air Max",
          categoria: "fashion",
          img: "/placeholder.svg?height=120&width=200&text=Nike+Air+Max",
          link: "https://amzn.to/nike270",
        },
        {
          id: "prod6",
          nome: "De'Longhi Macchina Caffè",
          prezzo: 129.99,
          prezzo_originale: 199.99,
          sconto: 35,
          descrizione: "Macchina per caffè espresso",
          categoria: "casa",
          img: "/placeholder.svg?height=120&width=200&text=DeLonghi",
          link: "https://amzn.to/delonghi",
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
