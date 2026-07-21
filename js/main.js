document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Nav dropdowns (Research / Teaching / Societal) — click to open,
  // opening one closes the others, click outside closes all.
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (dropdowns.length) {
    dropdowns.forEach((dd) => {
      const label = dd.querySelector('.nav-dropdown__label');
      const menu = dd.querySelector('.nav-dropdown__menu');
      if (!label) return;
      label.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = dd.classList.contains('is-open');
        dropdowns.forEach((other) => other.classList.remove('is-open'));
        if (!wasOpen) dd.classList.add('is-open');
      });
      if (menu) menu.addEventListener('click', (e) => e.stopPropagation());
    });
    document.addEventListener('click', () => {
      dropdowns.forEach((dd) => dd.classList.remove('is-open'));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

});
