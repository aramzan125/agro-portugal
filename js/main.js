/**
 * João Prioste — Shared site logic & i18n
 */

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.apply': 'Apply Now',
    'footer.desc': 'João Prioste — production, commercialization, and wholesale of agricultural, horticultural, and fruit products. Peniche, Portugal.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.about': 'About Us',
    'footer.rights': 'All rights reserved.',
    'toast.success': 'Thank you! Your application has been received. We will contact you shortly.',
    'toast.contact': 'Thank you! Your message has been sent. We will reply soon.',
  },
  pt: {
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.careers': 'Carreiras',
    'nav.contact': 'Contacto',
    'nav.apply': 'Candidate-se',
    'footer.desc': 'João Prioste — produção, comercialização e comércio por grosso de produtos agrícolas, hortícolas e frutícolas. Peniche, Portugal.',
    'footer.services': 'Serviços',
    'footer.company': 'Empresa',
    'footer.careers': 'Carreiras',
    'footer.contact': 'Contacto',
    'footer.about': 'Sobre Nós',
    'footer.rights': 'Todos os direitos reservados.',
    'toast.success': 'Obrigado! A sua candidatura foi recebida. Contactaremos em breve.',
    'toast.contact': 'Obrigado! A sua mensagem foi enviada. Responderemos em breve.',
  },
};

let currentLang = localStorage.getItem('joao-prioste-lang') || localStorage.getItem('verdecampo-lang') || 'pt';

function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = translations[currentLang][key];
    if (text) el.textContent = text;
  });
  document.documentElement.lang = currentLang === 'pt' ? 'pt' : 'en';
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('joao-prioste-lang', lang);
  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));

  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  setLanguage(currentLang);
}

function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function showToast(messageKey) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = t(messageKey);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = form.dataset.form;
      showToast(type === 'contact' ? 'toast.contact' : 'toast.success');
      form.reset();
    });
  });
}

function initJobApply() {
  document.querySelectorAll('[data-apply]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const job = btn.dataset.apply;
      const select = document.querySelector('#position');
      const formSection = document.querySelector('#apply-form');
      if (select) select.value = job;
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = formSection.querySelector('input, select, textarea');
        firstInput?.focus();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFadeIn();
  initFAQ();
  initForms();
  initJobApply();
});
