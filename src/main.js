document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const closeMenuButton = document.querySelector('.close-menu-button');
    const mobileNavigation = document.querySelector('.mobile-nav-list');

    const toogleMenu = () => {
        menu.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        menuButton.classList.toggle('active');
    }

    menuButton.addEventListener('click', toogleMenu);
    menuBackdrop.addEventListener('click', toogleMenu);
    closeMenuButton.addEventListener('click', toogleMenu);
    mobileNavigation.addEventListener('click', toogleMenu);
})
