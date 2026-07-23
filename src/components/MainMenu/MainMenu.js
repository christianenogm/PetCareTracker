/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: MainMenu component - Navigation menu with links to all app routes.
 * Supports bilingual labels and responsive navigation.
 */

import { NavLink } from 'react-router-dom';

// Navigation menu component - renders links to all app routes
function MainMenu({ labels }) {
    // Use provided labels or fallback to English defaults
    const text = labels || {
        home: 'Home',
        pets: 'Pets',
        add: 'New Pet',
        gallery: 'Gallery',
        tips: 'Tips',
        faq: 'FAQ',
    };

    return (
        <nav className='mainmenu'>
            <NavLink to="/" end>{text.home}</NavLink>
            <NavLink to="/pets">{text.pets}</NavLink>
            <NavLink to="/add">{text.add}</NavLink>
            <NavLink to="/gallery">{text.gallery}</NavLink>
            <NavLink to="/tips">{text.tips}</NavLink>
            <NavLink to="/help">{text.faq}</NavLink>
        </nav>
    );
}

export default MainMenu;