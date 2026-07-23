/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: PrivacyPolicy component - Application privacy policy page.
 * Optional feature providing transparency about data handling and user privacy.
 */

import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

// Privacy Policy component - displays app privacy terms and data handling information
function PrivacyPolicy() {
  const navigate = useNavigate();
  // Get language from context for bilingual support
  const { language } = useLanguage();

  const t = language === 'pt'
    ? {
      kicker: 'Informacao Legal',
      title: 'Politica de Privacidade',
      intro: 'Respeitamos sua privacidade. Esta aplicacao foi desenvolvida para fins academicos e usa Firebase para armazenar os dados cadastrados.',
      item1Title: 'Coleta de dados',
      item1Text: 'Coletamos apenas os dados informados no formulario, como nome do pet, dados do tutor e tarefas de cuidado.',
      item2Title: 'Uso dos dados',
      item2Text: 'Os dados sao usados apenas para funcionamento da aplicacao e exibicao das informacoes do perfil do pet.',
      item3Title: 'Compartilhamento',
      item3Text: 'Nao vendemos nem compartilhamos dados pessoais com terceiros fora da plataforma utilizada para armazenamento.',
      item4Title: 'Contato',
      item4Text: 'Para duvidas sobre esta politica, entre em contato com Christiane Nogueira.',
      closeLabel: 'Fechar politica de privacidade',
    }
    : {
      kicker: 'Legal Information',
      title: 'Privacy Policy',
      intro: 'We respect your privacy. This application was developed for academic purposes and uses Firebase to store submitted records.',
      item1Title: 'Data collection',
      item1Text: 'We only collect data entered in the form, such as pet profile details, owner details, and care tasks.',
      item2Title: 'Data usage',
      item2Text: 'Data is used only to operate the application and display pet profile information.',
      item3Title: 'Sharing',
      item3Text: 'We do not sell or share personal information with third parties beyond the storage platform in use.',
      item4Title: 'Contact',
      item4Text: 'For questions about this policy, please contact Christiane Nogueira.',
      closeLabel: 'Close privacy policy',
    };

  const handleClosePolicy = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <section className='privacy-card'>
      <div className='privacy-head'>
        <div>
          <p className='section-kicker'>{t.kicker}</p>
          <h2>{t.title}</h2>
        </div>
        <button
          type='button'
          className='privacy-close'
          aria-label={t.closeLabel}
          title={t.closeLabel}
          onClick={handleClosePolicy}
        >
          ×
        </button>
      </div>
      <p className='privacy-intro'>{t.intro}</p>

      <div className='privacy-list'>
        <article>
          <h3>{t.item1Title}</h3>
          <p>{t.item1Text}</p>
        </article>
        <article>
          <h3>{t.item2Title}</h3>
          <p>{t.item2Text}</p>
        </article>
        <article>
          <h3>{t.item3Title}</h3>
          <p>{t.item3Text}</p>
        </article>
        <article>
          <h3>{t.item4Title}</h3>
          <p>{t.item4Text}</p>
        </article>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
