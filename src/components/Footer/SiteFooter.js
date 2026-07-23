/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: SiteFooter component - Application footer with copyright and links.
 * Displays footer content with bilingual support.
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// Footer component - displays copyright info and links
function SiteFooter() {
  // Get language from context for bilingual support
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const t = language === 'pt'
    ? {
      privacy: 'Politica de Privacidade',
      developedBy: 'Desenvolvido por Christiane Nogueira',
      rights: (year) => `(c) ${year} Christiane Nogueira`,
    }
    : {
      privacy: 'Privacy Policy',
      developedBy: 'Developed by Christiane Nogueira',
      rights: (year) => `(c) ${year} Christiane Nogueira`,
    };

  return (
    <footer className='site-footer'>
      <div className='site-footer-inner'>
        <p className='site-footer-dev'>{t.developedBy}</p>

        <div className='site-footer-meta'>
          <Link className='site-footer-link' to='/privacy-policy'>{t.privacy}</Link>
          <span className='site-footer-divider' aria-hidden='true'>|</span>
          <span className='site-footer-copy'>{t.rights(currentYear)}</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
