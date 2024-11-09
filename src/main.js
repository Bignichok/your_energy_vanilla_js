import { initializeExercisesSection } from './js/exercises.js';
import { displayQuoteOfTheDay } from './js/quote.js';
import { initializeExerciseModal } from './js/exerciseModal.js';
import { initializeMenu, initializeNavigationLinks } from './js/menu.js';
import { initializeSubscribeEmail } from './js/subscribeEmail.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  initializeNavigationLinks();
  initializeExercisesSection();
  displayQuoteOfTheDay();
  initializeExerciseModal();
  initializeSubscribeEmail();
});
