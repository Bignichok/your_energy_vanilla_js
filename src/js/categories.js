import { fetchCategories, fetchExercises } from './api.js';
import { Pagination } from './Pagination.js';

export const initializeCategoriesSection = () => {
  const categoriesContainer = document.querySelector('.categories-list');
  const filtersTitle = document.querySelector('.filters-title');
  const filters = document.querySelector('#filters');
  const paginationContainer = document.querySelector('.pagination');
  const exercisesContainer = document.querySelector('.exercises-list');
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  const clearButton = document.querySelector('.clear-button');

  let activeFilter = 'Muscles';
  let categoryPagination;
  let exercisePagination;
  let currentCategory = '';
  let currentFilter = '';

  const toggleClearButton = () => {
    clearButton.style.display = searchInput.value ? 'flex' : 'none';
  };

  const clearInput = () => {
    searchInput.value = '';
    toggleClearButton();
    searchInput.focus();
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    loadExercises({
      category: currentCategory,
      filter: currentFilter,
      keyword: searchTerm || '',
      resetPagination: true,
    });
  };

  searchInput.addEventListener('input', toggleClearButton);
  clearButton.addEventListener('click', clearInput);
  searchForm.addEventListener('submit', handleFormSubmit);

  const scrollToFilters = () => {
    window.scrollTo({ top: filtersTitle.offsetTop, behavior: 'smooth' });
  };

  const renderTitle = category => {
    filtersTitle.innerHTML = category
      ? `Exercises /<span>${category}</span>`
      : 'Exercises';
  };

  const getCategoriesMarkup = categories => {
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

  const renderCategories = (categories, cb) => {
    categoriesContainer.innerHTML = '';
    categoriesContainer.style.display = 'grid';
    exercisesContainer.style.display = 'none';
    searchForm.style.display = 'none';
    renderTitle();
    scrollToFilters();

    if (categories && categories.length > 0) {
      categoriesContainer.insertAdjacentHTML(
        'beforeend',
        getCategoriesMarkup(categories)
      );
    } else {
      categoriesContainer.insertAdjacentHTML(
        'beforeend',
        '<p>No categories found for the selected filter.</p>'
      );
    }
    cb && cb();
  };

  const getExercisesMarkup = exercises => {
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

  const renderExercises = (exercises, category) => {
    exercisesContainer.innerHTML = '';
    categoriesContainer.style.display = 'none';
    exercisesContainer.style.display = 'grid';
    searchForm.style.display = 'flex';
    renderTitle(category);
    scrollToFilters();

    if (exercises && exercises.length > 0) {
      exercisesContainer.insertAdjacentHTML(
        'beforeend',
        getExercisesMarkup(exercises)
      );
    } else {
      exercisesContainer.insertAdjacentHTML(
        'beforeend',
        '<p>No exercises found for the selected category and filter.</p>'
      );
    }
  };

  const setActiveFilterButton = filterName => {
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filterName);
    });
  };

  const loadCategories = async ({
    filter,
    page = 1,
    resetPagination = false,
  }) => {
    activeFilter = filter;
    setActiveFilterButton(filter);

    const data = await fetchCategories(filter, page);
    renderCategories(data.results);

    if (!categoryPagination || resetPagination) {
      categoryPagination = new Pagination({
        container: paginationContainer,
        totalPages: data.totalPages,
        onPageChange: page => loadCategories({ filter: activeFilter, page }),
      });
    } else {
      categoryPagination.setTotalPages(data.totalPages);
    }
  };

  const loadExercises = async ({
    category,
    filter,
    keyword = '',
    page = 1,
    resetPagination = false,
  }) => {
    currentCategory = category;
    currentFilter = filter;

    const data = await fetchExercises({
      bodypart: filter === 'Body parts' ? category : '',
      muscles: filter === 'Muscles' ? category : '',
      equipment: filter === 'Equipment' ? category : '',
      keyword,
      page,
      limit: 10,
    });

    renderExercises(data.results, category);

    if (resetPagination || !exercisePagination) {
      exercisePagination = new Pagination({
        container: paginationContainer,
        totalPages: data.totalPages,
        onPageChange: newPage =>
          loadExercises({
            category,
            filter,
            keyword,
            page: newPage,
          }),
      });
    } else {
      exercisePagination.setTotalPages(data.totalPages);
    }
  };

  categoriesContainer.addEventListener('click', event => {
    const categoryItem = event.target.closest('.categories-list-item');
    if (categoryItem) {
      loadExercises({
        category: categoryItem.dataset.name,
        filter: categoryItem.dataset.filter,
        resetPagination: true,
      });
    }
  });

  filters.addEventListener('click', event => {
    const filterButton = event.target.closest('.filter-button');
    if (filterButton) {
      loadCategories({
        filter: filterButton.dataset.filter,
        resetPagination: true,
      });
    }
  });

  loadCategories({ filter: 'Muscles' });
};
