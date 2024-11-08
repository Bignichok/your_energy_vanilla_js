import { fetchCategories, fetchExercises } from './api.js';
import { Pagination } from './Pagination.js';

export const initializeCategoriesSection = () => {
  const categoriesContainer = document.querySelector('.categories-list');
  const filtersTitle = document.querySelector('.filters-title');
  const filters = document.querySelector('#filters');
  const paginationContainer = document.querySelector('.pagination');
  const exercisesContainer = document.querySelector('.exercises-list');

  let activeFilter = 'Muscles';
  let categoryPagination;
  let exercisePagination;

  const scrollToFilters = () => {
    window.scrollTo({ top: filtersTitle.offsetTop, behavior: 'smooth' });
  };

  const renderTitle = category => {
    if (category) {
      filtersTitle.innerHTML = `Exercises /<span>${category}</span>`;
    } else {
      filtersTitle.innerHTML = 'Exercises';
    }
  };

  const renderCategories = (categories, cb) => {
    categoriesContainer.innerHTML = '';
    categoriesContainer.style.display = 'grid';
    exercisesContainer.style.display = 'none';
    renderTitle();
    scrollToFilters();

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        const listItemHTML = `
          <li class="categories-list-item" data-filter="${category.filter}" data-name="${category.name}"
          style="background-image: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url(${category.imgURL})">
            <p class="categories-list-item-title">${category.name}</p>
            <p class="categories-list-item-sub-title">${category.filter}</p>
          </li>
        `;
        categoriesContainer.insertAdjacentHTML('beforeend', listItemHTML);
      });
    } else {
      categoriesContainer.insertAdjacentHTML(
        'beforeend',
        '<p>No categories found for the selected filter.</p>'
      );
    }
    cb && cb();
  };

  const renderExercises = (exercises, category) => {
    exercisesContainer.innerHTML = '';
    categoriesContainer.style.display = 'none';
    exercisesContainer.style.display = 'grid';
    renderTitle(category);
    scrollToFilters();

    if (exercises && exercises.length > 0) {
      exercises.forEach(exercise => {
        const exerciseItemHTML = `
          <li class="exercise-list-item">
            <p class="exercise-list-item-title">${exercise.name}</p>
            <p class="exercise-list-item-details">${exercise.details}</p>
          </li>
        `;
        exercisesContainer.insertAdjacentHTML('beforeend', exerciseItemHTML);
      });
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
