import { fetchCategories } from './api.js';
import { Pagination } from './Pagination.js';

export const initializeCategoriesSection = () => {
  const categoriesContainer = document.querySelector('.categories-list');
  const filters = document.querySelector('#filters');
  const paginationContainer = document.querySelector('.pagination');
  let activeFilter = 'Muscles';
  let pagination;

  function renderCategories(categories) {
    categoriesContainer.innerHTML = '';

    if (categories && categories.length > 0) {
      categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.className = 'categories-list-item';
        listItem.style.backgroundImage = `linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url(${category.imgURL})`;
        listItem.innerHTML = `
          <p class="categories-list-item-title">${category.name}</p>
          <p class="categories-list-item-sub-title">${category.filter}</p>
        `;
        categoriesContainer.appendChild(listItem);
      });
    } else {
      categoriesContainer.innerHTML =
        '<p>No categories found for the selected filter.</p>';
    }
  }

  function setActiveFilterButton(filterName) {
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filterName);
    });
  }

  async function loadCategories(filter, page = 1) {
    activeFilter = filter;
    setActiveFilterButton(filter);

    const data = await fetchCategories(filter, page);
    renderCategories(data.results);

    if (!pagination) {
      pagination = new Pagination({
        container: paginationContainer,
        totalPages: 10,
        onPageChange: page => loadCategories(activeFilter, page),
      });
    } else {
      pagination.setTotalPages(10);
    }
  }

  loadCategories('Muscles');

  filters.addEventListener('click', event => {
    const button = event.target.closest('.filter-button');
    if (button) {
      const filter = button.dataset.filter;
      loadCategories(filter);
    }
  });
};
