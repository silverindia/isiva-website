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

  // More dropdown — click to open, click outside to close
  const moreNav = document.querySelector('.nav-more');
  const moreBtn = document.querySelector('.nav-more__label');
  if (moreNav && moreBtn) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moreNav.classList.toggle('is-open');
    });
    document.addEventListener('click', () => {
      moreNav.classList.remove('is-open');
    });
    const moreMenu = moreNav.querySelector('.nav-more__menu');
    if (moreMenu) {
      moreMenu.addEventListener('click', (e) => e.stopPropagation());
    }
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
