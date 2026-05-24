import emailjs from "@emailjs/browser";

// ===================== IDIOMAS =====================
const translations = {
  "pt-BR": { 
    resposta: "✓ Mensagem enviada com sucesso!",
    erro: "✗ Erro: "
  },
  "en": {
    resposta: "✓ Message sent successfully!",
    erro: "✗ Error: "
  }
};

let currentLanguage = localStorage.getItem('portfolio-language') || 'pt-BR';

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initMenu();
  initFormulario();
  initScrollAnimations();
});

// ===================== FUNÇÕES DE IDIOMA =====================
function initLanguage() {
  setLanguage(currentLanguage);

  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('portfolio-language', lang);

  document.documentElement.setAttribute('lang', lang.split('-')[0]);

  document.querySelectorAll('[data-pt][data-en]').forEach(element => {
    const text = lang === 'pt-BR'
      ? element.getAttribute('data-pt')
      : element.getAttribute('data-en');

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      // Preservar elementos filhos com classes especiais (como .texto-destaque)
      const hasSpecialChildren = element.querySelector('.texto-destaque, .status-dot');
      if (!hasSpecialChildren) {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
          element.textContent = text;
        } else if (
          element.tagName === 'LABEL' ||
          element.tagName === 'H2' ||
          element.tagName === 'H3' ||
          element.tagName === 'H4' ||
          element.tagName === 'P' ||
          element.tagName === 'SPAN' ||
          element.tagName === 'A' ||
          element.tagName === 'BUTTON'
        ) {
          element.textContent = text;
        }
      }
    }
    const resumeDownload = document.getElementById('resumeDownload');
    if (resumeDownload) {
      resumeDownload.href = lang === 'pt-BR'
        ? '/portifolio-DavidBrocardo/pdf/Currículo - David Antonio Brocardo.pdf'
        : '/portifolio-DavidBrocardo/pdf/Resume - David Antonio Brocardo.pdf';
    }

  });

  updateLangButton();
}

function toggleLanguage() {
  const newLang = currentLanguage === 'pt-BR' ? 'en' : 'pt-BR';
  setLanguage(newLang);
}

function updateLangButton() {
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    if (currentLanguage === 'pt-BR') {
      langBtn.querySelector('.lang-text').textContent = 'EN';
      langBtn.querySelector('.lang-flag').textContent = '🇧🇷';
    } else {
      langBtn.querySelector('.lang-text').textContent = 'PT';
      langBtn.querySelector('.lang-flag').textContent = '🇺🇸';
    }
  }
}

// ===================== MENU MOBILE =====================
function initMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    mobileMenu.classList.toggle('show', !isOpen);
    toggleBtn.classList.toggle('active', !isOpen);
  });

  mobileMenu.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    mobileMenu.classList.remove('show');
    toggleBtn.classList.remove('active');
  });
}


// ===================== ANIMAÇÕES DE SCROLL =====================
function initScrollAnimations() {
  const cards = document.querySelectorAll('.card, .event');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}
