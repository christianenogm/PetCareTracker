/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: HomePage component - Landing page with marketing hero and key action links.
 * Provides entry point to app with hero image, features overview, and navigation.
 */

import { Link } from 'react-router-dom';
import { FaPaw, FaClipboardList, FaUserCircle, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import brandLogo from '../../images/logo.png';
import heroImage from '../../images/dogs.jpg';
import sideImage from '../../images/dogcat.jpg';
import { useLanguage } from '../../context/LanguageContext';

const COPY = {
    en: {
        heroTitle: "All your pet's care,",
        heroTitleLine2: 'in one place.',
        heroSub: 'Register pets, track daily care tasks, manage owner contacts, and monitor vaccination status with a clean and practical workflow.',
        viewPets: 'View All Pets',
        registerPet: '+ Register a Pet',
        whatYouCanDo: 'What you can do',
        featureTitle: 'Everything you need to care for your pets',
        profileTitle: 'Pet Profiles',
        profileText: 'Register each pet with name, type, age, vaccination status, and full owner contact info. Everything in one profile.',
        careTitle: 'Care Tasks',
        careText: 'Track daily routines like feeding, walks, vet appointments, and baths. Check off tasks as you complete them.',
        updateTitle: 'Stay Updated',
        updateText: 'Edit pet details anytime and add new care tasks on the spot. Your data syncs to the cloud instantly.',
        howItWorks: 'How it works',
        stepsTitle: 'Get started in three steps',
        step1Title: 'Register your pet',
        step1Text: "Fill in the pet's name, type, age, vaccination status, and owner contact information.",
        step2Title: 'Review care tasks',
        step2Text: 'Each pet comes with default tasks - Feed, Walk, Vet appointment, Bath. Add your own too.',
        step3Title: 'Track and update',
        step3Text: 'Check off tasks daily, edit pet info when it changes, and keep everything accurate.',
        ctaTitle: 'Ready to get started?',
        ctaText: 'Register your first pet and start tracking care tasks today.',
        ctaButton: 'Register a Pet',
    },
    pt: {
        heroTitle: 'Todo o cuidado do seu pet,',
        heroTitleLine2: 'em um so lugar.',
        heroSub: 'Cadastre pets, acompanhe tarefas diarias de cuidado, gerencie contatos dos tutores e monitore a vacinacao com um fluxo simples e pratico.',
        viewPets: 'Ver Todos os Pets',
        registerPet: '+ Cadastrar Pet',
        whatYouCanDo: 'O que voce pode fazer',
        featureTitle: 'Tudo o que voce precisa para cuidar dos seus pets',
        profileTitle: 'Perfis de Pets',
        profileText: 'Cadastre cada pet com nome, tipo, idade, status de vacinacao e dados completos do tutor. Tudo em um so perfil.',
        careTitle: 'Tarefas de Cuidado',
        careText: 'Acompanhe rotinas diarias como alimentacao, passeios, consultas veterinarias e banho. Marque as tarefas conforme concluir.',
        updateTitle: 'Sempre Atualizado',
        updateText: 'Edite os dados do pet a qualquer momento e adicione novas tarefas na hora. Seus dados sincronizam na nuvem.',
        howItWorks: 'Como funciona',
        stepsTitle: 'Comece em tres etapas',
        step1Title: 'Cadastre seu pet',
        step1Text: 'Preencha nome, tipo, idade, status de vacinacao e informacoes de contato do tutor.',
        step2Title: 'Revise as tarefas',
        step2Text: 'Cada pet comeca com tarefas padrao - Alimentar, Passear, Consulta veterinaria e Banho. Voce pode adicionar outras.',
        step3Title: 'Acompanhe e atualize',
        step3Text: 'Marque tarefas diariamente, edite informacoes quando mudar e mantenha tudo organizado.',
        ctaTitle: 'Pronto para comecar?',
        ctaText: 'Cadastre seu primeiro pet e comece hoje a acompanhar os cuidados.',
        ctaButton: 'Cadastrar Pet',
    },
};

// Landing page component - hero section and feature overview
function HomePage() {
    // Get language from context for bilingual support
    const { language } = useLanguage();
    const t = COPY[language];

    return (
        <div className='homepage'>

            {/* Hero section */}
            <section className='hp-hero'>
                <div className='hp-hero-text'>
                    <div className='hp-hero-badge'>
                        <FaPaw /> Pet Care Tracker
                    </div>
                    <h1 className='hp-hero-title'>
                        {t.heroTitle}<br />{t.heroTitleLine2}
                    </h1>
                    <p className='hp-hero-sub'>
                        {t.heroSub}
                    </p>
                    <div className='hp-hero-actions'>
                        <Link className='hp-cta-primary' to='/pets'>{t.viewPets}</Link>
                        <Link className='hp-cta-secondary' to='/add'>{t.registerPet}</Link>
                    </div>
                </div>

                <div className='hp-hero-media'>
                    <img className='hp-brand-logo' src={brandLogo} alt='Pet Care Tracker logo' />
                    <img className='hp-hero-photo' src={heroImage} alt='Happy pets together' />
                </div>
            </section>

            {/* Features section */}
            <section className='hp-features'>
                <p className='section-kicker'>{t.whatYouCanDo}</p>
                <h2 className='hp-section-title'>{t.featureTitle}</h2>
                <div className='hp-feature-grid'>

                    <div className='hp-feature-card'>
                        <div className='hp-feature-icon'>
                            <FaUserCircle />
                        </div>
                        <h3>{t.profileTitle}</h3>
                        <p>{t.profileText}</p>
                    </div>

                    <div className='hp-feature-card'>
                        <div className='hp-feature-icon'>
                            <FaClipboardList />
                        </div>
                        <h3>{t.careTitle}</h3>
                        <p>{t.careText}</p>
                    </div>

                    <div className='hp-feature-card'>
                        <div className='hp-feature-icon'>
                            <FaCheckCircle />
                        </div>
                        <h3>{t.updateTitle}</h3>
                        <p>{t.updateText}</p>
                    </div>
                </div>
            </section>

            {/* How it works section */}
            <section className='hp-steps'>
                <p className='section-kicker'>{t.howItWorks}</p>
                <h2 className='hp-section-title'>{t.stepsTitle}</h2>
                <div className='hp-steps-list'>
                    <div className='hp-step'>
                        <span className='hp-step-num'>1</span>
                        <div className='hp-step-body'>
                            <h3>{t.step1Title}</h3>
                            <p>{t.step1Text}</p>
                        </div>
                    </div>
                    <div className='hp-step-arrow'><FaArrowRight /></div>
                    <div className='hp-step'>
                        <span className='hp-step-num'>2</span>
                        <div className='hp-step-body'>
                            <h3>{t.step2Title}</h3>
                            <p>{t.step2Text}</p>
                        </div>
                    </div>
                    <div className='hp-step-arrow'><FaArrowRight /></div>
                    <div className='hp-step'>
                        <span className='hp-step-num'>3</span>
                        <div className='hp-step-body'>
                            <h3>{t.step3Title}</h3>
                            <p>{t.step3Text}</p>
                        </div>
                    </div>
                </div>

                <div className='hp-steps-image-wrap'>
                    <img className='hp-steps-image' src={sideImage} alt='Pet with owner in a cozy moment' />
                </div>
            </section>

            {/* Bottom CTA */}
            <section className='hp-bottom-cta'>
                <h2>{t.ctaTitle}</h2>
                <p>{t.ctaText}</p>
                <Link className='hp-cta-primary' to='/add'>{t.ctaButton}</Link>
            </section>
        </div>
    );
}

export default HomePage;
