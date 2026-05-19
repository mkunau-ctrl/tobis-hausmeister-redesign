// year
document.getElementById('year').textContent = new Date().getFullYear();

// reveal on view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('is-visible'), Number(delay));
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// auto-add reveal to common blocks
document.querySelectorAll('.service, .step, .meister-body, .meister-image, .section-head, .phone-display, .contact-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 100;
  io.observe(el);
});

// mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') links.classList.remove('open');
});

// phone-display mouse glow
const phone = document.querySelector('.phone-display');
phone?.addEventListener('mousemove', (e) => {
  const r = phone.getBoundingClientRect();
  phone.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  phone.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
});
