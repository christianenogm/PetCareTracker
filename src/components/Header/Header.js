/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Header component - Navigation bar with logo and menu.
 * Provides access to main app routes and bilingual support.
 */

import React from 'react';
import './Header.scss';
import MainMenu from '../MainMenu/MainMenu';
import logo from '../../images/logo.png';
import { useLanguage } from '../../context/LanguageContext';

const COPY = {
  en: {
    subtitle: 'Care smarter, one pet at a time.',
    nav: {
      home: 'Home',
      pets: 'Pets',
      add: 'New Pet',
      gallery: 'Gallery',
      tips: 'Tips',
      faq: 'FAQ',
    },
    languageLabel: 'Language',
    enLabel: 'English',
    ptLabel: 'Portuguese',
  },
  pt: {
    subtitle: 'Cuide melhor, um pet por vez.',
    nav: {
      home: 'Inicio',
      pets: 'Pets',
      add: 'Novo Pet',
      gallery: 'Galeria',
      tips: 'Dicas',
      faq: 'FAQ',
    },
    languageLabel: 'Idioma',
    enLabel: 'Ingles',
    ptLabel: 'Portugues',
  },
};

// Header component - navigation bar with logo and language toggle
function Header() {
  // Get language state and setter from context
  const { language, setLanguage } = useLanguage();

  const t = COPY[language];

  return (
    <>
    <header> 
        <div>
          <div className='title'>
            <img className='title-logo' src={logo} alt='Pet Care Tracker logo' />
            <span>Pet Care Tracker</span>
          </div>
        </div>
        <div className='header-right'>
          <div className='author'>{t.subtitle}</div>
          <div className='lang-switch' aria-label={t.languageLabel}>
            <button
              type='button'
              className={`lang-link ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className='lang-divider'>|</span>
            <button
              type='button'
              className={`lang-link ${language === 'pt' ? 'active' : ''}`}
              onClick={() => setLanguage('pt')}
            >
              PT
            </button>
          </div>
        </div>
    </header> 
    <MainMenu labels={t.nav} />
    </>
    );
}

export default Header;