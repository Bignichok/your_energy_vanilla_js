import { fetchCategories } from './api.js';
import { Pagination } from './Pagination.js';

export const initializeCategoriesSection = () => {
  const categoriesContainer = document.querySelector('.categories-list');
  const filters = document.querySelector('#filters');
  const paginationContainer = document.querySelector('.pagination');
  let activeFilter = 'Muscles';
  let pagination;

  const scrollToFilters = () => {
    window.scrollTo({ top: filters.offsetTop, behavior: 'smooth' });
  };

  const renderCategories = (categories, cb) => {
    categoriesContainer.innerHTML = '';

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        const listItemHTML = `
          <li class="categories-list-item" style="background-image: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url(${category.imgURL})">
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

  const setActiveFilterButton = filterName => {
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filterName);
    });
  };

  const loadCategories = async ({
    filter,
    page = 1,
    cb,
    resetPage = false,
  }) => {
    activeFilter = filter;
    setActiveFilterButton(filter);

    const data = await fetchCategories(filter, page);
    renderCategories(data.results, cb);

    if (!pagination) {
      pagination = new Pagination({
        container: paginationContainer,
        totalPages: data.totalPages,
        onPageChange: page =>
          loadCategories({ filter: activeFilter, page, cb: scrollToFilters }),
      });
    } else {
      if (resetPage) {
        pagination.currentPage = 1;
      }
      pagination.setTotalPages(data.totalPages);
    }
  };

  loadCategories({ filter: 'Muscles' });

  filters.addEventListener('click', event => {
    const button = event.target.closest('.filter-button');
    if (button) {
      const filter = button.dataset.filter;
      loadCategories({ filter, page: 1, cb: scrollToFilters, resetPage: true });
    }
  });
};
