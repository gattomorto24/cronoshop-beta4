/*
 * ===================================================================
 * CRONOSHOP - MAIN JAVASCRIPT FILE
 * ===================================================================
 * Complete functionality for the iOS-style Cronoshop website
 * ===================================================================
 */

// Global variables
let allProducts = []
const filteredProducts = []
let currentFilter = "all"
const currentSort = "relevance"
let currentPage = 0
const productsPerPage = 12

// Sample products data
const products = [
  {
    id: "prod1",
    nome: "Samsung Galaxy S25 Ultra",
    prezzo: 1199.0,
    prezzo_originale: 1599.0,
    sconto: 25,
    descrizione: 'Smartphone AI con display 6.9" QHD+ Dynamic AMOLED 2X',
    categoria: "smartphone",
    img: "/placeholder.svg?height=300&width=400&text=Samsung+Galaxy+S25+Ultra",
    link: "https://amzn.to/3Z551fa",
  },
  {
    id: "prod2",
    nome: "by Amazon Quinoa biologica, 500g",
    prezzo: 5.49,
    prezzo_originale: 6.99,
    sconto: 21,
    descrizione: "Quinoa biologica di alta qualità, ricca di proteine e fibre",
    categoria: "casa",
    img: "/placeholder.svg?height=300&width=400&text=Quinoa+Biologica",
    link: "https://amzn.to/4mB7UhK",
  },
  {
    id: "prod3",
    nome: "Apple iPhone 15 (128 GB)",
    prezzo: 645.0,
    prezzo_originale: 879.0,
    sconto: 27,
    descrizione: "Display Super Retina XDR da 6,1 pollici e chip A16 Bionic",
    categoria: "smartphone",
    img: "/placeholder.svg?height=300&width=400&text=iPhone+15",
    link: "https://www.amazon.it/dp/B0CHWV5HTM",
  },
  {
    id: "prod4",
    nome: "Calvin Klein T-Shirt Uomo in Cotone",
    prezzo: 18.0,
    prezzo_originale: 35.0,
    sconto: 49,
    descrizione: "Stile minimalista, 100% cotone per il massimo comfort",
    categoria: "fashion",
    img: "/placeholder.svg?height=300&width=400&text=Calvin+Klein+T-Shirt",
    link: "https://amzn.to/4kbOb6E",
  },
  {
    id: "prod5",
    nome: "Amazon Fire TV Stick HD",
    prezzo: 28.99,
    prezzo_originale: 49.99,
    sconto: 42,
    descrizione: "Streaming HD con TV gratuita e telecomando vocale Alexa",
    categoria: "tech",
    img: "/placeholder.svg?height=300&width=400&text=Fire+TV+Stick",
    link: "https://amzn.to/4jhgwHr",
  },
  {
    id: "prod6",
    nome: "Oral-B Testine Di Ricambio Originali",
    prezzo: 24.99,
    prezzo_originale: 39.99,
    sconto: 38,
    descrizione: "Confezione da 10 testine Pro Cross Action per spazzolino elettrico",
    categoria: "salute",
    img: "/placeholder.svg?height=300&width=400&text=Oral-B+Testine",
    link: "https://amzn.to/3SUojjE",
  },
  {
    id: "prod7",
    nome: "Nike Air Max 270",
    prezzo: 89.99,
    prezzo_originale: 150.0,
    sconto: 40,
    descrizione: "Scarpe sportive con tecnologia Air Max per il massimo comfort",
    categoria: "sport",
    img: "/placeholder.svg?height=300&width=400&text=Nike+Air+Max+270",
    link: "https://amzn.to/nike270",
  },
  {
    id: "prod8",
    nome: "Philips Hue Smart Bulb",
    prezzo: 19.99,
    prezzo_originale: 29.99,
    sconto: 33,
    descrizione: "Lampadina intelligente con 16 milioni di colori",
    categoria: "tech",
    img: "/placeholder.svg?height=300&width=400&text=Philips+Hue",
    link: "https://amzn.to/philipshue",
  },
  {
    id: "prod9",
    nome: "Zara Giacca Elegante Donna",
    prezzo: 45.99,
    prezzo_originale: 79.99,
    sconto: 43,
    descrizione: "Giacca elegante per donna, perfetta per l'ufficio",
    categoria: "fashion",
    img: "/placeholder.svg?height=300&width=400&text=Zara+Giacca",
    link: "https://amzn.to/zaragiacca",
  },
  {
    id: "prod10",
    nome: "De'Longhi Macchina del Caffè",
    prezzo: 129.99,
    prezzo_originale: 199.99,
    sconto: 35,
    descrizione: "Macchina per caffè espresso automatica con macinacaffè integrato",
    categoria: "casa",
    img: "/placeholder.svg?height=300&width=400&text=DeLonghi+Caffe",
    link: "https://amzn.to/delonghicaffe",
  },
  {
    id: "prod11",
    nome: "Fitbit Charge 5",
    prezzo: 149.99,
    prezzo_originale: 199.99,
    sconto: 25,
    descrizione: "Fitness tracker avanzato con GPS e monitoraggio della salute",
    categoria: "sport",
    img: "/placeholder.svg?height=300&width=400&text=Fitbit+Charge+5",
    link: "https://amzn.to/fitbitcharge5",
  },
  {
    id: "prod12",
    nome: "L'Oréal Paris Crema Viso",
    prezzo: 12.99,
    prezzo_originale: 19.99,
    sconto: 35,
    descrizione: "Crema anti-età con acido ialuronico e vitamina C",
    categoria: "salute",
    img: "/placeholder.svg?height=300&width=400&text=Loreal+Crema",
    link: "https://amzn.to/lorealcrema",
  },
]

// Make products available globally
window.products = products
allProducts = products

// Main Cronoshop App Class
class CronoshopApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadUserData()
    this.applyTheme()
    this.updateCartBadge()
    this.initializeComponents()
  }

  setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const closeMenu = document.getElementById("closeMenu")
    const overlay = document.getElementById("overlay")

    if (menuToggle) {
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault()
        this.toggleMenu()
      })
    }

    if (closeMenu) {
      closeMenu.addEventListener("click", (e) => {
        e.preventDefault()
        this.closeMenu()
      })
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        this.closeMenu()
        this.closeSearch()
      })
    }

    // Search toggle
    const searchToggle = document.getElementById("searchToggle")
    const searchCancel = document.getElementById("searchCancel")

    if (searchToggle) {
      searchToggle.addEventListener("click", (e) => {
        e.preventDefault()
        this.toggleSearch()
      })
    }

    if (searchCancel) {
      searchCancel.addEventListener("click", (e) => {
        e.preventDefault()
        this.closeSearch()
      })
    }

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", (e) => {
        e.preventDefault()
        this.toggleTheme()
      })
    }

    // Search functionality
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value))
    }

    // Filter chips
    document.querySelectorAll(".ios-filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        this.setFilter(chip.dataset.category)
      })
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu()
        this.closeSearch()
      }
    })

    // Highlight active navigation links
    this.highlightActiveNavigation()

    // Update badges on page load
    setTimeout(() => {
      this.updateCartBadge()
    }, 100)
  }

  // Add new method for highlighting active navigation
  highlightActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index"
    const activeLinks = document.querySelectorAll(`[data-page="${currentPage}"]`)
    activeLinks.forEach((link) => link.classList.add("active"))
  }

  toggleMenu() {
    const menu = document.getElementById("mobileMenu")
    const overlay = document.getElementById("overlay")

    if (menu && overlay) {
      menu.classList.toggle("active")
      overlay.classList.toggle("active")
      document.body.classList.toggle("ios-menu-open")
    }
  }

  closeMenu() {
    const menu = document.getElementById("mobileMenu")
    const overlay = document.getElementById("overlay")

    if (menu && overlay) {
      menu.classList.remove("active")
      overlay.classList.remove("active")
      document.body.classList.remove("ios-menu-open")
    }
  }

  toggleSearch() {
    const container = document.getElementById("searchContainer")
    const navbar = document.querySelector(".ios-navbar")

    if (container && navbar) {
      container.classList.toggle("active")
      navbar.classList.toggle("search-active")

      if (container.classList.contains("active")) {
        const searchInput = document.getElementById("searchInput")
        if (searchInput) {
          searchInput.focus()
        }
      }
    }
  }

  closeSearch() {
    const container = document.getElementById("searchContainer")
    const navbar = document.querySelector(".ios-navbar")
    const searchInput = document.getElementById("searchInput")

    if (container && navbar) {
      container.classList.remove("active")
      navbar.classList.remove("search-active")
    }

    if (searchInput) {
      searchInput.value = ""
    }
  }

  toggleTheme() {
    const body = document.body
    const themeBtn = document.getElementById("themeToggle")

    body.classList.toggle("ios-dark-mode")

    if (themeBtn) {
      const icon = themeBtn.querySelector("i")
      if (icon) {
        if (body.classList.contains("ios-dark-mode")) {
          icon.className = "ph ph-sun"
          localStorage.setItem("theme", "dark")
        } else {
          icon.className = "ph ph-moon"
          localStorage.setItem("theme", "light")
        }
      }
    }

    this.showNotification("Tema cambiato con successo!", "success")
  }

  applyTheme() {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = savedTheme || (prefersDark ? "dark" : "light")

    if (theme === "dark") {
      document.body.classList.add("ios-dark-mode")
      const themeBtn = document.getElementById("themeToggle")
      if (themeBtn) {
        const icon = themeBtn.querySelector("i")
        if (icon) {
          icon.className = "ph ph-sun"
        }
      }
    }
  }

  handleSearch(query) {
    if (window.location.pathname.includes("products.html")) {
      this.searchProducts(query)
    } else {
      // Redirect to products page with search query
      if (query.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`
      }
    }
  }

  searchProducts(query) {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    const filteredProducts = allProducts.filter(
      (product) =>
        product.nome.toLowerCase().includes(query.toLowerCase()) ||
        (product.descrizione && product.descrizione.toLowerCase().includes(query.toLowerCase())) ||
        product.categoria.toLowerCase().includes(query.toLowerCase()),
    )

    this.renderProducts(filteredProducts)
  }

  setFilter(category) {
    currentFilter = category
    currentPage = 0

    // Update active chip
    document.querySelectorAll(".ios-filter-chip").forEach((chip) => {
      chip.classList.remove("active")
    })

    const activeChip = document.querySelector(`[data-category="${category}"]`)
    if (activeChip) {
      activeChip.classList.add("active")
    }

    this.filterAndRenderProducts()
  }

  filterAndRenderProducts() {
    let filtered = [...allProducts]

    // Apply category filter
    if (currentFilter !== "all") {
      filtered = filtered.filter((product) => product.categoria === currentFilter)
    }

    // Apply sorting
    switch (currentSort) {
      case "price-low":
        filtered.sort((a, b) => this.getPrice(a) - this.getPrice(b))
        break
      case "price-high":
        filtered.sort((a, b) => this.getPrice(b) - this.getPrice(a))
        break
      case "discount":
        filtered.sort((a, b) => (b.sconto || 0) - (a.sconto || 0))
        break
      case "name":
        filtered.sort((a, b) => a.nome.localeCompare(b.nome))
        break
    }

    this.renderProducts(filtered)
  }

  getPrice(product) {
    return typeof product.prezzo === "number" ? product.prezzo : Number.parseFloat(product.prezzo) || 0
  }

  renderProducts(productsToRender = null) {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    const products = productsToRender || allProducts.slice(0, (currentPage + 1) * productsPerPage)

    grid.innerHTML = products.map((product) => this.createProductCard(product)).join("")
  }

  createProductCard(product) {
    const price = this.getPrice(product)
    const originalPrice =
      typeof product.prezzo_originale === "number"
        ? product.prezzo_originale
        : Number.parseFloat(product.prezzo_originale) || null

    return `
            <div class="ios-product-card ios-animate-fade-in">
                <div class="ios-product-image">
                    <img src="${product.img}" alt="${product.nome}" loading="lazy">
                </div>
                <div class="ios-product-info">
                    <div class="ios-product-category">${this.getCategoryName(product.categoria)}</div>
                    <h3 class="ios-product-title">${product.nome}</h3>
                    <p class="ios-product-description">${product.descrizione || ""}</p>
                    <div class="ios-product-price">
                        <span class="ios-price-current">€${price.toFixed(2)}</span>
                        ${originalPrice ? `<span class="ios-price-original">€${originalPrice.toFixed(2)}</span>` : ""}
                        ${product.sconto ? `<span class="ios-discount-badge">-${product.sconto}%</span>` : ""}
                    </div>
                    <div class="ios-product-actions">
                        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="ios-btn ios-btn-primary ios-btn-small">
                            <i class="ph ph-shopping-cart"></i>
                            Acquista
                        </a>
                        <button class="ios-btn ios-btn-secondary ios-btn-icon" onclick="app.addToWishlist('${product.id}')" title="Aggiungi alla wishlist">
                            <i class="ph ph-heart"></i>
                        </button>
                        <button class="ios-btn ios-btn-secondary ios-btn-icon" onclick="app.shareProduct('${product.id}')" title="Condividi">
                            <i class="ph ph-share"></i>
                        </button>
                    </div>
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

  addToWishlist(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) {
      this.showNotification("Prodotto non trovato", "error")
      return
    }

    try {
      const userData = this.getUserData()
      const wishlist = userData.wishlist || []

      const existingItem = wishlist.find((item) => item.id === productId)
      if (existingItem) {
        this.showNotification("Prodotto già nella wishlist", "info")
        return
      }

      wishlist.push(product)
      userData.wishlist = wishlist
      this.saveUserData(userData)

      this.showNotification("Prodotto aggiunto alla wishlist!", "success")
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      this.showNotification("Errore nell'aggiungere alla wishlist", "error")
    }
  }

  addToCart(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) {
      this.showNotification("Prodotto non trovato", "error")
      return
    }

    try {
      const userData = this.getUserData()
      const cart = userData.cart || []

      const existingItem = cart.find((item) => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      userData.cart = cart
      this.saveUserData(userData)

      this.updateCartBadge()
      this.showNotification("Prodotto aggiunto al carrello!", "success")
    } catch (error) {
      console.error("Error adding to cart:", error)
      this.showNotification("Errore nell'aggiungere al carrello", "error")
    }
  }

  shareProduct(productId) {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) return

    const shareData = {
      title: `${product.nome} - Cronoshop`,
      text: `Guarda questa offerta su Cronoshop: ${product.nome} a €${product.prezzo}`,
      url: product.link,
    }

    if (navigator.share) {
      navigator.share(shareData).catch(console.error)
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          this.showNotification("Link copiato negli appunti!", "success")
        })
        .catch(() => {
          this.showNotification("Impossibile condividere", "error")
        })
    }
  }

  getUserData() {
    try {
      const data = localStorage.getItem("cronoshop_data")
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error("Error loading user data:", error)
      return {}
    }
  }

  saveUserData(data) {
    try {
      localStorage.setItem("cronoshop_data", JSON.stringify(data))
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  loadUserData() {
    const userData = this.getUserData()
    // Initialize empty arrays if they don't exist
    if (!userData.cart) userData.cart = []
    if (!userData.wishlist) userData.wishlist = []
    this.saveUserData(userData)
  }

  updateCartBadge() {
    try {
      const userData = this.getUserData()

      // Update cart badge
      const cart = userData.cart || []
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

      const cartBadges = document.querySelectorAll("#cartBadge")
      cartBadges.forEach((badge) => {
        if (badge) {
          badge.textContent = totalItems
          badge.style.display = totalItems > 0 ? "block" : "none"
        }
      })

      // Update wishlist badge
      const wishlist = userData.wishlist || []
      const wishlistBadges = document.querySelectorAll("#wishlistBadge")
      wishlistBadges.forEach((badge) => {
        if (badge) {
          badge.textContent = wishlist.length
          badge.style.display = wishlist.length > 0 ? "block" : "none"
        }
      })
    } catch (error) {
      console.error("Error updating badges:", error)
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `ios-notification ios-notification-${type}`
    notification.innerHTML = `
            <div class="ios-notification-content">
                <i class="ph ph-${type === "success" ? "check-circle" : type === "error" ? "x-circle" : "info"}"></i>
                <span>${message}</span>
            </div>
        `

    document.body.appendChild(notification)

    setTimeout(() => notification.classList.add("show"), 100)
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  initializeComponents() {
    // Initialize any page-specific components
    this.initializeFAQ()
    this.initializeHomePage()
  }

  initializeFAQ() {
    document.querySelectorAll(".ios-faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.closest(".ios-faq-item")
        const isActive = faqItem.classList.contains("active")

        // Close all other FAQ items
        document.querySelectorAll(".ios-faq-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Toggle current item
        if (!isActive) {
          faqItem.classList.add("active")
        }
      })
    })
  }

  initializeHomePage() {
    // Load products on home page
    if (document.getElementById("productsGrid")) {
      this.renderProducts()
    }
  }
}

// Global functions for HTML onclick handlers
function scrollToOffers() {
  const offersSection = document.getElementById("todaysOffers")
  if (offersSection) {
    offersSection.scrollIntoView({ behavior: "smooth" })
  }
}

function toggleFAQ(element) {
  const faqItem = element.closest(".ios-faq-item")
  faqItem.classList.toggle("active")
}

// Initialize app when DOM is loaded
let app
document.addEventListener("DOMContentLoaded", () => {
  app = new CronoshopApp()
  window.app = app // Make app globally available

  // Load navigation if nav.html exists
  loadNavigation()
})

// Navigation loader
function loadNavigation() {
  const headerPlaceholder = document.querySelector(".glass-header")
  const footerPlaceholder = document.querySelector(".glass-footer")

  if (headerPlaceholder && headerPlaceholder.innerHTML.trim() === "") {
    fetch("nav.html")
      .then((response) => response.text())
      .then((data) => {
        // Extract navigation content
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, "text/html")
        const nav = doc.querySelector("nav")
        const mobileMenu = doc.querySelector(".mobile-menu")
        const overlay = doc.querySelector(".overlay")

        if (nav) {
          headerPlaceholder.appendChild(nav)
        }

        if (mobileMenu) {
          document.body.appendChild(mobileMenu)
        }

        if (overlay) {
          document.body.appendChild(overlay)
        }

        // Re-initialize app after navigation is loaded
        if (app) {
          app.setupEventListeners()
          app.updateCartBadge()
        }
      })
      .catch((error) => {
        console.error("Error loading navigation:", error)
        // Fallback: create basic navigation
        createFallbackNavigation()
      })
  }
}

function createFallbackNavigation() {
  const headerPlaceholder = document.querySelector(".glass-header")
  if (!headerPlaceholder) return

  headerPlaceholder.innerHTML = `
        <nav class="ios-navbar">
            <div class="ios-navbar-content">
                <div class="ios-navbar-left">
                    <a href="index.html" class="ios-logo">
                        <img src="assets/cronoshop-logo.png" alt="Cronoshop" class="ios-logo-image">
                        <span class="ios-logo-text">Cronoshop</span>
                    </a>
                </div>
                <div class="ios-navbar-right">
                    <button class="ios-nav-action" id="themeToggle">
                        <i class="ph ph-moon"></i>
                    </button>
                    <a href="cart.html" class="ios-nav-action">
                        <i class="ph ph-shopping-cart"></i>
                        <span class="ios-badge" id="cartBadge">0</span>
                    </a>
                </div>
            </div>
        </nav>
    `
}

// Export for global use
window.CronoshopApp = CronoshopApp
window.products = products

// Global theme management and utilities
class CronoshopGlobal {
  constructor() {
    this.init()
  }

  init() {
    this.initTheme()
    this.initGlobalEventListeners()
    this.initUtilities()
  }

  initTheme() {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem("cronoshop_theme")
    const savedSettings = localStorage.getItem("cronoshop_theme_settings")

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        this.applyThemeSettings(settings)
      } catch (error) {
        console.error("Error loading theme settings:", error)
        this.applyDefaultTheme()
      }
    } else if (savedTheme) {
      this.applyTheme(savedTheme)
    } else {
      // Auto-detect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.applyTheme(prefersDark ? "dark" : "light")
    }

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const currentTheme = localStorage.getItem("cronoshop_theme")
      if (!currentTheme || currentTheme === "auto") {
        this.applyTheme(e.matches ? "dark" : "light")
      }
    })
  }

  applyTheme(theme) {
    const html = document.documentElement
    html.classList.remove("light-theme", "dark-theme")

    if (theme === "auto") {
      const hour = new Date().getHours()
      const isDark = hour < 7 || hour >= 19
      html.classList.add(isDark ? "dark-theme" : "light-theme")
    } else {
      html.classList.add(`${theme}-theme`)
    }

    localStorage.setItem("cronoshop_theme", theme)
  }

  applyThemeSettings(settings) {
    this.applyTheme(settings.theme)

    const root = document.documentElement

    // Apply custom properties
    if (settings.fontSize) {
      root.style.setProperty("--font-size-base", `${settings.fontSize}px`)
      document.body.style.fontSize = `${settings.fontSize}px`
    }

    if (settings.borderRadius) {
      root.style.setProperty("--border-radius-custom", `${settings.borderRadius}px`)
    }

    // Apply classes
    root.classList.toggle("glass-disabled", !settings.glassEffect)
    root.classList.toggle("reduced-motion", settings.reducedMotion)
    root.classList.toggle("high-contrast", settings.highContrast)
  }

  applyDefaultTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    this.applyTheme(prefersDark ? "dark" : "light")
  }

  initGlobalEventListeners() {
    // Global keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        this.focusSearch()
      }

      // Ctrl/Cmd + D for dark mode toggle
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault()
        this.toggleTheme()
      }
    })

    // Global click handler for external links
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="http"]')
      if (link && !link.href.includes("cronoshop.eu")) {
        // Add analytics or tracking here if needed
        console.log("External link clicked:", link.href)
      }
    })
  }

  initUtilities() {
    // Add utility functions to window for global access
    window.cronoshop = {
      theme: {
        toggle: () => this.toggleTheme(),
        set: (theme) => this.applyTheme(theme),
        get: () => localStorage.getItem("cronoshop_theme") || "light",
      },
      utils: {
        formatPrice: this.formatPrice,
        formatDate: this.formatDate,
        showNotification: this.showNotification,
        copyToClipboard: this.copyToClipboard,
      },
    }
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem("cronoshop_theme") || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    this.applyTheme(newTheme)
    this.showNotification(`Tema ${newTheme === "dark" ? "scuro" : "chiaro"} attivato`, "success")
  }

  focusSearch() {
    const searchInput = document.querySelector('#searchInput, .search-input, input[type="search"]')
    if (searchInput) {
      searchInput.focus()
      searchInput.select()
    }
  }

  formatPrice(price) {
    if (typeof price === "string") {
      price = Number.parseFloat(price.replace(/[^\d.,]/g, "").replace(",", "."))
    }
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(price || 0)
  }

  formatDate(date) {
    if (typeof date === "string") {
      date = new Date(date)
    }
    return new Intl.DateTimeFormat("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  showNotification(message, type = "info", duration = 3000) {
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        `

    const icons = {
      success: "✓",
      error: "✕",
      info: "ℹ",
      warning: "⚠",
    }

    notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span>${icons[type]}</span>
                <span>${message}</span>
            </div>
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Animate out
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }, duration)

    return notification
  }

  copyToClipboard(text) {
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showNotification("Copiato negli appunti!", "success")
          return true
        })
        .catch(() => {
          this.fallbackCopyToClipboard(text)
          return false
        })
    } else {
      return this.fallbackCopyToClipboard(text)
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand("copy")
      this.showNotification("Copiato negli appunti!", "success")
      return true
    } catch (err) {
      this.showNotification("Errore nella copia", "error")
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

// Navigation management
class CronoshopNavigation {
  constructor() {
    this.isMenuOpen = false
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateActiveNavItem()
  }

  setupEventListeners() {
    // Mobile menu toggle
    document.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-menu-btn")) {
        this.toggleMobileMenu()
      }

      if (e.target.closest(".sidebar-toggle")) {
        this.toggleSidebar(e.target.closest(".sidebar-toggle").dataset.side)
      }

      // Close menus when clicking outside
      if (!e.target.closest(".mobile-menu, .sidebar, .mobile-menu-btn, .sidebar-toggle")) {
        this.closeMobileMenu()
        this.closeSidebars()
      }
    })

    // Theme toggle in navigation
    document.addEventListener("click", (e) => {
      if (e.target.closest(".theme-toggle-btn")) {
        window.cronoshop?.theme?.toggle()
      }
    })

    // Search functionality
    document.addEventListener("input", (e) => {
      if (e.target.matches(".search-input")) {
        this.handleSearch(e.target.value)
      }
    })

    // Voice search
    document.addEventListener("click", (e) => {
      if (e.target.closest(".voice-search-btn")) {
        this.startVoiceSearch()
      }
    })
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen
    const mobileMenu = document.querySelector(".mobile-menu")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    if (mobileMenu) {
      mobileMenu.classList.toggle("active", this.isMenuOpen)
    }

    if (menuBtn) {
      menuBtn.classList.toggle("active", this.isMenuOpen)
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? "hidden" : ""
  }

  closeMobileMenu() {
    this.isMenuOpen = false
    const mobileMenu = document.querySelector(".mobile-menu")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    if (mobileMenu) {
      mobileMenu.classList.remove("active")
    }

    if (menuBtn) {
      menuBtn.classList.remove("active")
    }

    document.body.style.overflow = ""
  }

  toggleSidebar(side) {
    const sidebar = document.querySelector(`.sidebar-${side}`)
    const overlay = document.querySelector(".sidebar-overlay")

    if (sidebar) {
      const isOpen = sidebar.classList.contains("active")

      // Close all sidebars first
      this.closeSidebars()

      if (!isOpen) {
        sidebar.classList.add("active")
        if (overlay) {
          overlay.classList.add("active")
        }
        document.body.style.overflow = "hidden"
      }
    }
  }

  closeSidebars() {
    const sidebars = document.querySelectorAll(".sidebar-left, .sidebar-right")
    const overlay = document.querySelector(".sidebar-overlay")

    sidebars.forEach((sidebar) => {
      sidebar.classList.remove("active")
    })

    if (overlay) {
      overlay.classList.remove("active")
    }

    document.body.style.overflow = ""
  }

  updateActiveNavItem() {
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href && (currentPath.endsWith(href) || (href === "index.html" && currentPath === "/"))) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  handleSearch(query) {
    if (query.length < 2) return

    // Debounce search
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query)
    }, 300)
  }

  performSearch(query) {
    console.log("Searching for:", query)
    // Implement search logic here
    // This could redirect to products.html with search parameters
    // or show search suggestions
  }

  startVoiceSearch() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      window.cronoshop?.utils?.showNotification("Ricerca vocale non supportata", "error")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "it-IT"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      window.cronoshop?.utils?.showNotification("Parla ora...", "info")
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      const searchInput = document.querySelector(".search-input")
      if (searchInput) {
        searchInput.value = transcript
        this.handleSearch(transcript)
      }
      window.cronoshop?.utils?.showNotification(`Hai detto: "${transcript}"`, "success")
    }

    recognition.onerror = (event) => {
      window.cronoshop?.utils?.showNotification("Errore nella ricerca vocale", "error")
    }

    recognition.start()
  }
}

// Initialize global functionality
document.addEventListener("DOMContentLoaded", () => {
  window.cronoshopGlobal = new CronoshopGlobal()
  window.cronoshopNavigation = new CronoshopNavigation()
})

// Utility functions for backward compatibility
function toggleTheme() {
  window.cronoshop?.theme?.toggle()
}

function showNotification(message, type = "info") {
  window.cronoshop?.utils?.showNotification(message, type)
}

function formatPrice(price) {
  return window.cronoshop?.utils?.formatPrice(price) || `€${price}`
}

// Export for modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CronoshopGlobal, CronoshopNavigation }
}
