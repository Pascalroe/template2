/**
 * ÉTOILE Restaurant - language.js
 * Language switcher functionality (DE/EN)
 */

const LanguageManager = {
  currentLang: 'de',
  storageKey: 'etoile_language',
  
  /**
   * Initialize language manager
   */
  init() {
    // Load language from localStorage or use default 'de'
    this.currentLang = localStorage.getItem(this.storageKey) || 'de';
    
    // Apply language on page load
    this.applyLanguage();
    
    // Update language toggle UI
    this.updateToggleUI();
  },
  
  /**
   * Get current language
   */
  getLanguage() {
    return this.currentLang;
  },
  
  /**
   * Toggle between DE and EN
   */
  toggle() {
    this.currentLang = this.currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem(this.storageKey, this.currentLang);
    this.applyLanguage();
    this.updateToggleUI();
  },
  
  /**
   * Set specific language
   */
  setLanguage(lang) {
    if (lang === 'de' || lang === 'en') {
      this.currentLang = lang;
      localStorage.setItem(this.storageKey, this.currentLang);
      this.applyLanguage();
      this.updateToggleUI();
    }
  },
  
  /**
   * Apply current language to all elements with data-i18n attribute
   */
  applyLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Check if element contains HTML (like <br> tags)
        if (translation.includes('<br>')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Update placeholders for form inputs
    this.updatePlaceholders();
    
    // Update select options
    this.updateSelectOptions();
    
    // Trigger custom event for other components to react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: this.currentLang } }));
  },
  
  /**
   * Get translation for a specific key
   */
  getTranslation(key) {
    if (translations[this.currentLang] && translations[this.currentLang][key]) {
      return translations[this.currentLang][key];
    }
    console.warn(`Translation missing for key: ${key}`);
    return null;
  },
  
  /**
   * Update form placeholders based on language
   */
  updatePlaceholders() {
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation) {
        element.placeholder = translation;
      }
    });
  },
  
  /**
   * Update select options based on language
   */
  updateSelectOptions() {
    // Handle guest count options
    const guestsSelect = document.getElementById('guests');
    if (guestsSelect) {
      this.updateGuestOptions(guestsSelect);
    }
    
    // Handle occasion options
    const occasionSelect = document.getElementById('occasion');
    if (occasionSelect) {
      this.updateOccasionOptions(occasionSelect);
    }
    
    // Handle diet options
    const dietSelect = document.getElementById('diet');
    if (dietSelect) {
      this.updateDietOptions(dietSelect);
    }
    
    // Handle contact form subject options
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
      this.updateSubjectOptions(subjectSelect);
    }
  },
  
  /**
   * Update guest count select options
   */
  updateGuestOptions(select) {
    const options = [
      { value: '', key: 'form.guests.select' },
      { value: '1', key: 'form.guest.1' },
      { value: '2', key: 'form.guest.2' },
      { value: '3', key: 'form.guest.3' },
      { value: '4', key: 'form.guest.4' },
      { value: '5', key: 'form.guest.5' },
      { value: '6', key: 'form.guest.6' },
      { value: '7', key: 'form.guest.7' },
      { value: '8', key: 'form.guest.8' },
      { value: 'more', key: 'form.guest.more' }
    ];
    
    options.forEach((opt, index) => {
      if (select.options[index]) {
        select.options[index].textContent = this.getTranslation(opt.key) || opt.key;
      }
    });
  },
  
  /**
   * Update occasion select options
   */
  updateOccasionOptions(select) {
    const options = [
      { value: '', key: 'form.occasion.select' },
      { value: 'birthday', key: 'form.occasion.birthday' },
      { value: 'anniversary', key: 'form.occasion.anniversary' },
      { value: 'business', key: 'form.occasion.business' },
      { value: 'date', key: 'form.occasion.date' },
      { value: 'other', key: 'form.occasion.other' }
    ];
    
    options.forEach((opt, index) => {
      if (select.options[index]) {
        select.options[index].textContent = this.getTranslation(opt.key) || opt.key;
      }
    });
  },
  
  /**
   * Update diet select options
   */
  updateDietOptions(select) {
    const options = [
      { value: '', key: 'form.diet.none' },
      { value: 'vegetarian', key: 'form.diet.vegetarian' },
      { value: 'vegan', key: 'form.diet.vegan' },
      { value: 'gluten', key: 'form.diet.gluten' },
      { value: 'lactose', key: 'form.diet.lactose' },
      { value: 'allergy', key: 'form.diet.allergy' }
    ];
    
    options.forEach((opt, index) => {
      if (select.options[index]) {
        select.options[index].textContent = this.getTranslation(opt.key) || opt.key;
      }
    });
  },
  
  /**
   * Update contact form subject select options
   */
  updateSubjectOptions(select) {
    const options = [
      { value: '', key: 'contact.form.subject.select' },
      { value: 'reservation', key: 'contact.form.subject.reservation' },
      { value: 'event', key: 'contact.form.subject.event' },
      { value: 'feedback', key: 'contact.form.subject.feedback' },
      { value: 'press', key: 'contact.form.subject.press' },
      { value: 'other', key: 'contact.form.subject.other' }
    ];
    
    options.forEach((opt, index) => {
      if (select.options[index]) {
        select.options[index].textContent = this.getTranslation(opt.key) || opt.key;
      }
    });
  },
  
  /**
   * Update language toggle UI
   */
  updateToggleUI() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      const deBtn = langToggle.querySelector('.lang-de');
      const enBtn = langToggle.querySelector('.lang-en');
      
      if (this.currentLang === 'de') {
        deBtn.classList.add('active');
        enBtn.classList.remove('active');
      } else {
        deBtn.classList.remove('active');
        enBtn.classList.add('active');
      }
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  LanguageManager.init();
  
  // Add click handler for language switcher
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      LanguageManager.toggle();
    });
  }
});

// Make available globally
window.LanguageManager = LanguageManager;