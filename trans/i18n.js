/**
 * i18n.js — Language switcher engine
 * Handles Arabic ↔ English switching with RTL support
 */

const I18n = (() => {
    const STORAGE_KEY = 'coach_lang';
    let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

    // Map of data-i18n keys to translation objects
    const translations = { en, ar };

    /**
     * Apply translations to all [data-i18n] elements
     */
    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        // Update all text content nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });

        // Update all placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) {
                el.placeholder = t[key];
            }
        });

        // Update document language and direction
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl', lang === 'ar');

        // Update the toggle button label
        const btn = document.getElementById('langToggleBtn');
        if (btn) {
            const labelEl = btn.querySelector('.lang-label');
            if (labelEl) labelEl.textContent = lang === 'ar' ? 'EN' : 'ع';
            btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
        }

        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    /**
     * Toggle between ar and en
     */
    function toggle() {
        const next = currentLang === 'en' ? 'ar' : 'en';
        applyTranslations(next);
    }

    /**
     * Initialize on DOM ready
     */
    function init() {
        applyTranslations(currentLang);

        const btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.addEventListener('click', toggle);
        }
    }

    return { init, toggle, getCurrent: () => currentLang };
})();

// Auto-initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', I18n.init);
} else {
    I18n.init();
}
