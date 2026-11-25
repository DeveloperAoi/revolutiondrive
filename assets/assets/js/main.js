document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('done'), 450));
  setTimeout(() => loader?.classList.add('done'), 2200);

  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const topButton = document.querySelector('.back-top');

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    topButton?.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }));
});
