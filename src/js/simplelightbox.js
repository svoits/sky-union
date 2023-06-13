import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';

let lightboxAbout = null;
let lightboxGallery = null;

// Attach event listener to window resize event
window.addEventListener('resize', throttle(updateLightboxes, 500));

// Attach event listener to img in tag <a></a> click event to prevent image opening on click
refs.aboutGalleryList.addEventListener('click', handleImageClick);
refs.galleryList.addEventListener('click', handleImageClick);

// Function to initialize or update Simplelightbox
function updateLightboxes() {
  if (window.screen.width < 1024 || window.innerWidth < 1024) {
    if (lightboxAbout && lightboxGallery) {
      lightboxAbout.destroy();
      lightboxAbout = null;
      lightboxGallery.destroy();
      lightboxGallery = null;
    }
  } else {
    if (!lightboxAbout && !lightboxGallery) {
      lightboxAbout = new SimpleLightbox('.about-gallery-list a');
      lightboxGallery = new SimpleLightbox('.gallery-list a');
    }
  }
}

// Function to handles image click
function handleImageClick(e) {
  if (e.target.nodeName === 'IMG') {
    e.preventDefault();
  }
}

// Initial check on page load
updateLightboxes();
