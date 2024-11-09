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
      ({ rating, name, bodyPart, target, burnedCalories, _id }) => `
    <li class="exercise-list-item" data-id="${_id}">
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

export const getExerciseModalMarkup = exerciseData => `
  <button class="close-modal">×</button>
  <h2 class="exercise-name">${exerciseData.name}</h2>
  <video class="exercise-video" controls src="${exerciseData.gifUrl}"></video>
  <p class="exercise-rating">Rating: ${exerciseData.rating}</p>
  <p class="exercise-target">Target: ${exerciseData.target}</p>
  <p class="exercise-bodyPart">Body Part: ${exerciseData.bodyPart}</p>
  <p class="exercise-popularity">Popularity: ${exerciseData.popularity}</p>
  <p class="exercise-calories">Calories Burned: ${
    exerciseData.burnedCalories
  } kcal in ${exerciseData.time} minutes</p>
  <p class="exercise-description">${exerciseData.description}</p>
  <button class="favorite-button"></button>
  ${
    exerciseData.rating
      ? '<button class="rate-button">Give a rating</button>'
      : ''
  }
`;
