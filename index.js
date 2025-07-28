/**
 * CRONOSHOP INDEX.JS - Main functionality and animations
 * Handles all interactions, animations, and dynamic content loading
 */

class CronoshopIndex {
  constructor() {
    this.products = []
    this.filteredProducts = []
    this.isSearchActive = false
    this.currentSearchQuery = ""
    this.animationQueue = []

    this.init()
  }

  init() {
    this.loadProducts()
    this.setupEventListeners()
    this.setupAnimations()
    this.loadUserPreferences()

    // Initialize with a slight delay for smooth loading
    setTimeout(() => {
      this.hideLoadingIndicator()
      this.displayProducts()
    }, 1000)
  }

  // ===== PRODUCT LOADING =====
  loadProducts() {
    // Load products from main.js
    if (typeof window.products !== "undefined" && Array.isArray(window.products)) {
      this.products = [...window.products]
      console.log(`✅ Loaded ${this.products.length} products from main.js`)
    } else if (typeof window.products !== "undefined" && Array.isArray(window.products)) {
      this.products = [...window.products]
      console.log(`✅ Loaded ${this.products.length} products from global variable`)
    } else {
      console.warn("⚠️ Products not found, using fallback data")
      this.products = this.getFallbackProducts()
    }
    this.filteredProducts = [...this.products]
  }

  getFallbackProducts() {
    return [
      {
        id: "fallback1",
        nome: "Samsung Galaxy S25 Ultra",
        prezzo: 1199.0,
        prezzo_originale: 1599.0,
        sconto: 25,
        descrizione: 'Smartphone AI con display 6.9" QHD+',
        categoria: "smartphone",
        img: "https://m.media-amazon.com/images/I/61hiFJPpY9L._AC_SL1500_.jpg",
        link: "https://amzn.to/3Z551fa",
      },
      {
        id: "fallback2",
        nome: "Apple iPhone 15 (128 GB)",
        prezzo: 645.0,
        prezzo_originale: 879.0,
        sconto: 27,
        descrizione: "Display Super Retina XDR da 6,1 pollici",
        categoria: "smartphone",
        img: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
        link: "https://www.amazon.it/dp/B0CHWV5HTM",
      },
      {
        id: "fallback3",
        nome: "Calvin Klein T-Shirt Uomo",
        prezzo: 18.0,
        prezzo_originale: 35.0,
        sconto: 49,
        descrizione: "100% cotone per il massimo comfort",
        categoria: "fashion",
        img: "https://m.media-amazon.com/images/I/71BHou6YJKL._AC_SY879_.jpg",
        link: "https://amzn.to/4kbOb6E",
      },
    ]
  }

  displayProducts() {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    // Keep the big product card and add real products
    const bigProductCard = grid.querySelector(".big-product")
    const shuffled = [...this.filteredProducts].sort(() => 0.5 - Math.random())
    const selectedProducts = shuffled.slice(0, 8)

    const productCards = selectedProducts.map((product) => this.createProductCard(product)).join("")

    // Animate product loading
    this.animateProductsIn(grid, bigProductCard.outerHTML + productCards)
  }

  createProductCard(product) {
    const price = typeof product.prezzo === "number" ? product.prezzo : Number.parseFloat(product.prezzo) || 0
    const originalPrice =
      typeof product.prezzo_originale === "number"
        ? product.prezzo_originale
        : Number.parseFloat(product.prezzo_originale) || null

    const hasImage = product.img && !product.img.includes("placeholder")
    const categoryName = this.getCategoryName(product.categoria)

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="category">${categoryName}</div>
        <h3 class="title">${product.nome}</h3>
        <p class="description">${product.descrizione || "Prodotto di qualità con ottimo rapporto qualità-prezzo"}</p>
        ${
          hasImage
            ? `<img src="${product.img}" alt="${product.nome}" class="product-image" loading="lazy" onerror="this.style.display='none'">`
            : `<div class="image-placeholder">📦 Immagine prodotto</div>`
        }
        <div class="price-section">
          <div>
            <span class="price">€${price.toFixed(2)}</span>
            ${originalPrice ? `<span class="original-price">€${originalPrice.toFixed(2)}</span>` : ""}
            ${product.sconto ? `<span class="discount-badge">-${product.sconto}%</span>` : ""}
          </div>
          <button class="action-icon" onclick="cronoshopIndex.addToCart('${product.id}')" title="Aggiungi al carrello">
            <i class="ph ph-plus"></i>
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

  // ===== ANIMATIONS =====
  setupAnimations() {
    this.animatePageLoad()
    this.setupScrollAnimations()
  }

  animatePageLoad() {
    const elements = document.querySelectorAll(".main-header, .main-card, .cronoai-ad, .main-footer")
    elements.forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"

      setTimeout(() => {
        el.style.transition = "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 150)
    })
  }

  animateProductsIn(grid, content) {
    grid.style.opacity = "0"
    grid.innerHTML = content

    setTimeout(() => {
      grid.style.transition = "opacity 0.5s ease"
      grid.style.opacity = "1"

      const cards = grid.querySelectorAll(".product-card:not(.big-product)")
      cards.forEach((card, index) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px) scale(0.95)"

        setTimeout(() => {
          card.style.transition = "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)"
          card.style.opacity = "1"
          card.style.transform = "translateY(0) scale(1)"
        }, index * 100)
      })
    }, 100)
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 },
    )

    setTimeout(() => {
      document.querySelectorAll(".product-card").forEach((card) => {
        observer.observe(card)
      })
    }, 2000)
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Search functionality
    this.setupSearchControls()

    // Interactive elements
    this.setupInteractiveElements()

    // Keyboard shortcuts
    this.setupKeyboardShortcuts()
  }

  setupSearchControls() {
    // Listen for search events from navigation
    document.addEventListener("cronoshop:search", (e) => {
      this.handleSearch(e.detail.query)
    })
  }

  setupInteractiveElements() {
    // Product card interactions
    document.addEventListener("click", (e) => {
      if (e.target.closest(".product-card .action-icon")) {
        const icon = e.target.closest(".action-icon")
        this.playAddToCartAnimation(icon)
      }
    })
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // Close any open modals
        document.dispatchEvent(new CustomEvent("cronoshop:close-search"))
      }
    })
  }

  // ===== SEARCH FUNCTIONALITY =====
  handleSearch(query) {
    this.currentSearchQuery = query.toLowerCase().trim()

    if (this.currentSearchQuery === "") {
      this.filteredProducts = [...this.products]
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.nome.toLowerCase().includes(this.currentSearchQuery) ||
          product.categoria.toLowerCase().includes(this.currentSearchQuery) ||
          (product.descrizione && product.descrizione.toLowerCase().includes(this.currentSearchQuery)),
      )
    }

    this.displayProducts()
    this.showSearchResults()
  }

  showSearchResults() {
    const resultsCount = this.filteredProducts.length
    const bigProductCard = document.querySelector(".big-product")

    if (bigProductCard && this.currentSearchQuery) {
      bigProductCard.innerHTML = `
        <h3>🔍 Risultati Ricerca</h3>
        <p>Trovati ${resultsCount} prodotti per "${this.currentSearchQuery}"</p>
      `
    }
  }

  // ===== ANIMATIONS =====
  playAddToCartAnimation(icon) {
    icon.style.transform = "scale(1.3) rotate(180deg)"
    icon.style.background = "#48bb78"

    setTimeout(() => {
      icon.style.transform = "scale(1) rotate(0deg)"
      icon.style.background = ""
    }, 300)
  }

  // ===== CART FUNCTIONALITY =====
  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (!product) {
      this.showNotification("Prodotto non trovato", "error")
      return
    }

    try {
      const cart = JSON.parse(localStorage.getItem("cronoshop_cart") || "[]")
      const existingItem = cart.find((item) => item.id === productId)

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      localStorage.setItem("cronoshop_cart", JSON.stringify(cart))
      this.showNotification(`${product.nome} aggiunto al carrello!`, "success")

      // Update cart badge
      document.dispatchEvent(new CustomEvent("cronoshop:cart-updated"))
    } catch (error) {
      console.error("Error adding to cart:", error)
      this.showNotification("Errore nell'aggiungere al carrello", "error")
    }
  }

  // ===== UTILITY FUNCTIONS =====
  hideLoadingIndicator() {
    const loading = document.getElementById("loadingIndicator")
    if (loading) {
      loading.style.opacity = "0"
      setTimeout(() => loading.remove(), 300)
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
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      max-width: 300px;
      font-size: 14px;
      font-weight: 500;
      backdrop-filter: blur(20px);
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

  loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem("cronoshop_preferences") || "{}")
    console.log("User preferences loaded:", preferences)
  }
}

// Initialize the application
let cronoshopIndex

document.addEventListener("DOMContentLoaded", () => {
  cronoshopIndex = new CronoshopIndex()
  window.cronoshopIndex = cronoshopIndex
  console.log("🚀 Cronoshop Index initialized successfully!")
})

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CronoshopIndex
}
