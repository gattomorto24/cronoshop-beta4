// ===================================================================================
//   THEMES.JS - GESTORE GLOBALE DI TEMI E PERSONALIZZAZIONE PER CRONOSHOP
//   Versione: 2.1 - Aggiunta logica per il cambio logo
//   Autore: Il Tuo Main Coder ;)
// ===================================================================================

class ThemeManager {
    constructor() {
        // --- 1. DEFINIZIONE DEI DATI ---
        this.themes = [
            { id: 'dark', name: 'Cronoshop Scuro', description: 'Il tema originale, elegante e riposante.', icon: '🌙', isLight: false, css: { '--bg-main': '#121212', '--bg-glass': 'rgba(28, 28, 30, 0.75)', '--text-primary': '#f5f5f7', '--text-secondary': '#a0a0a5', '--accent-primary': '#0A84FF', '--border-glass': 'rgba(255, 255, 255, 0.15)' } },
            { id: 'light', name: 'Cronoshop Chiaro', description: 'Un look pulito, fresco e tradizionale.', icon: '☀️', isLight: true, css: { '--bg-main': '#f0f2f5', '--bg-glass': 'rgba(255, 255, 255, 0.7)', '--text-primary': '#1d1d1f', '--text-secondary': '#6e6e73', '--accent-primary': '#007AFF', '--border-glass': 'rgba(0, 0, 0, 0.1)' } },
            { id: 'sunset', name: 'Tramonto Arancione', description: 'Colori caldi e vibranti per un\'atmosfera energica.', icon: '🌇', isLight: false, css: { '--bg-main': 'linear-gradient(135deg, #3a2d27, #1c1511)', '--bg-glass': 'rgba(40, 28, 20, 0.75)', '--text-primary': '#fed7aa', '--text-secondary': '#fbd38d', '--accent-primary': '#dd6b20', '--border-glass': 'rgba(254, 215, 170, 0.2)' } },
            { id: 'forest', name: 'Foresta Smeraldo', description: 'Toni verdi profondi e rilassanti ispirati alla natura.', icon: '🌲', isLight: false, css: { '--bg-main': 'linear-gradient(135deg, #1a362a, #111e18)', '--bg-glass': 'rgba(20, 40, 30, 0.75)', '--text-primary': '#c6f6d5', '--text-secondary': '#9ae6b4', '--accent-primary': '#48bb78', '--border-glass': 'rgba(154, 230, 180, 0.2)' } },
            { id: 'ocean', name: 'Oceano Profondo', description: 'Un blu intenso e immersivo per la massima concentrazione.', icon: '🌊', isLight: false, css: { '--bg-main': 'linear-gradient(135deg, #1a2941, #0e1625)', '--bg-glass': 'rgba(20, 30, 50, 0.75)', '--text-primary': '#bee3f8', '--text-secondary': '#90cdf4', '--accent-primary': '#63b3ed', '--border-glass': 'rgba(144, 205, 244, 0.2)' } },
            { id: 'nebula', name: 'Nebulosa Viola', description: 'Un tema cosmico con sfumature di viola e indaco.', icon: '✨', isLight: false, css: { '--bg-main': 'linear-gradient(135deg, #2c1a41, #1a0e25)', '--bg-glass': 'rgba(35, 20, 50, 0.75)', '--text-primary': '#e9d8fd', '--text-secondary': '#d6bcfa', '--accent-primary': '#9f7aea', '--border-glass': 'rgba(214, 188, 250, 0.2)' } },
            { id: 'luxury', name: 'Lusso Nero & Oro', description: 'Elegante e premium, con accenti dorati.', icon: '💎', isLight: false, css: { '--bg-main': '#171717', '--bg-glass': 'rgba(28, 28, 28, 0.75)', '--text-primary': '#f7fafc', '--text-secondary': '#e2e8f0', '--accent-primary': '#f6e05e', '--border-glass': 'rgba(246, 224, 94, 0.2)' } },
            { id: 'rose', name: 'Petali di Rosa', description: 'Un tema delicato con tonalità rosa e magenta.', icon: '🌸', isLight: false, css: { '--bg-main': 'linear-gradient(135deg, #421a2d, #250e1a)', '--bg-glass': 'rgba(50, 20, 35, 0.75)', '--text-primary': '#fed7e2', '--text-secondary': '#fbb6ce', '--accent-primary': '#ed64a6', '--border-glass': 'rgba(251, 182, 206, 0.2)' } },
            { id: 'cyber', name: 'Cyberpunk Neon', description: 'Stile futuristico con contrasti forti e accesi.', icon: '🌃', isLight: false, css: { '--bg-main': '#080c2d', '--bg-glass': 'rgba(15, 20, 60, 0.75)', '--text-primary': '#90cdf4', '--text-secondary': '#a3bfd8', '--accent-primary': '#f000b8', '--border-glass': 'rgba(240, 0, 184, 0.2)' } },
            { id: 'mint', name: 'Menta Fresca', description: 'Colori chiari e rinfrescanti per una sensazione di leggerezza.', icon: '🍃', isLight: true, css: { '--bg-main': '#f0fff4', '--bg-glass': 'rgba(240, 255, 244, 0.8)', '--text-primary': '#2f855a', '--text-secondary': '#48bb78', '--accent-primary': '#38b2ac', '--border-glass': 'rgba(47, 133, 90, 0.2)' } },
            { id: 'sand', name: 'Dune del Deserto', description: 'Toni caldi della sabbia per un\'esperienza avvolgente.', icon: '🏜️', isLight: true, css: { '--bg-main': '#fffaf0', '--bg-glass': 'rgba(255, 250, 240, 0.8)', '--text-primary': '#744210', '--text-secondary': '#9c4221', '--accent-primary': '#d69e2e', '--border-glass': 'rgba(116, 66, 16, 0.2)' } },
            { id: 'slate', name: 'Ardesia Moderna', description: 'Un grigio neutro e professionale, minimale e pulito.', icon: '🏢', isLight: true, css: { '--bg-main': '#e2e8f0', '--bg-glass': 'rgba(241, 245, 249, 0.8)', '--text-primary': '#2d3748', '--text-secondary': '#4a5568', '--accent-primary': '#718096', '--border-glass': 'rgba(45, 55, 72, 0.2)' } }
        ];

        this.defaultSettings = {
            themeId: 'dark',
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: 16,
            glassEffect: true,
            customBg: null,
        };

        this.settings = this.loadSettings();

        // --- 2. INIZIALIZZAZIONE ---
        this.injectHTML();
        this.bindGlobalElements();
        this.applySettings();
        this.attachGlobalListeners();

        if (document.getElementById('themesGrid')) {
            this.initThemesPage();
        }
    }

    // --- 3. METODI DI GESTIONE SETTINGS ---
    loadSettings() {
        try {
            const saved = localStorage.getItem('cronoshop_settings');
            return saved ? { ...this.defaultSettings, ...JSON.parse(saved) } : { ...this.defaultSettings };
        } catch {
            return { ...this.defaultSettings };
        }
    }

    saveSettings() {
        localStorage.setItem('cronoshop_settings', JSON.stringify(this.settings));
    }

    applySettings() {
        const root = document.documentElement;
        const body = document.body;
        const currentTheme = this.themes.find(t => t.id === this.settings.themeId) || this.themes[0];

        if (this.settings.customBg) {
            root.style.setProperty('--bg-main', this.settings.customBg);
        } else {
            Object.entries(currentTheme.css).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
        
        root.style.setProperty('--font-main', this.settings.fontFamily);
        root.style.setProperty('--font-size-base', `${this.settings.fontSize}px`);
        
        const isCurrentlyLight = this.settings.customBg ? false : currentTheme.isLight;
        body.classList.toggle('light-mode', isCurrentlyLight);
        body.classList.toggle('glass-disabled', !this.settings.glassEffect);
        
        // **NUOVA LOGICA PER IL LOGO**
        this.updateLogo(isCurrentlyLight);

        if (this.themeToggle) {
            this.themeToggle.checked = !isCurrentlyLight;
        }
    }

    // --- 4. GESTIONE DINAMICA DELL'HTML E DEGLI ELEMENTI ---
    injectHTML() {
        const mainHeader = document.getElementById('mainHeader');
        const leftSidebar = document.getElementById('leftSidebar');
        const rightSidebar = document.getElementById('rightSidebar');
        
        // Aggiungo la classe 'logo-image' all'immagine per identificarla facilmente
        if (mainHeader) {
            mainHeader.innerHTML = `
                <a href="index.html" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
                    <img src="assets/cronoshop-logo-black.png" alt="Cronoshop Logo" class="logo-image" style="height:35px">
                </a>
                <button class="header-btn" id="leftSidebarBtn" aria-label="Apri menu"><i class="ph-bold ph-list"></i></button>
                <div class="search-container-wrapper"><div class="search-container glass" id="searchContainer"><i class="ph ph-magnifying-glass"></i><input type="text" id="searchInput" placeholder="Cerca..."></div></div>
                <button class="header-btn" id="rightSidebarBtn" aria-label="Apri impostazioni"><i class="ph-bold ph-gear"></i></button>`;
        }
        if (leftSidebar) {
            leftSidebar.innerHTML = `...`; // Il contenuto del menu rimane invariato
        }
        if (rightSidebar) {
            rightSidebar.innerHTML = `...`; // Il contenuto del menu rimane invariato
        }
    }
    
    bindGlobalElements() {
        this.leftSidebarBtn = document.getElementById('leftSidebarBtn');
        this.rightSidebarBtn = document.getElementById('rightSidebarBtn');
        this.leftSidebar = document.getElementById('leftSidebar');
        this.rightSidebar = document.getElementById('rightSidebar');
        this.closeLeftSidebarBtn = document.getElementById('closeLeftSidebarBtn');
        this.closeRightSidebarBtn = document.getElementById('closeRightSidebarBtn');
        this.overlay = document.getElementById('overlay');
        this.searchContainer = document.getElementById('searchContainer');
        this.searchInput = document.getElementById('searchInput');
        this.themeToggle = document.getElementById('themeToggle');
    }

    // **NUOVA FUNZIONE PER CAMBIARE IL LOGO**
    updateLogo(isLight) {
        const logoImages = document.querySelectorAll('.logo-image');
        const logoPath = isLight ? 'assets/cronoshop-logo.png' : 'assets/cronoshop-logo-black.png';
        logoImages.forEach(img => {
            if (img.src !== logoPath) {
                img.src = logoPath;
            }
        });
    }

    // --- 5. LISTENER GLOBALI ---
    attachGlobalListeners() {
        const toggleSidebar = (sidebar, open) => { /* ... */ };
        // ... tutti gli altri listener rimangono invariati ...
    }

    // --- 6. LOGICA SPECIFICA PER themes.html ---
    initThemesPage() {
        // ... tutta la logica della pagina temi rimane invariata ...
    }
}

// Inizializza il gestore di temi non appena il DOM è pronto
new ThemeManager();
