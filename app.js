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

const projects = document.querySelector('[data-projects]');
portfolio.work.projects.forEach((project) => {
  const article = document.createElement('article');
  article.className = 'project-card';

  const imageLink = document.createElement('a');
  imageLink.className = 'project-image';
  imageLink.href = project.link;
  imageLink.target = '_blank';
  imageLink.rel = 'noopener noreferrer';
  imageLink.setAttribute('aria-label', `${project.title} — abrir projeto completo em nova aba`);

  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.imageAlt;
  image.width = project.imageWidth;
  image.height = project.imageHeight;
  image.loading = 'lazy';
  image.decoding = 'async';
  imageLink.append(image);

  const imageArrow = document.createElement('span');
  imageArrow.className = 'project-image-arrow';
  imageArrow.setAttribute('aria-hidden', 'true');
  imageArrow.textContent = '↗';
  imageLink.append(imageArrow);

  const copy = document.createElement('div');
  copy.className = 'project-copy';
  const meta = document.createElement('p');
  meta.className = 'project-meta';
  meta.textContent = `${project.category} · ${project.year}`;
  const title = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = project.link;
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  titleLink.textContent = project.title;
  title.append(titleLink);
  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  const details = document.createElement('a');
  details.className = 'project-link';
  details.href = project.link;
  details.target = '_blank';
  details.rel = 'noopener noreferrer';
  details.append(document.createTextNode(project.linkLabel));
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = ' ↗';
  details.append(arrow);
  copy.append(meta, title, description, details);
  article.append(imageLink, copy);
  projects.append(article);
});

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

const revealTargets = document.querySelectorAll('.section-heading, .project-card, .craft-feature, .about-copy, .skills-list, .contact-card');
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
