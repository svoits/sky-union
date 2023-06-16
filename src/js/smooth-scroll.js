import { enableBodyScroll } from 'body-scroll-lock';
import refs from './refs';

refs.toHomeLinks.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    scrollToId('home');
  });
});

refs.toAboutLinks.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    scrollToId('about');
  });
});

refs.toGalleryLinks.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    scrollToId('gallery');
  });
});

function scrollToId(id) {
  const access = document.getElementById(id);

  access.scrollIntoView({ behavior: 'smooth' }, true);

  refs.burgerIcon.classList.add('active');
  refs.closeIcon.classList.remove('active');
  refs.mobileMenu.classList.remove('is-open');
  refs.mobileBackdrop.classList.remove('is-open');
  refs.openMenuBtn.setAttribute('aria-expanded', false);

  //   enableBodyScroll(document);
}
