import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import refs from './refs';

const delayDuration = 1500;

// Wait for the page to load
window.addEventListener('load', function () {
  disableBodyScroll(document);

  function hidePreloader() {
    refs.preloader.style.display = 'none';
    enableBodyScroll(document);
  }

  setTimeout(hidePreloader, delayDuration);
});
