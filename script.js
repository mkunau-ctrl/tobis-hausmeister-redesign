/* ============================================
   Tobi's Hausmeisterservice — Interaction Layer
   - IntersectionObserver triggers per-container animations
   - DOM augmentation for letter/digit splits
   - Mobile nav, phone glow, image fallback
   ============================================ */

(function(){
  'use strict';

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- DOM AUGMENTATION (runs before observer kicks in) ---

  // 1) Hero title: wrap each .line's text in a <span> so it can be transformed.
  document.querySelectorAll('.hero-title .line').forEach((line) => {
    if (!line.querySelector('span')) {
      line.innerHTML = `<span>${line.innerHTML}</span>`;
    }
  });

  // 2) Sub-hero h1: split each .line into per-character spans with --i index.
  document.querySelectorAll('.sub-hero h1 .line').forEach((line) => {
    if (line.dataset.split === 'done') return;
    const text = line.textContent;
    let html = '';
    let i = 0;
    for (const ch of text) {
      if (ch === ' ') {
        html += '<span class="char" style="--i:'+i+'">&nbsp;</span>';
      } else {
        html += '<span class="char" style="--i:'+i+'">'+ch+'</span>';
      }
      i++;
    }
    line.innerHTML = html;
    line.dataset.split = 'done';
  });

  // 3) Phone number: split each character into a digit span.
  document.querySelectorAll('.phone-number').forEach((el) => {
    if (el.dataset.split === 'done') return;
    const text = el.textContent;
    let html = '';
    let i = 0;
    for (const ch of text) {
      if (ch === ' ') {
        html += '<span class="digit" style="--i:'+i+'">&nbsp;</span>';
      } else {
        html += '<span class="digit" style="--i:'+i+'">'+ch+'</span>';
      }
      i++;
    }
    el.innerHTML = html;
    el.dataset.split = 'done';
  });

  // 4) Service-detail images: inject two extra blind elements so 4 horizontal
  //    bars can hide the image until the section enters the viewport.
  document.querySelectorAll('.sd-image').forEach((img) => {
    if (img.querySelector('.sd-blind-1')) return;
    const b1 = document.createElement('span');
    b1.className = 'sd-blind-1';
    b1.setAttribute('aria-hidden', 'true');
    const b2 = document.createElement('span');
    b2.className = 'sd-blind-2';
    b2.setAttribute('aria-hidden', 'true');
    img.appendChild(b1);
    img.appendChild(b2);
  });

  // 5) Gallery items: assign random direction-of-entry CSS variables so each
  //    image flies in from a different angle — confetti effect.
  document.querySelectorAll('.gallery-grid .g').forEach((g) => {
    const angle = Math.random() * 360;
    const dist  = 80 + Math.random() * 80;
    const rx = Math.cos(angle * Math.PI / 180) * dist;
    const ry = Math.sin(angle * Math.PI / 180) * dist;
    const rr = (Math.random() - 0.5) * 14;
    g.style.setProperty('--rx', rx.toFixed(1) + 'px');
    g.style.setProperty('--ry', ry.toFixed(1) + 'px');
    g.style.setProperty('--rr', rr.toFixed(1) + 'deg');
  });

  // --- INTERSECTION OBSERVER ---
  // Adds .in-view to any element with [data-anim] once it scrolls into view.
  // Also self-applied to .hero-title so its line-rise can run (uses .in-view).
  const observe = (el) => observer.observe(el);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  // Elements explicitly marked via data-anim
  document.querySelectorAll('[data-anim]').forEach(observe);

  // Plus several known containers that animate purely via .in-view
  document.querySelectorAll(
    '.hero-title, .pillar, .big-quote, .cta-band, .service-detail, ' +
    '.meister-detail, .info-strip, .g, .ref-note'
  ).forEach(observe);

  // Hero title is visible immediately above the fold — let it run on load too,
  // in case the observer's threshold hasn't fired yet.
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-title').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in-view');
    });
  });

  // --- MOBILE NAV ---
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // --- PHONE DISPLAY MOUSE GLOW ---
  document.querySelectorAll('.phone-display').forEach((phone) => {
    phone.addEventListener('mousemove', (e) => {
      const r = phone.getBoundingClientRect();
      phone.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      phone.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });

  // --- GHOST BUTTON RADIAL HOVER ---
  document.querySelectorAll('.btn-ghost').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--bx', ((e.clientX - r.left) / r.width * 100) + '%');
      btn.style.setProperty('--by', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });

  // --- IMAGE FALLBACK — broken images become elegant gradient placeholders ---
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      img.style.cssText = `
        background:
          linear-gradient(135deg, #0f1d17 0%, #14271f 50%, rgba(201,169,110,0.2) 100%),
          repeating-linear-gradient(45deg, transparent 0 10px, rgba(201,169,110,0.04) 10px 11px);
        visibility:visible;
      `;
      img.removeAttribute('src');
    });
  });

})();
