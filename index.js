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
    }, 1500)
  }

  // ===== PRODUCT LOADING =====
  loadProducts() {
    // Load products from main.js - multiple fallback methods
    const products = window.products || window.products || this.getFallbackProducts()
    this.products = [...products]
    console.log(`✅ Loaded ${this.products.length} products`)
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
        img: "/placeholder.svg?height=300&width=400&text=Samsung+Galaxy+S25+Ultra",
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
        img: "/placeholder.svg?height=300&width=400&text=iPhone+15",
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
        img: "/placeholder.svg?height=300&width=400&text=Calvin+Klein+T-Shirt",
        link: "https://amzn.to/4kbOb6E",
      },
      {
        id: "fallback4",
        nome: "Amazon Fire TV Stick HD",
        prezzo: 28.99,
        prezzo_originale: 49.99,
        sconto: 42,
        descrizione: "Streaming HD con TV gratuita",
        categoria: "tech",
        img: "/placeholder.svg?height=300&width=400&text=Fire+TV+Stick",
        link: "https://amzn.to/4jhgwHr",
      },
      {
        id: "fallback5",
        nome: "Nike Air Max 270",
        prezzo: 89.99,
        prezzo_originale: 150.0,
        sconto: 40,
        descrizione: "Scarpe sportive con tecnologia Air Max",
        categoria: "sport",
        img: "/placeholder.svg?height=300&width=400&text=Nike+Air+Max+270",
        link: "https://amzn.to/nike270",
      },
      {
        id: "fallback6",
        nome: "De'Longhi Macchina del Caffè",
        prezzo: 129.99,
        prezzo_originale: 199.99,
        sconto: 35,
        descrizione: "Macchina per caffè espresso automatica",
        categoria: "casa",
        img: "/placeholder.svg?height=300&width=400&text=DeLonghi+Caffe",
        link: "https://amzn.to/delonghicaffe",
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
    this.setupSidebarControls()
    this.setupSearchControls()
    this.setupInteractiveElements()
    this.setupKeyboardShortcuts()
    this.setupDarkModeToggle()
  }

  setupSidebarControls() {
    const leftSidebarBtn = document.getElementById("leftSidebarBtn")
    const rightSidebarBtn = document.getElementById("rightSidebarBtn")
    const closeRightSidebarBtn = document.getElementById("closeRightSidebarBtn")
    const overlay = document.getElementById("overlay")
    const leftSidebar = document.getElementById("leftSidebar")
    const rightSidebar = document.getElementById("rightSidebar")

    const toggleSidebar = (sidebar, show) => {
      if (show) {
        sidebar.classList.add("visible")
        overlay.classList.add("visible")
        this.animateSidebarContent(sidebar)
      } else {
        sidebar.classList.remove("visible")
        overlay.classList.remove("visible")
      }
    }

    leftSidebarBtn?.addEventListener("click", () => {
      this.playClickAnimation(leftSidebarBtn)
      toggleSidebar(leftSidebar, true)
    })

    rightSidebarBtn?.addEventListener("click", () => {
      this.playClickAnimation(rightSidebarBtn)
      toggleSidebar(rightSidebar, true)
    })

    closeRightSidebarBtn?.addEventListener("click", () => {
      this.playClickAnimation(closeRightSidebarBtn)
      toggleSidebar(rightSidebar, false)
    })

    overlay?.addEventListener("click", () => {
      toggleSidebar(leftSidebar, false)
      toggleSidebar(rightSidebar, false)
    })

    // Toggle switches animation
    document.querySelectorAll(".toggle").forEach((toggle) => {
      toggle.addEventListener("change", () => {
        this.playToggleAnimation(toggle)
      })
    })
  }

  setupSearchControls() {
    const searchBtn = document.getElementById("searchBtn")
    const dynamicSearchBar = document.getElementById("dynamicSearchBar")
    const searchInput = document.getElementById("searchInput")
    const voiceSearchBtn = document.getElementById("voiceSearchBtn")

    searchBtn?.addEventListener("click", (e) => {
      e.stopPropagation()
      this.toggleSearchBar()
    })

    searchInput?.addEventListener("input", (e) => {
      this.handleSearch(e.target.value)
    })

    voiceSearchBtn?.addEventListener("click", () => {
      this.startVoiceSearch()
    })

    document.addEventListener("click", (e) => {
      if (!dynamicSearchBar?.contains(e.target) && !searchBtn?.contains(e.target)) {
        this.closeSearchBar()
      }
    })

    const sidebarSearchInput = document.getElementById("sidebarSearchInput")
    sidebarSearchInput?.addEventListener("input", (e) => {
      this.handleSidebarSearch(e.target.value)
    })
  }

  setupInteractiveElements() {
    const favoriteBtn = document.getElementById("favoriteBtn")
    favoriteBtn?.addEventListener("click", () => {
      this.toggleFavorite(favoriteBtn)
    })

    document.querySelectorAll(".action-buttons button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.createRippleEffect(e, btn)
      })
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".product-card .action-icon")) {
        const icon = e.target.closest(".action-icon")
        this.playAddToCartAnimation(icon)
      }
    })
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        this.toggleSearchBar()
      }

      if (e.key === "Escape") {
        this.closeSearchBar()
        document.getElementById("leftSidebar")?.classList.remove("visible")
        document.getElementById("rightSidebar")?.classList.remove("visible")
        document.getElementById("overlay")?.classList.remove("visible")
      }
    })
  }

  setupDarkModeToggle() {
    const darkModeToggle = document.getElementById("darkModeToggle")

    // Load saved theme
    const savedTheme = localStorage.getItem("cronoshop_theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    if (shouldUseDark) {
      document.body.classList.add("dark-mode")
      if (darkModeToggle) darkModeToggle.checked = true
    }

    darkModeToggle?.addEventListener("change", () => {
      const isDark = darkModeToggle.checked

      if (isDark) {
        document.body.classList.add("dark-mode")
        localStorage.setItem("cronoshop_theme", "dark")
        this.showNotification("Tema scuro attivato", "success")
      } else {
        document.body.classList.remove("dark-mode")
        localStorage.setItem("cronoshop_theme", "light")
        this.showNotification("Tema chiaro attivato", "success")
      }
    })
  }

  // ===== SEARCH FUNCTIONALITY =====
  toggleSearchBar() {
    const searchBar = document.getElementById("dynamicSearchBar")
    const searchInput = document.getElementById("searchInput")

    if (!this.isSearchActive) {
      searchBar.classList.add("visible")
      this.isSearchActive = true
      setTimeout(() => searchInput?.focus(), 300)
      this.animateSearchBarOpen()
    } else {
      this.closeSearchBar()
    }
  }

  closeSearchBar() {
    const searchBar = document.getElementById("dynamicSearchBar")
    const searchInput = document.getElementById("searchInput")

    searchBar?.classList.remove("visible")
    this.isSearchActive = false
    if (searchInput) searchInput.value = ""
    this.currentSearchQuery = ""
    this.displayProducts()
  }

  animateSearchBarOpen() {
    const searchBar = document.getElementById("dynamicSearchBar")
    if (searchBar) {
      searchBar.style.transform = "translate(-50%, -50%) scale(0.8)"
      setTimeout(() => {
        searchBar.style.transform = "translate(-50%, -50%) scale(1)"
      }, 50)
    }
  }

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

  handleSidebarSearch(query) {
    console.log("Sidebar search:", query)
    this.handleSearch(query)
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

  startVoiceSearch() {
    const voiceBtn = document.getElementById("voiceSearchBtn")

    if (!voiceBtn) return

    voiceBtn.style.color = "#ff4757"
    voiceBtn.style.transform = "scale(1.2)"

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "it-IT"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const searchInput = document.getElementById("searchInput")
        if (searchInput) {
          searchInput.value = transcript
          this.handleSearch(transcript)
        }
      }

      recognition.onerror = () => {
        this.showNotification("Errore nel riconoscimento vocale", "error")
      }

      recognition.onend = () => {
        voiceBtn.style.color = ""
        voiceBtn.style.transform = ""
      }

      recognition.start()
    } else {
      setTimeout(() => {
        voiceBtn.style.color = ""
        voiceBtn.style.transform = ""
        this.showNotification("Ricerca vocale non supportata", "info")
      }, 2000)
    }
  }

  // ===== ANIMATIONS =====
  playClickAnimation(element) {
    element.style.transform = "scale(0.95)"
    setTimeout(() => {
      element.style.transform = "scale(1)"
    }, 150)
  }

  playToggleAnimation(toggle) {
    toggle.style.transform = "scale(1.1)"
    setTimeout(() => {
      toggle.style.transform = "scale(1)"
    }, 200)
  }

  animateSidebarContent(sidebar) {
    const items = sidebar.querySelectorAll(".item, .main-menu a")
    items.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateX(-20px)"

      setTimeout(() => {
        item.style.transition = "all 0.3s ease"
        item.style.opacity = "1"
        item.style.transform = "translateX(0)"
      }, index * 50)
    })
  }

  toggleFavorite(btn) {
    const isFavorited = btn.style.color === "rgb(255, 215, 0)"

    if (isFavorited) {
      btn.style.color = ""
      btn.style.transform = "scale(1)"
      this.showNotification("Rimosso dai preferiti", "info")
    } else {
      btn.style.color = "#ffd700"
      btn.style.transform = "scale(1.2)"
      setTimeout(() => {
        btn.style.transform = "scale(1)"
      }, 200)
      this.showNotification("Aggiunto ai preferiti", "success")
    }
  }

  createRippleEffect(event, button) {
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

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
      this.updateCartBadge()
    } catch (error) {
      console.error("Error adding to cart:", error)
      this.showNotification("Errore nell'aggiungere al carrello", "error")
    }
  }

  updateCartBadge() {
    try {
      const cart = JSON.parse(localStorage.getItem("cronoshop_cart") || "[]")
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

      const cartBadges = document.querySelectorAll(".cart-badge")
      cartBadges.forEach((badge) => {
        badge.textContent = totalItems
        badge.style.display = totalItems > 0 ? "block" : "none"
      })
    } catch (error) {
      console.error("Error updating cart badge:", error)
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
      top: 80px;
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

  addAnimationStyles() {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes slideInUp {
        from {
          transform: translateY(30px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeInScale {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Dark mode styles */
      body.dark-mode {
        --background-gradient: linear-gradient(105deg, #1a1a1a 0%, #0d0d0d 100%);
        --glass-bg: rgba(0, 0, 0, 0.3);
        --glass-border: rgba(255, 255, 255, 0.05);
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
        --card-bg: rgba(0, 0, 0, 0.4);
      }

      body.dark-mode {
        background-image: var(--background-gradient);
      }
    `
    document.head.appendChild(style)
  }
}

// Initialize the application
let cronoshopIndex

document.addEventListener("DOMContentLoaded", () => {
  cronoshopIndex = new CronoshopIndex()
  cronoshopIndex.addAnimationStyles()
  window.cronoshopIndex = cronoshopIndex
  console.log("🚀 Cronoshop Index initialized successfully!")
})

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CronoshopIndex
}
