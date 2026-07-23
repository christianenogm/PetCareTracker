/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: NotFound component - 404 error page for invalid routes.
 * Displays friendly error message and navigation link back to home.
 */

import { Link } from 'react-router-dom';
import brandLogo from '../../images/logo.png';
import { useLanguage } from '../../context/LanguageContext';

// 404 Not Found component - error page for invalid routes
function NotFound() {
    // Get language from context and check if Portuguese
    const { language } = useLanguage();
    const isPt = language === 'pt';

    return (
        <div className='not-found'>
            <img className='not-found-logo' src={brandLogo} alt='Pet Care Tracker logo' />
            <h2>{isPt ? '404 - Pagina Nao Encontrada' : '404 - Page Not Found'}</h2>
            <p>{isPt ? 'A pagina solicitada nao existe.' : 'The page you requested does not exist.'}</p>
            <Link className='detailback' to='/'>{isPt ? 'Voltar para Inicio' : 'Back to Home'}</Link>
        </div>
    );
}
export default NotFound;