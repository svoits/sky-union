import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import refs from './refs';

(() => {
  const toggleMenu = () => {
    const isMenuOpen =
      refs.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;

    refs.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    refs.mobileMenu.classList.toggle('is-open');
    refs.mobileBackdrop.classList.toggle('is-open');
    refs.burgerIcon.classList.toggle('active');
    refs.closeIcon.classList.toggle('active');

    const scrollLockMethod = !isMenuOpen ? disableBodyScroll : enableBodyScroll;
    scrollLockMethod(document.body);
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  refs.mobileBackdrop.addEventListener('click', e => {
    if (e.currentTarget === e.target) {
      toggleMenu();
    }
  });

  refs.toHomeBtn.forEach(item => {
    item.addEventListener('click', () => {
      scrollToId('home');
    });
  });
  refs.toAboutBtn.forEach(item => {
    item.addEventListener('click', () => {
      scrollToId('about');
    });
  });
  refs.toGalleryBtn.forEach(item => {
    item.addEventListener('click', () => {
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
    bodyScrollLock.enableBodyScroll(document.body);
  }
  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;

    refs.burgerIcon.classList.add('active');
    refs.closeIcon.classList.remove('active');
    refs.mobileMenu.classList.remove('is-open');
    refs.mobileBackdrop.classList.remove('is-open');
    refs.openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
