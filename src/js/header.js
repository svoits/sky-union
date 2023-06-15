import './mobile-menu';

const navLink = document.querySelectorAll('.js-nav-link');

navLink.forEach(link =>
  link.addEventListener('click', e => e.preventDefault())
);
