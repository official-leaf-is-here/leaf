document.addEventListener('DOMContentLoaded', () => {
    const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};
    const saveNotification = document.getElementById('saveNotification');

    // Initialize settings
    loadSettings();
    setupEventListeners();

    function loadSettings() {
        // Tab Customization
        if (settings.tabTitle) document.getElementById('tabTitle').value = settings.tabTitle;
        if (settings.tabIcon) document.getElementById('tabIcon').value = settings.tabIcon;

        // Theme Colors
        if (settings.primaryColor) document.getElementById('primaryColor').value = settings.primaryColor;
        if (settings.secondaryColor) document.getElementById('secondaryColor').value = settings.secondaryColor;
        if (settings.accentColor) document.getElementById('accentColor').value = settings.accentColor;

        // Apply theme colors
        applyThemeColors();

        // Background Animation
        if (settings.animationStyle) {
            document.querySelector(`[data-animation="${settings.animationStyle}"]`).classList.add('active');
            startAnimation(settings.animationStyle);
        }
    }

    function setupEventListeners() {
        // Tab Customization
        document.getElementById('tabTitle').addEventListener('input', () => {
            saveSettings();
        });

        document.getElementById('tabIcon').addEventListener('change', () => {
            saveSettings();
        });

        // Theme Colors
        document.getElementById('primaryColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        document.getElementById('secondaryColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        document.getElementById('accentColor').addEventListener('input', () => {
            applyThemeColors();
            saveSettings();
        });

        // Background Animation
        document.querySelectorAll('.animation-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.animation-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                settings.animationStyle = option.dataset.animation;
                startAnimation(option.dataset.animation);
                saveSettings();
            });
        });
    }

    function saveSettings() {
        settings.tabTitle = document.getElementById('tabTitle').value;
        settings.tabIcon = document.getElementById('tabIcon').value;
        settings.primaryColor = document.getElementById('primaryColor').value;
        settings.secondaryColor = document.getElementById('secondaryColor').value;
        settings.accentColor = document.getElementById('accentColor').value;

        localStorage.setItem('siteSettings', JSON.stringify(settings));
        showSaveNotification();

        // Apply immediate changes
        document.title = settings.tabTitle;
        applyThemeColors();
    }

    function applyThemeColors() {
        document.body.style.setProperty('--primary-color', settings.primaryColor || '#8B4513');
        document.body.style.setProperty('--secondary-color', settings.secondaryColor || '#A0522D');
        document.body.style.setProperty('--accent-color', settings.accentColor || '#CD853F');
    }

    function showSaveNotification() {
        saveNotification.classList.add('show');
        setTimeout(() => saveNotification.classList.remove('show'), 2000);
    }
});