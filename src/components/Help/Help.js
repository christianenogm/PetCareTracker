/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Help component - FAQ and help topics with nested routing.
 * Optional feature providing user guidance on app functionality.
 */

import { NavLink, Outlet } from 'react-router-dom';
import './Help.scss';
import { useLanguage } from '../../context/LanguageContext';

// Help/FAQ component - provides user guidance and support documentation
function Help() {
    // Get language from context and check if Portuguese
    const { language } = useLanguage();
    const isPt = language === 'pt';

    return (
        <section className='help'>
            <p className='section-kicker'>{isPt ? 'Suporte' : 'Support'}</p>
            <h2>{isPt ? 'Perguntas Frequentes' : 'FAQs'}</h2> 
                <p className='help-intro'>
                {isPt
                    ? 'Encontre respostas rapidas sobre como usar o Pet Care Tracker. Selecione um topico abaixo para abrir instrucoes detalhadas.'
                    : 'Find quick answers about using Pet Care Tracker. Select a topic below to open detailed instructions.'}
                </p>
            <nav className='help-menu'>
                <NavLink to="/help" end>{isPt ? 'Inicio FAQ' : 'FAQ Home'}</NavLink>
                <NavLink to="/help/add">{isPt ? 'Adicionar Pet' : 'Add Pet'}</NavLink>
                <NavLink to="/help/details">{isPt ? 'Detalhes do Pet' : 'Pet Details'}</NavLink>
                <NavLink to="/help/remove">{isPt ? 'Remover Pet' : 'Remove Pet'}</NavLink>
                <NavLink to="/help/change">{isPt ? 'Tarefas de Cuidado' : 'Care Tasks'}</NavLink>
            </nav>
            <div className='help-content'>
              <Outlet />
            </div>
        </section>
    );
}   
export default Help;