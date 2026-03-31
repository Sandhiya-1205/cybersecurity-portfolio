/* ═══════════════════════════════════════════════════
   SANDHIYA D — CYBERSECURITY PORTFOLIO
   script.js — Fixed: resume download + contact form
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── MATRIX RAIN ────────────────────────── */
(function matrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2, 4, 8, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '13px "Share Tech Mono", monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.5 + 0.2;
      ctx.fillText(ch, i * 18, y * 18);
      ctx.globalAlpha = 1;
      if (y * 18 > canvas.height && Math.random() > 0.974) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();


/* ─── BOOT SCREEN ────────────────────────── */
(function bootScreen() {
  const screen   = document.getElementById('boot-screen');
  const textEl   = document.getElementById('boot-text');
  const progress = document.getElementById('boot-progress');
  const status   = document.getElementById('boot-status');

  const lines = [
    { t: '> Initializing secure profile…',          cls: '',      pct: 10 },
    { t: '> Loading cybersecurity modules…',         cls: '',      pct: 25 },
    { t: '> Mounting offensive_toolkit.sh',          cls: 'dim',   pct: 38 },
    { t: '> Running OWASP scanner…   [OK]',          cls: 'dim',   pct: 50 },
    { t: '> AI security engine online… [OK]',        cls: 'dim',   pct: 62 },
    { t: '> Authenticating credentials…',            cls: '',      pct: 76 },
    { t: '> AUTH: PASSED',                           cls: '',      pct: 88 },
    { t: '',                                         cls: '',      pct: 92 },
    { t: '> Welcome to Sandhiya\'s Security Portfolio', cls: 'bright', pct: 100 },
    { t: '> // Cybersecurity Engineer | Ethical Hacker', cls: 'bright', pct: 100 },
  ];

  let li = 0, ci = 0, el = null;
  document.body.style.overflow = 'hidden';

  function tick() {
    if (li >= lines.length) {
      status.textContent = 'Ready.';
      setTimeout(() => {
        screen.classList.add('out');
        document.body.style.overflow = '';
      }, 600);
      return;
    }
    const line = lines[li];
    if (ci === 0) {
      el = document.createElement('span');
      el.className = 'bl' + (line.cls ? ' ' + line.cls : '');
      textEl.appendChild(el);
      if (line.pct) {
        progress.style.width = line.pct + '%';
        status.textContent = line.t || 'Loading…';
      }
    }
    if (ci < line.t.length) {
      el.textContent += line.t[ci];
      ci++;
      setTimeout(tick, line.cls === 'dim' ? 12 : 22);
    } else {
      li++; ci = 0;
      setTimeout(tick, line.cls === 'dim' ? 60 : 180);
    }
  }
  setTimeout(tick, 350);
})();


/* ─── NAVBAR ─────────────────────────────── */
(function navbar() {
  const nav   = document.getElementById('navbar');
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    highlightActive();
  }, { passive: true });

  ham.addEventListener('click', () => {
    links.classList.toggle('open');
    ham.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      ham.classList.remove('open');
    });
  });

  function highlightActive() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 180) current = sec.id;
    });
    links.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
})();


/* ─── TYPING ANIMATION ───────────────────── */
(function typewriter() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const words = [
    'Cybersecurity Engineer',
    'Ethical Hacker',
    'AI Security Engineer',
    'VAPT Analyst',
    'Threat Hunter',
  ];
  let wi = 0, ci = 0, deleting = false;

  function step() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(step, 2400); return; }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(step, deleting ? 40 : 70);
  }
  setTimeout(step, 2000);
})();


/* ─── SCROLL REVEAL ──────────────────────── */
(function scrollReveal() {
  const els = document.querySelectorAll('.reveal-fade, .reveal-up');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0, 10);
        setTimeout(() => e.target.classList.add('vis'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
})();


/* ─── COUNTER ANIMATION ──────────────────── */
(function counters() {
  const els = document.querySelectorAll('[data-count]');

  function animate(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur    = 1600;
    const fps    = 60;
    const steps  = Math.ceil(dur / (1000 / fps));
    let frame    = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(ease * target);
      el.textContent = val + suffix;
      if (frame >= steps) { el.textContent = target + suffix; clearInterval(timer); }
    }, 1000 / fps);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
})();


/* ─── RADAR / SKILL BARS ─────────────────── */
(function skillBars() {
  const fills = document.querySelectorAll('.rf');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => io.observe(f));
})();


/* ─── ACHIEVEMENT BARS ───────────────────── */
(function achBars() {
  const bars = document.querySelectorAll('.ach-bar');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.width = '82%'; }, 200);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => io.observe(b));
})();


/* ─── CONTACT FORM — Pure Frontend Simulation ───
   No backend. Validates email + message, shows
   animated success state, clears form.
   ─────────────────────────────────────────────── */
(function contactForm() {
  const form  = document.getElementById('contact-form');
  if (!form) return;

  const btn     = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnArrow= document.getElementById('btn-arrow');
  const msgEl   = document.getElementById('form-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* — Collect values — */
    const email   = (document.getElementById('f-email').value || '').trim();
    const message = (document.getElementById('f-msg').value   || '').trim();

    /* — Validation — */
    if (!email) {
      showMsg('Please enter your email address.', 'error');
      shake(document.getElementById('f-email'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('Please enter a valid email address.', 'error');
      shake(document.getElementById('f-email'));
      return;
    }
    if (!message) {
      showMsg('Please enter a message.', 'error');
      shake(document.getElementById('f-msg'));
      return;
    }

    /* — Loading state — */
    btn.disabled = true;
    btnText.textContent = 'Sending…';
    if (btnArrow) btnArrow.classList.add('hidden');
    msgEl.classList.add('hidden');

    /* — Simulate async send (800ms delay) — */
    setTimeout(() => {

      /* Success UI */
      btnText.textContent = '✓ Message Sent!';
      btn.style.background = '#00cc6a';
      btn.style.boxShadow  = '0 0 0 0 rgba(0,255,136,0.4)';
      btn.style.animation  = 'successPulse 0.5s ease forwards';

      showMsg(
        '✓ Message received! I\'ll get back to you at ' + email + ' soon.',
        'success'
      );

      /* Clear form */
      form.reset();

      /* Reset button after 4s */
      setTimeout(() => {
        btn.disabled        = false;
        btn.style.background = '';
        btn.style.boxShadow  = '';
        btn.style.animation  = '';
        btnText.textContent  = 'Send Message';
        if (btnArrow) btnArrow.classList.remove('hidden');
      }, 4000);

    }, 800);
  });

  /* Helpers */
  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.className   = 'form-feedback ' + type;
    msgEl.classList.remove('hidden');
  }

  function shake(el) {
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
    el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
  }
})();


/* ─── HERO NAME GLITCH ───────────────────── */
(function heroGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;
  setInterval(() => {
    if (Math.random() > 0.96) {
      name.style.textShadow = '2px 0 #ff3c5c, -2px 0 #00b4d8';
      name.style.transform  = 'translateX(1px)';
      setTimeout(() => {
        name.style.textShadow = '';
        name.style.transform  = '';
      }, 70);
    }
  }, 900);
})();


/* ─── CURSOR TRAIL ───────────────────────── */
(function cursorTrail() {
  if (window.innerWidth < 768) return;
  const COUNT = 7;
  const trail = [];

  for (let i = 0; i < COUNT; i++) {
    const d = document.createElement('div');
    const sz = 3 + i * 1.4;
    d.style.cssText = `
      position:fixed; width:${sz}px; height:${sz}px;
      background:rgba(0,255,136,${0.55 - i * 0.07});
      border-radius:50%; pointer-events:none; z-index:9997;
      top:0; left:0; will-change:transform;
    `;
    document.body.appendChild(d);
    trail.push({ el: d, x: -100, y: -100 });
  }

  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function frame() {
    trail.forEach((pt, i) => {
      const prev = i === 0 ? { x: mx, y: my } : trail[i - 1];
      pt.x += (prev.x - pt.x) * 0.28;
      pt.y += (prev.y - pt.y) * 0.28;
      pt.el.style.transform = `translate(${pt.x - pt.el.offsetWidth / 2}px, ${pt.y - pt.el.offsetHeight / 2}px)`;
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();


/* ─── CARD TILT MICRO-INTERACTION ───────── */
(function cardTilt() {
  const cards = document.querySelectorAll('.glass');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * 2.5}deg) rotateY(${dx * 2.5}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();


/* ─── SMOOTH SCROLL (for older Safari) ──── */
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
