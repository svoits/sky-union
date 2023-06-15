import i18next from 'i18next';
import refs from './refs';
import languages from '../languages/languages.json';

const LANG_LS_KEY = 'lang';
const metaDescriptionKey = 'metaDescription';
const storedLang = localStorage.getItem(LANG_LS_KEY);
const defaultLang = 'ua';
const validLangs = ['ua', 'en']; // Define valid language hashes
const urlHash = window.location.hash.substring(1);

// Initialize i18next
i18next.init(
  {
    lng: storedLang || defaultLang, // Get language from localStorage or set default to 'ua'
    resources: {
      ua: {
        translation: null, // Placeholder for translation data
      },
      en: {
        translation: null, // Placeholder for translation data
      },
    },
  },
  function (err, t) {
    i18next.addResourceBundle('ua', 'translation', languages.ua);
    i18next.addResourceBundle('en', 'translation', languages.en);
    updateContent();
    updateActiveButton();
    updateHTMLLangAttr(i18next.language);
    updateMetaDescription();
  }
);

// Update content based on selected language
function updateContent() {
  refs.allTranslateEls.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    element.textContent = translation;
  });
}

// Update active language button
function updateActiveButton() {
  const currentLang = i18next.language;
  refs.allTranslateBtns.forEach(button => {
    const lang = button.getAttribute('data-lang');
    if (lang === currentLang) {
      button.classList.add('active');
      button.disabled = true;
    } else {
      button.classList.remove('active');
      button.disabled = false;
    }
  });
}

// Update HTML lang attribute
function updateHTMLLangAttr(lang) {
  if (lang === 'ua') {
    refs.html.lang = 'uk';
  } else {
    refs.html.lang = lang;
  }
}

// Update meta description based on selected language
function updateMetaDescription() {
  const metaDescription = i18next.t(metaDescriptionKey);
  refs.metaDescription.setAttribute('content', metaDescription);
}

// Language buttons event listeners
refs.allTranslateBtns.forEach(button => {
  button.addEventListener('click', function () {
    const lang = button.getAttribute('data-lang');
    localStorage.setItem(LANG_LS_KEY, lang); // Store selected language in localStorage
    i18next.changeLanguage(lang, function () {
      updateContent();
      updateActiveButton();
      updateHTMLLangAttr(lang);
      updateMetaDescription();

      window.location.hash = lang; // Update the hash in the URL to the selected language
    });
  });
});

// Check if the hash exists in the URL and set it as the selected language
if (validLangs.includes(urlHash)) {
  localStorage.setItem(LANG_LS_KEY, urlHash); // Store the language hash in localStorage

  i18next.changeLanguage(urlHash, function () {
    updateContent();
    updateActiveButton();
    updateHTMLLangAttr(urlHash);
    updateMetaDescription();
  });
} else {
  if (validLangs.includes(storedLang)) {
    i18next.changeLanguage(storedLang, function () {
      updateContent();
      updateActiveButton();
      updateMetaDescription();
      updateHTMLLangAttr(storedLang);

      window.location.hash = storedLang; // Update the hash in the URL to the stored language
    });
  } else {
    const defaultLang = 'ua'; // Set the default language hash
    localStorage.setItem('lang', defaultLang); // Store the default language hash in localStorage
    i18next.changeLanguage(defaultLang, function () {
      updateContent();
      updateActiveButton();
      updateMetaDescription();
      updateHTMLLangAttr(defaultLang);

      window.location.hash = defaultLang; // Update the hash in the URL to the default language
    });
  }
}
