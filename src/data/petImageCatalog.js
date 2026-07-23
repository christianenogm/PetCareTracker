/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: petImageCatalog - Image mapping utility for pet profiles.
 * Provides deterministic image selection for pet cards based on type and name hash.
 */

import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';
import dog3 from '../images/dog3.jpg';
import dog4 from '../images/dog4.jpg';
import dog7 from '../images/dog7.jpg';
import dog8 from '../images/dog8.jpg';

import cat1 from '../images/cat1.jpg';
import cat2 from '../images/cat2.jpg';
import cat3 from '../images/cat3.jpg';
import cat4 from '../images/cat4.jpg';
import cat5 from '../images/cat5.jpg';
import cat6 from '../images/cat6.jpg';

import catdog1 from '../images/catdog1.jpg';
import catdog2 from '../images/catdog2.jpg';
import catdog5 from '../images/catdog5.jpg';
import catdog6 from '../images/catdog6.png';
import family from '../images/family.jpg';
import dogcat from '../images/dogcat.jpg';

// Image arrays organized by pet type
const DOG_IMAGES = [dog1, dog2, dog3, dog4, dog7, dog8];
const CAT_IMAGES = [cat1, cat2, cat3, cat4, cat5, cat6];
const OTHER_IMAGES = [catdog1, catdog2, catdog5, catdog6, family, dogcat];

// Generate consistent hash from seed string
function hashSeed(seed) {
  return seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// Select image from array based on deterministic hash of seed
function selectImage(seed, images) {
  const index = hashSeed(seed) % images.length;
  return images[index];
}

export function getPetImage(pet) {
  if (typeof pet.profileImage === 'string' && pet.profileImage.trim() !== '') {
    return pet.profileImage;
  }

  const type = (pet.type || '').toLowerCase();
  const seed = `${pet.id || ''}-${pet.name || ''}-${pet.type || ''}`;

  if (type.includes('dog')) {
    return selectImage(seed, DOG_IMAGES);
  }

  if (type.includes('cat')) {
    return selectImage(seed, CAT_IMAGES);
  }

  return selectImage(seed, OTHER_IMAGES);
}
