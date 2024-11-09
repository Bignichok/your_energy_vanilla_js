export const renderTitle = (element, category) => {
  element.innerHTML = category
    ? `Exercises /<span>${category}</span>`
    : 'Exercises';
};

export const getCategoriesMarkup = categories => {
  return categories
    .map(
      ({ filter, name, imgURL }) => `
    <li class="categories-list-item" data-filter="${filter}" data-name="${name}"
      style="background-image: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url(${imgURL})">
      <p class="categories-list-item-title">${name}</p>
      <p class="categories-list-item-sub-title">${filter}</p>
    </li>
  `
    )
    .join('');
};

export const getExercisesMarkup = exercises => {
  return exercises
    .map(
      ({ rating, name, bodyPart, target, burnedCalories }) => `
    <li class="exercise-list-item">
      <div class="first-row">
        <div class="workout-element">WORKOUT</div>
        <div class="rating-holder">
          <span>${parseFloat(rating).toFixed(1)}</span>
          <svg width="18" height="18">
            <use href="./img/sprite.svg#icon-star"></use>
          </svg>
        </div>
        <button class="start-button">
          Start
          <svg width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </div>
      <div class="second-row">
        <svg width="24" height="24">
          <use href="./img/sprite.svg#icon-running-black"></use>
        </svg>
        <p>${name}</p>
      </div>
      <ul class="exercise-description-list">
        <li><span>Burned calories:</span> ${burnedCalories} / 3 min</li>
        <li><span>Body part:</span> ${bodyPart}</li>
        <li><span>Target:</span> ${target}</li>
      </ul>
    </li>
  `
    )
    .join('');
};
