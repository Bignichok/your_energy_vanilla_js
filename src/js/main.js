import { fetchFilters } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu');
  const menuBackdrop = document.querySelector('.menu-backdrop');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const mobileNavigation = document.querySelector('.mobile-nav-list');
  const links = document.querySelectorAll('.nav-link');

  const toogleMenu = () => {
    menu.classList.toggle('active');
    menuBackdrop.classList.toggle('active');
    menuButton.classList.toggle('active');
  };

  const currentPath = window.location.pathname.split('/').pop();

  const isActiveLink = linkPath =>
    linkPath === currentPath || (linkPath === 'index.html' && !currentPath);

  links.forEach(link => {
    if (isActiveLink(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  menuButton.addEventListener('click', toogleMenu);
  menuBackdrop.addEventListener('click', toogleMenu);
  closeMenuButton.addEventListener('click', toogleMenu);
  mobileNavigation.addEventListener('click', toogleMenu);

  const initializeFilterListener = () => {
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

  initializeFilterListener();
});
