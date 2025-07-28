document.addEventListener('DOMContentLoaded', () => {

    // --- DATI DEI TEMI E IMPOSTAZIONI DI DEFAULT ---
    const themes = [
        { id: 'dark', name: 'Cronoshop Scuro', description: 'Il tema originale, elegante e riposante.', css: { '--bg-main': '#121212', '--bg-glass': 'rgba(28, 28, 30, 0.75)', '--text-primary': '#f5f5f7', '--accent-primary': '#0A84FF' } },
        { id: 'light', name: 'Cronoshop Chiaro', description: 'Un look pulito, fresco e tradizionale.', css: { '--bg-main': '#f0f2f5', '--bg-glass': 'rgba(255, 255, 255, 0.7)', '--text-primary': '#1d1d1f', '--accent-primary': '#007AFF' } },
        { id: 'sunset', name: 'Tramonto Arancione', description: 'Colori caldi e vibranti per un\'atmosfera energica.', css: { '--bg-main': 'linear-gradient(135deg, #3a2d27, #1c1511)', '--bg-glass': 'rgba(40, 28, 20, 0.75)', '--text-primary': '#fed7aa', '--accent-primary': '#dd6b20' } },
        { id: 'forest', name: 'Foresta Smeraldo', description: 'Toni verdi profondi e rilassanti ispirati alla natura.', css: { '--bg-main': 'linear-gradient(135deg, #1a362a, #111e18)', '--bg-glass': 'rgba(20, 40, 30, 0.75)', '--text-primary': '#c6f6d5', '--accent-primary': '#48bb78' } },
        { id: 'ocean', name: 'Oceano Profondo', description: 'Un blu intenso e immersivo per la massima concentrazione.', css: { '--bg-main': 'linear-gradient(135deg, #1a2941, #0e1625)', '--bg-glass': 'rgba(20, 30, 50, 0.75)', '--text-primary': '#bee3f8', '--accent-primary': '#63b3ed' } },
        { id: 'nebula', name: 'Nebulosa Viola', description: 'Un tema cosmico con sfumature di viola e indaco.', css: { '--bg-main': 'linear-gradient(135deg, #2c1a41, #1a0e25)', '--bg-glass': 'rgba(35, 20, 50, 0.75)', '--text-primary': '#e9d8fd', '--accent-primary': '#9f7aea' } },
        { id: 'luxury', name: 'Lusso Nero & Oro', description: 'Elegante e premium, con accenti dorati.', css: { '--bg-main': '#171717', '--bg-glass': 'rgba(28, 28, 28, 0.75)', '--text-primary': '#f7fafc', '--accent-primary': '#f6e05e' } },
        { id: 'rose', name: 'Petali di Rosa', description: 'Un tema delicato con tonalità rosa e magenta.', css: { '--bg-main': 'linear-gradient(135deg, #421a2d, #250e1a)', '--bg-glass': 'rgba(50, 20, 35, 0.75)', '--text-primary': '#fed7e2', '--accent-primary': '#ed64a6' } },
        { id: 'cyber', name: 'Cyberpunk Neon', description: 'Stile futuristico con contrasti forti e accesi.', css: { '--bg-main': '#080c2d', '--bg-glass': 'rgba(15, 20, 60, 0.75)', '--text-primary': '#90cdf4', '--accent-primary': '#f000b8' } },
        { id: 'mint', name: 'Menta Fresca', description: 'Colori chiari e rinfrescanti per una sensazione di leggerezza.', css: { '--bg-main': '#f0fff4', '--bg-glass': 'rgba(240, 255, 244, 0.8)', '--text-primary': '#2f855a', '--accent-primary': '#38b2ac' } },
        { id: 'sand', name: 'Dune del Deserto', description: 'Toni caldi della sabbia per un\'esperienza avvolgente.', css: { '--bg-main': '#fffaf0', '--bg-glass': 'rgba(255, 250, 240, 0.8)', '--text-primary': '#744210', '--accent-primary': '#d69e2e' } },
        { id: 'slate', name: 'Ardesia Moderna', description: 'Un grigio neutro e professionale, minimale e pulito.', css: { '--bg-main': '#e2e8f0', '--bg-glass': 'rgba(241, 245, 249, 0.8)', '--text-primary': '#2d3748', '--accent-primary': '#718096' } }
    ];

    const defaultSettings = {
        themeId: 'dark',
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 16,
        glassEffect: true,
        customBg: null,
    };

    // --- FUNZIONI DI GESTIONE GLOBALE (PER TUTTE LE PAGINE) ---
    const body = document.body;
    const root = document.documentElement;

    const loadSettings = () => {
        try {
            const saved = localStorage.getItem('cronoshop_settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    };

    const saveSettings = (settings) => {
        localStorage.setItem('cronoshop_settings', JSON.stringify(settings));
    };

    const applySettings = (settings) => {
        // Applica il tema preimpostato o un colore custom
        if (settings.customBg) {
            root.style.setProperty('--bg-main', settings.customBg);
        } else {
            const theme = themes.find(t => t.id === settings.themeId) || themes[0];
            Object.entries(theme.css).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
        
        // Applica il resto delle personalizzazioni
        root.style.setProperty('--font-main', settings.fontFamily);
        root.style.setProperty('--font-size-base', `${settings.fontSize}px`);
        body.classList.toggle('light-mode', ['light', 'mint', 'sand', 'slate'].includes(settings.themeId) && !settings.customBg);
        body.classList.toggle('glass-disabled', !settings.glassEffect);
    };

    let settings = loadSettings();
    applySettings(settings); // Applica le impostazioni al caricamento di ogni pagina

    // --- LOGICA UI GLOBALE (HEADER, MENU, TOGGLE TEMA) ---
    // (Questa parte viene eseguita su tutte le pagine dove esiste l'header)
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    if(leftSidebar && rightSidebar) {
        const overlay = document.getElementById('overlay');
        const mainHeader = document.getElementById('mainHeader');

        // Iniezione dinamica del contenuto per consistenza
        mainHeader.innerHTML = `...`; // Contenuto header qui
        leftSidebar.innerHTML = `...`; // Contenuto menu qui
        rightSidebar.innerHTML = `...`; // Contenuto impostazioni qui

        // Ricollega gli elementi dopo averli creati dinamicamente
        const leftSidebarBtn = document.getElementById('leftSidebarBtn');
        const rightSidebarBtn = document.getElementById('rightSidebarBtn');
        // ... tutti gli altri elementi...

        // Event listener per menu e ricerca...
    }
    
    // --- LOGICA SPECIFICA PER themes.html ---
    if (document.getElementById('themesGrid')) {
        const themesGrid = document.getElementById('themesGrid');
        const fontSelector = document.getElementById('fontSelector');
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontSizeValue = document.getElementById('fontSizeValue');
        const glassEffectToggle = document.getElementById('glassEffectToggle');
        const bgColorPicker = document.getElementById('bgColorPicker');

        const updateUI = () => {
            // Sincronizza i controlli con le impostazioni correnti
            document.querySelectorAll('.theme-card').forEach(card => {
                card.classList.toggle('active', card.dataset.theme === settings.themeId && !settings.customBg);
            });
            fontSelector.value = settings.fontFamily;
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
            glassEffectToggle.checked = settings.glassEffect;
        };

        const renderThemeCards = () => {
            themesGrid.innerHTML = themes.map(theme => `
                <div class="theme-card glass" data-theme="${theme.id}">
                    <div class="theme-preview" style="background: ${theme.css['--bg-main']};">
                        <span style="color: ${theme.css['--text-primary']}">${theme.icon}</span>
                    </div>
                    <h3>${theme.name}</h3>
                    <p>${theme.description}</p>
                </div>`).join('');
            
            document.querySelectorAll('.theme-card').forEach(card => {
                card.addEventListener('click', () => {
                    settings.themeId = card.dataset.theme;
                    settings.customBg = null; // Rimuove il colore custom quando si sceglie un tema
                    saveSettings(settings);
                    applySettings(settings);
                    updateUI();
                });
            });
        };
        
        // Event listeners per la personalizzazione avanzata
        fontSelector.addEventListener('change', (e) => {
            settings.fontFamily = e.target.value;
            saveSettings(settings);
            applySettings(settings);
        });

        fontSizeSlider.addEventListener('input', (e) => {
            const newSize = parseInt(e.target.value);
            settings.fontSize = newSize;
            fontSizeValue.textContent = `${newSize}px`;
            saveSettings(settings);
            applySettings(settings);
        });
        
        glassEffectToggle.addEventListener('change', (e) => {
            settings.glassEffect = e.target.checked;
            saveSettings(settings);
            applySettings(settings);
        });

        bgColorPicker.addEventListener('input', (e) => {
            settings.customBg = e.target.value;
            saveSettings(settings);
            applySettings(settings);
            updateUI(); // Deseleziona le card dei temi
        });

        // Inizializzazione della pagina temi
        renderThemeCards();
        updateUI();
    }
});
