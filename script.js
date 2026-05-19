// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal-on-view
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

document.querySelectorAll(
  '.pillar, .service-detail, .meister-detail, .md-image, .md-body, .wert, .g, .section-head, .phone-display, .contact-card, .form-head, .contact-form'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 100;
  io.observe(el);
});

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links.classList.toggle('open'));
links?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') links.classList.remove('open');
});

// Phone-display mouse glow
const phone = document.querySelector('.phone-display');
phone?.addEventListener('mousemove', (e) => {
  const r = phone.getBoundingClientRect();
  phone.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  phone.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
});

// Image fallback — replace broken images with elegant gradient placeholder
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    img.style.cssText = `
      background: linear-gradient(135deg, #0f1d17 0%, #14271f 50%, rgba(201,169,110,0.2) 100%),
                  repeating-linear-gradient(45deg, transparent 0 10px, rgba(201,169,110,0.04) 10px 11px);
      visibility: visible;
    `;
    img.removeAttribute('src');
  });
});
