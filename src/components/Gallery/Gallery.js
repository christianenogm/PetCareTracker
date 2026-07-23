/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Gallery component - Display photo gallery with bilingual captions.
 * Optional feature for user experience enhancement.
 */

import dogCarImage from '../../images/dogcar.jpg';
import catPackImage from '../../images/catpack.jpg';
import dogMapleImage from '../../images/dogmaple.jpg';
import catsImage from '../../images/cats.jpg';
import dogReadImage from '../../images/dogread.jpg';
import dogFlowerImage from '../../images/dogflower.jpg';
import dogsImage from '../../images/dogs.jpg';
import familyImage from '../../images/family.jpg';
import dogSurfImage from '../../images/dogsurf1.jpg';
import dogSurfThreeImage from '../../images/dogsurf3.jpg';
import catDogImage from '../../images/catdog.jpg';
import catDogSevenImage from '../../images/catdog7.png';
import dogBanffImage from '../../images/dogbanff.jpg';
import hygieneTwoImage from '../../images/hygiene2.jpg';
import hydrationOneImage from '../../images/Hydration1.jpg';
import nutritionTwoImage from '../../images/nutrition2.png';
import dogOneImage from '../../images/dog1.jpg';
import catOneImage from '../../images/cat1.jpg';
import { useLanguage } from '../../context/LanguageContext';

const COPY = {
  en: {
    kicker: 'Moments',
    heading: 'Photo Gallery',
    intro: 'A quick collection of happy pet moments. This gallery is visual only and keeps your app lightweight for delivery.',
    photos: [
      'Road trip buddy',
      'Curious cat squad',
      'Autumn walk',
      'Cozy cat time',
      'Reading companion',
      'Garden explorer',
      'Playful duo',
      'Family day',
      'Beach energy',
      'Beach vibes',
      'Banff park',
      'Cat and dog under shelter',
      'Bath time',
      'Dog drinking water',
      'Dog and cat eating',
      'Best friends',
      'Puppy portrait',
      'Kitten portrait',
    ],
  },
  pt: {
    kicker: 'Momentos',
    heading: 'Galeria de Fotos',
    intro: 'Uma colecao rapida de momentos felizes dos pets. Esta galeria e apenas visual e deixa o app leve para entrega.',
    photos: [
      'Parceiro de viagem',
      'Turma de gatos curiosos',
      'Passeio no outono',
      'Momento fofo dos gatos',
      'Companheiro de leitura',
      'Explorador do jardim',
      'Dupla brincalhona',
      'Dia em familia',
      'Energia na praia',
      'Vibe de praia',
      'Parque Banff',
      'Gato e cachorro juntinhos embaixo do coberto',
      'Hora do banho',
      'Cachorro bebendo agua',
      'Cachorro e gato comendo',
      'Melhores amigos',
      'Retrato do filhote',
      'Retrato do gatinho',
    ],
  },
};

const IMAGES = [
  dogCarImage,
  catPackImage,
  dogMapleImage,
  catsImage,
  dogReadImage,
  dogFlowerImage,
  dogsImage,
  familyImage,
  dogSurfImage,
  dogSurfThreeImage,
  dogBanffImage,
  catDogSevenImage,
  hygieneTwoImage,
  hydrationOneImage,
  nutritionTwoImage,
  catDogImage,
  dogOneImage,
  catOneImage,
];

// Gallery component - photo gallery with bilingual captions
function Gallery() {
  // Get language from context for bilingual support
  const { language } = useLanguage();
  const t = COPY[language];

  return (
    <section className='gallery'>
      <p className='section-kicker'>{t.kicker}</p>
      <h2>{t.heading}</h2>
      <p className='gallery-intro'>{t.intro}</p>

      <div className='gallery-grid'>
        {IMAGES.map((imageSrc, index) => {
          const caption = t.photos[index] || `Photo ${index + 1}`;

          return (
            <figure key={imageSrc} className='gallery-card'>
              <img className='gallery-photo' src={imageSrc} alt={caption} loading='lazy' />
              <figcaption>{caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
