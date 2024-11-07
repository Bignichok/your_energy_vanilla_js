import { fetchCategories } from './api.js';

export const initializeCategoriesSection = () => {
  const categoriesContainer = document.querySelector('.categories-list');
  const filters = document.querySelector('#filters');
  const paginationContainer = document.querySelector('.pagination');
  let currentPage = 1;
  let totalPages = 1;
  let activeFilter = 'Muscles';

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
        listItem.addEventListener('click', () => loadExercises(category.name));
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
    currentPage = page;
    setActiveFilterButton(filter);
    const data = await fetchCategories(filter, page);
    totalPages = data.totalPages;
    renderCategories(data.results);
    renderPagination();
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';

    const createPageButton = (
      label,
      page,
      isActive = false,
      isDisabled = false
    ) => {
      const button = document.createElement('button');
      button.textContent = label;
      button.disabled = isDisabled;
      button.className = isActive ? 'active' : '';
      button.addEventListener('click', () =>
        loadCategories(activeFilter, page)
      );
      paginationContainer.appendChild(button);
    };

    // << First Page Button
    createPageButton('<<', 1, false, currentPage === 1);

    // < Previous Page Button
    createPageButton('<', currentPage - 1, false, currentPage === 1);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        createPageButton(i, i, i === currentPage);
      } else if (i === 2 || i === totalPages - 1) {
        paginationContainer.appendChild(document.createTextNode('...'));
      }
    }

    // > Next Page Button
    createPageButton('>', currentPage + 1, false, currentPage === totalPages);

    // >> Last Page Button
    createPageButton('>>', totalPages, false, currentPage === totalPages);
  }

  function loadExercises(categoryName) {
    categoriesContainer.innerHTML = `<p>Loading exercises for ${categoryName}...</p>`;
    // Additional functionality to fetch and display exercises can be implemented here
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
