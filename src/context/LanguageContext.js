/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: LanguageContext - Global context for bilingual support (English/Portuguese).
 * Provides language state and useLanguage hook for all components.
 */

import { createContext, useContext, useMemo, useState } from 'react';

// Create context for bilingual language support
const LanguageContext = createContext(null);

// Detect initial language from localStorage, defaulting to English
function detectInitialLanguage() {
  const saved = localStorage.getItem('pet-care-language');
  return saved === 'pt' ? 'pt' : 'en';
}

// Provider component - wraps app with language state and toggle functionality
export function LanguageProvider({ children }) {
  // State: current language ('en' or 'pt')
  const [language, setLanguage] = useState(detectInitialLanguage);

  const setAppLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem('pet-care-language', nextLanguage);
  };

  const value = useMemo(() => ({
    language,
    setLanguage: setAppLanguage,
    isPortuguese: language === 'pt',
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
