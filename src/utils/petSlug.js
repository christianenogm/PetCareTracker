/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Utility functions for pet URL slug generation and resolution.
 * Provides friendly URL routing for pet profiles (e.g., /pets/bob instead of /pets/:id).
 */

// Remove accents and convert text to lowercase for slug generation
const normalizeText = (value) => (
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
);

// Build URL-friendly slug from pet name (e.g., "Lula" -> "lula", "José" -> "jose")
const buildPetSlug = (petName) => {
  const normalized = normalizeText(petName);

  const slug = normalized
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'pet';
};

// Find pet by slug, id, or normalized name (for backward compatibility)
const findPetByRouteValue = (pets, routeValue) => {
  const decoded = decodeURIComponent(routeValue || '').trim();
  if (!decoded) {
    return undefined;
  }

  const byId = pets.find((pet) => pet.id === decoded);
  if (byId) {
    return byId;
  }

  const normalizedRoute = normalizeText(decoded);

  return pets.find((pet) => (
    buildPetSlug(pet.name) === normalizedRoute || normalizeText(pet.name) === normalizedRoute
  ));
};

export { buildPetSlug, findPetByRouteValue };
