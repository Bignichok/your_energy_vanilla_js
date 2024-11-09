import { getExerciseModalMarkup } from './markupUtils';
import { fetchExerciseById } from './api.js';

export const initializeExerciseModal = () => {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modal = document.querySelector('.modal');
  const exercisesList = document.querySelector('.exercises-list');

  const checkIfFavorited = exerciseId => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(exerciseId);
  };

  const escKeyListener = e => {
    if (e.key === 'Escape') hideModal();
  };

  const hideModal = () => {
    modalBackdrop.classList.remove('active');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modal.innerHTML = '';
    document.removeEventListener('keydown', escKeyListener);
  };

  const updateFavoriteButton = exerciseId => {
    const favoriteButton = modal.querySelector('.favorite-button');
    const isFavorited = checkIfFavorited(exerciseId);

    if (favoriteButton) {
      favoriteButton.innerHTML = `
      ${isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      <svg width="20" height="20">
        <use href="./img/sprite.svg#${
          isFavorited ? 'icon-trash' : 'icon-heart'
        }"></use>
      </svg>
      `;
    }
  };

  const toggleFavorite = exerciseId => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(exerciseId)) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter(id => id !== exerciseId))
      );
    } else {
      favorites.push(exerciseId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    updateFavoriteButton(exerciseId);
  };

  const showModal = async exerciseId => {
    try {
      const exerciseData = await fetchExerciseById(exerciseId);

      modal.innerHTML = getExerciseModalMarkup(
        exerciseData,
        checkIfFavorited(exerciseId)
      );

      const closeButton = modal.querySelector('.close-modal');
      const favoriteButton = modal.querySelector('.favorite-button');

      modalBackdrop.classList.add('active');
      modal.classList.add('active');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', escKeyListener);

      if (closeButton) closeButton.addEventListener('click', hideModal);
      if (favoriteButton) {
        favoriteButton.addEventListener('click', () =>
          toggleFavorite(exerciseId)
        );
      }
    } catch (error) {
      console.error('Failed to fetch exercise details:', error);
    }
  };

  exercisesList.addEventListener('click', event => {
    const exerciseItem = event.target.closest('.exercise-list-item');
    if (exerciseItem) {
      showModal(exerciseItem.dataset.id);
    }
  });

  modalBackdrop.addEventListener('click', hideModal);
};
