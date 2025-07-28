document.addEventListener('DOMContentLoaded', () => {

    const themes = [
        { id: 'dark', name: 'Cronoshop Scuro', description: 'Il tema originale, elegante e riposante.', icon: '🌙', style: 'linear-gradient(135deg, #2d3748, #1a202c)' },
        { id: 'light', name: 'Cronoshop Chiaro', description: 'Un look pulito, fresco e tradizionale.', icon: '☀️', style: 'linear-gradient(135deg, #e2e8f0, #f7fafc)' },
        { id: 'sunset', name: 'Tramonto Arancione', description: 'Colori caldi e vibranti per un\'atmosfera energica.', icon: '🌇', style: 'linear-gradient(135deg, #dd6b20, #f6ad55)' },
        { id: 'forest', name: 'Foresta Smeraldo', description: 'Toni verdi profondi e rilassanti ispirati alla natura.', icon: '🌲', style: 'linear-gradient(135deg, #2f855a, #48bb78)' },
        { id: 'ocean', name: 'Oceano Profondo', description: 'Un blu intenso e immersivo per la massima concentrazione.', icon: '🌊', style: 'linear-gradient(135deg, #3182ce, #63b3ed)' },
        { id: 'nebula', name: 'Nebulosa Viola', description: 'Un tema cosmico con sfumature di viola e indaco.', icon: '✨', style: 'linear-gradient(135deg, #553c9a, #805ad5)' },
        { id: 'luxury', name: 'Lusso Nero & Oro', description: 'Elegante e premium, con accenti dorati.', icon: '💎', style: 'linear-gradient(135deg, #1a202c, #4a5568)' },
        { id: 'rose', name: 'Petali di Rosa', description: 'Un tema delicato con tonalità rosa e magenta.', icon: '🌸', style: 'linear-gradient(135deg, #97266d, #d53f8c)' },
        { id: 'cyber', name: 'Cyberpunk Neon', description: 'Stile futuristico con contrasti forti e accesi.', icon: '🌃', style: 'linear-gradient(135deg, #080c2d, #5a0c57)' },
        { id: 'mint', name: 'Menta Fresca', description: 'Colori chiari e rinfrescanti per una sensazione di leggerezza.', icon: '🍃', style: 'linear-gradient(135deg, #38b2ac, #81e6d9)' },
        { id: 'sand', name: 'Dune del Deserto', description: 'Toni caldi della sabbia per un\'esperienza avvolgente.', icon: '🏜️', style: 'linear-gradient(135deg, #d69e2e, #f6e05e)' },
        { id: 'slate', name: 'Ardesia Moderna', description: 'Un grigio neutro e professionale, minimale e pulito.', icon: '🏢', style: 'linear-gradient(135deg, #4a5568, #718096)' }
    ];
    
    // --- FUNZIONI GLOBALI (PER TUTTE LE PAGINE) ---
    const body = document.body;
    
    const applyGlobalTheme = (themeId) => {
        const theme = themes.find(t => t.id === themeId);
        if (!theme) return;
        body.style.setProperty('--background-gradient', theme.style);
        
        const themeToggle = document.getElementById('themeToggle'); // Cerca il toggle in ogni pagina
        if (themeId === 'light') {
            body.classList.add('light-mode');
            if(themeToggle) themeToggle.checked = false;
        } else {
            body.classList.remove('light-mode');
            if(themeToggle) themeToggle.checked = true;
        }
        localStorage.setItem('cronoshop-active-theme', themeId);
    };

    // Applica il tema salvato su OGNI pagina
    const savedTheme = localStorage.getItem('cronoshop-active-theme') || 'dark';
    applyGlobalTheme(savedTheme);


    // --- LOGICA SPECIFICA PER themes.html ---
    // Questa parte viene eseguita solo se ci troviamo nella pagina dei temi
    if (document.getElementById('themesGrid')) {
        const themesGrid = document.getElementById('themesGrid');
        const searchInput = document.getElementById('searchInput');
        const themeToggle = document.getElementById('themeToggle');

        const renderThemeCards = (filter = '') => {
            const query = filter.toLowerCase();
            const filteredThemes = themes.filter(theme => 
                theme.name.toLowerCase().includes(query) ||
                theme.description.toLowerCase().includes(query)
            );

            themesGrid.innerHTML = filteredThemes.map(theme => `
                <div class="theme-card glass" data-theme="${theme.id}">
                    <div class="theme-preview" style="background: ${theme.style};">
                        <span>${theme.icon}</span>
                    </div>
                    <h3>${theme.name}</h3>
                    <p>${theme.description}</p>
                </div>
            `).join('');

            document.querySelectorAll('.theme-card').forEach(card => {
                card.addEventListener('click', () => {
                    applyGlobalTheme(card.dataset.theme); // Usa la funzione globale
                    updateActiveCard();
                });
            });
            updateActiveCard();
        };

        const updateActiveCard = () => {
             const currentTheme = localStorage.getItem('cronoshop-active-theme') || 'dark';
             document.querySelectorAll('.theme-card').forEach(card => {
                card.classList.toggle('active', card.dataset.theme === currentTheme);
            });
        };

        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            applyGlobalTheme(newTheme);
            updateActiveCard();
        });

        searchInput.addEventListener('input', () => {
            renderThemeCards(searchInput.value);
        });

        renderThemeCards();
    }
    
    // --- LOGICA UI GLOBALE (HEADER E MENU) ---
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const leftSidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('overlay');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    
    if (menuBtn && leftSidebar) {
         const toggleMenu = (open) => {
            leftSidebar.classList.toggle('active', open);
            overlay.classList.toggle('active', open);
        };
        menuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(true); });
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', () => toggleMenu(false));
    }
    
    if (searchContainer) {
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
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            applyGlobalTheme(newTheme);
            // Se siamo nella pagina dei temi, aggiorna anche la card
            if (document.getElementById('themesGrid')) {
                 document.querySelectorAll('.theme-card').forEach(card => {
                    card.classList.toggle('active', card.dataset.theme === newTheme);
                 });
            }
        });
    }

});
