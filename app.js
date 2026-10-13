import { portfolio } from './content.js';

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
};

setText('[data-name]', portfolio.name);
setText('[data-hero-eyebrow]', portfolio.hero.eyebrow);
setText('[data-hero-intro]', portfolio.hero.intro);
setText('[data-work-title]', portfolio.work.title);
setText('[data-work-intro]', portfolio.work.intro);
setText('[data-club-name]', portfolio.work.club.name);
setText('[data-club-category]', portfolio.work.club.category);
setText('[data-club-description]', portfolio.work.club.description);
setText('[data-club-note]', portfolio.work.club.note);
setText('[data-about-title]', portfolio.about.title);
setText('[data-pull-quote]', portfolio.about.pullQuote);
setText('[data-contact-prompt]', portfolio.contactPrompt);
setText('[data-footer-note]', portfolio.footerNote);
setText('[data-year]', String(new Date().getFullYear()));

const heroTitle = document.querySelector('#hero-title');
portfolio.hero.headline.split('\n').forEach((line, index, lines) => {
  const span = document.createElement('span');
  span.className = index === lines.length - 1 ? 'serif-word' : '';
  span.textContent = line;
  heroTitle.append(span);
});

const tags = document.querySelector('[data-hero-tags]');
portfolio.hero.tags.forEach((tag) => {
  const chip = document.createElement('span');
  chip.className = 'hero-tag';
  chip.textContent = tag;
  tags.append(chip);
});

const paragraphs = document.querySelector('[data-about-paragraphs]');
portfolio.about.paragraphs.forEach((text) => {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  paragraphs.append(paragraph);
});

const skills = document.querySelector('[data-skills]');
portfolio.skills.forEach((skill) => {
  const item = document.createElement('li');
  const marker = document.createElement('span');
  marker.textContent = '✳';
  marker.setAttribute('aria-hidden', 'true');
  item.append(marker, document.createTextNode(skill));
  skills.append(item);
});

const dialog = document.querySelector('[data-contact-dialog]');
const openButton = document.querySelector('[data-open-contact]');
const closeButton = document.querySelector('[data-close-contact]');
const linkedinLink = document.querySelector('[data-linkedin]');
const copyButton = document.querySelector('[data-copy-link]');
const feedback = document.querySelector('[data-copy-feedback]');
linkedinLink.href = portfolio.linkedin;

openButton.addEventListener('click', () => {
  dialog.showModal();
  closeButton.focus();
});
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  feedback.textContent = '';
  openButton.focus();
});
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(portfolio.linkedin);
    feedback.textContent = 'Link copiado.';
  } catch {
    feedback.textContent = 'Não foi possível copiar. Abra o LinkedIn pelo link acima.';
  }
});

const revealTargets = document.querySelectorAll('.section-heading, .craft-feature, .work-aside, .about-copy, .skills-list, .contact-paper');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
