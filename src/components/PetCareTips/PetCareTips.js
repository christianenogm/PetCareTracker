/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: PetCareTips component - Educational content with pet care tips.
 * Optional feature displaying nutrition, hydration, exercise, and hygiene advice.
 */

import { FaBowlFood, FaDroplet, FaDog, FaShower, FaSyringe, FaStethoscope } from 'react-icons/fa6';
import nutritionImage from '../../images/nutrition.png';
import hydrationImage from '../../images/Hydration.jpg';
import exerciseImage from '../../images/dogsurf.jpg';
import hygieneImage from '../../images/hygiene.jpg';
import vaccinesImage from '../../images/veteriat.png';
import warningImage from '../../images/Warning.jpg';
import { useLanguage } from '../../context/LanguageContext';

const COPY = {
  en: {
    kicker: 'Care Guide',
    heading: 'Pet Care Tips',
    intro: 'Practical daily care reminders for dogs and cats. Use these guidelines as general support and contact a licensed veterinarian for advice specific to your pet.',
    nutritionTitle: 'Balanced nutrition',
    nutrition1: 'Serve portions based on age, size, and activity level.',
    nutrition2: 'Choose food with quality protein and avoid frequent table scraps.',
    nutrition3: 'Keep feeding times consistent to support digestion and behavior.',
    hydrationTitle: 'Hydration',
    hydration1: 'Provide fresh, clean water all day.',
    hydration2: 'Wash the water bowl daily to prevent bacteria buildup.',
    hydration3: 'Watch for low water intake during hot weather or illness.',
    exerciseTitle: 'Exercise and enrichment',
    exercise1: 'Include daily walks, play sessions, or interactive toys.',
    exercise2: 'Stimulate the mind with short training routines and puzzle feeders.',
    exercise3: 'Adjust activity intensity based on breed, age, and health.',
    hygieneTitle: 'Grooming and hygiene',
    hygiene1: 'Brush coat regularly to reduce shedding and tangles.',
    hygiene2: 'Check ears, paws, and nails every week.',
    hygiene3: 'Use pet-safe products and avoid over-bathing.',
    vaccinesTitle: 'Vaccines and prevention',
    vaccines1: 'Keep vaccines, deworming, and parasite prevention up to date.',
    vaccines2: 'Record upcoming due dates in your care routine.',
    vaccines3: 'Follow your local veterinary schedule for boosters.',
    warningTitle: 'Warning signs',
    warning1: 'Pay attention to appetite loss, low energy, or behavior changes.',
    warning2: 'Seek veterinary help for vomiting, diarrhea, or breathing difficulty.',
    warning3: 'Do not self-medicate without professional guidance.',
  },
  pt: {
    kicker: 'Guia de Cuidados',
    heading: 'Dicas de Cuidado com Pets',
    intro: 'Lembretes praticos de cuidados diarios para caes e gatos. Use estas orientacoes como apoio geral e consulte um veterinario para orientacoes especificas do seu pet.',
    nutritionTitle: 'Nutricao balanceada',
    nutrition1: 'Sirva porcoes de acordo com idade, porte e nivel de atividade.',
    nutrition2: 'Escolha alimentos com proteina de qualidade e evite restos de comida com frequencia.',
    nutrition3: 'Mantenha horarios de refeicao consistentes para apoiar digestao e comportamento.',
    hydrationTitle: 'Hidratacao',
    hydration1: 'Ofereca agua fresca e limpa durante todo o dia.',
    hydration2: 'Lave o pote de agua diariamente para evitar acumulacao de bacterias.',
    hydration3: 'Observe baixa ingestao de agua em dias quentes ou em caso de doenca.',
    exerciseTitle: 'Exercicio e enriquecimento',
    exercise1: 'Inclua passeios diarios, brincadeiras ou brinquedos interativos.',
    exercise2: 'Estimule a mente com treinos curtos e brinquedos de desafio.',
    exercise3: 'Ajuste a intensidade das atividades conforme raca, idade e saude.',
    hygieneTitle: 'Higiene e cuidados',
    hygiene1: 'Escove a pelagem regularmente para reduzir queda de pelos e nos.',
    hygiene2: 'Verifique orelhas, patas e unhas toda semana.',
    hygiene3: 'Use produtos apropriados para pets e evite banhos em excesso.',
    vaccinesTitle: 'Vacinas e prevencao',
    vaccines1: 'Mantenha vacinas, vermifugacao e prevencao de parasitas em dia.',
    vaccines2: 'Registre as proximas datas na sua rotina de cuidados.',
    vaccines3: 'Siga o cronograma do veterinario para reforcos.',
    warningTitle: 'Sinais de alerta',
    warning1: 'Observe perda de apetite, baixa energia ou mudancas de comportamento.',
    warning2: 'Procure veterinario em casos de vomito, diarreia ou dificuldade para respirar.',
    warning3: 'Nao medique por conta propria sem orientacao profissional.',
  },
};

// Pet care tips component - educational content about pet care topics
function PetCareTips() {
  // Get language from context for bilingual support
  const { language } = useLanguage();
  const t = COPY[language];

  return (
    <section className='tips'>
      <p className='section-kicker'>{t.kicker}</p>
      <h2>{t.heading}</h2>
      <p className='tips-intro'>{t.intro}</p>

      <div className='tips-grid'>
        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaBowlFood /> {t.nutritionTitle}</h3>
            <ul>
              <li>{t.nutrition1}</li>
              <li>{t.nutrition2}</li>
              <li>{t.nutrition3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={nutritionImage} alt='Healthy pet food in a bowl' />
        </article>

        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaDroplet /> {t.hydrationTitle}</h3>
            <ul>
              <li>{t.hydration1}</li>
              <li>{t.hydration2}</li>
              <li>{t.hydration3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={hydrationImage} alt='Pet drinking water from a bowl' />
        </article>

        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaDog /> {t.exerciseTitle}</h3>
            <ul>
              <li>{t.exercise1}</li>
              <li>{t.exercise2}</li>
              <li>{t.exercise3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={exerciseImage} alt='Dog running during outdoor exercise' />
        </article>

        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaShower /> {t.hygieneTitle}</h3>
            <ul>
              <li>{t.hygiene1}</li>
              <li>{t.hygiene2}</li>
              <li>{t.hygiene3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={hygieneImage} alt='Pet grooming and hygiene routine' />
        </article>

        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaSyringe /> {t.vaccinesTitle}</h3>
            <ul>
              <li>{t.vaccines1}</li>
              <li>{t.vaccines2}</li>
              <li>{t.vaccines3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={vaccinesImage} alt='Veterinary vaccine and prevention checkup' />
        </article>

        <article className='tips-card'>
          <div className='tips-body'>
            <h3><FaStethoscope /> {t.warningTitle}</h3>
            <ul>
              <li>{t.warning1}</li>
              <li>{t.warning2}</li>
              <li>{t.warning3}</li>
            </ul>
          </div>
          <img className='tips-photo' src={warningImage} alt='Pet health warning signs to watch' />
        </article>
      </div>
    </section>
  );
}

export default PetCareTips;
