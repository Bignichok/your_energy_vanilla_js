import { fetchFilters } from './api.js';

export const initializeFilterListener = () => {
  const filters = document.getElementById('filters');
  const buttons = filters.querySelectorAll('.filter-button');

  filters.addEventListener('click', event => {
    const button = event.target;

    if (button.classList.contains('filter-button')) {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      fetchFilters(button.getAttribute('data-filter'));
    }
  });
};
