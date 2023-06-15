import refs from './refs';

refs.navLinks.forEach(link =>
  link.addEventListener('click', e => e.preventDefault())
);
