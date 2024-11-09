import { getExerciseModalMarkup } from './markupUtils';
import { fetchExerciseById } from './api.js';
import { initializeFavoriteExercises } from './favoriteExercise.js';

export const initializeExerciseModal = () => {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modal = document.querySelector('.modal');
  const exercisesList = document.querySelector('.exercises-list');

  const checkIfFavorited = exerciseId => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav._id === exerciseId);
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

  const toggleFavorite = exerciseData => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.some(fav => fav._id === exerciseData._id);

    if (isFavorited) {
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter(fav => fav._id !== exerciseData._id))
      );
    } else {
      favorites.push({
        _id: exerciseData._id,
        name: exerciseData.name,
        rating: exerciseData.rating,
        bodyPart: exerciseData.bodyPart,
        target: exerciseData.target,
        burnedCalories: exerciseData.burnedCalories,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    updateFavoriteButton(exerciseData._id);

    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === 'favorites.html') {
      initializeFavoriteExercises();
    }
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
          toggleFavorite(exerciseData)
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
