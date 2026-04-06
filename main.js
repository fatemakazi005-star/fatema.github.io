// ============================================
//   Fatema Kazi — Portfolio JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── DARK / LIGHT TOGGLE ──────────────────
  const toggleBtn = document.getElementById('darkToggle');
  const body = document.body;
  let isDark = true;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark = savedTheme === 'dark';
    body.setAttribute('data-theme', savedTheme);
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    const theme = isDark ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    toggleBtn.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
  });

  // ── HAMBURGER MENU ───────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // ── NAVBAR SHADOW ON SCROLL ──────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40
      ? '0 4px 30px rgba(0,0,0,0.3)'
      : 'none';
  });

  // ── ACTIVE NAV LINK ──────────────────────
  const sections = document.querySelectorAll('section[id], div[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const activateNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--accent)'
        : '';
    });
  };

  window.addEventListener('scroll', activateNav);

  // ── SCROLL REVEAL ────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── ANIMATED SKILL BARS ──────────────────
  const bars = document.querySelectorAll('.skill-fill');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));

  // ── CONTACT FORM ─────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✅ Message Sent!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ── GALLERY LIGHTBOX ─────────────────────
  const galItems = document.querySelectorAll('.gal-item');
  const overlay  = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose  = document.getElementById('lbClose');

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      const emoji = item.dataset.emoji || item.querySelector('span')?.textContent || '🖼️';
      const label = item.querySelector('.gal-label')?.textContent || '';
      if (overlay) {
        lbImg.textContent = emoji;
        if (lbCaption) lbCaption.textContent = label;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lbClose) {
    lbClose.addEventListener('click', closeLightbox);
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── TYPED EFFECT (Hero subtitle) ─────────
  const typed = document.getElementById('typedText');
  if (typed) {
    const phrases = [
      'Computer Science Student',
      'Web Developer',
      'AI Enthusiast',
      'Design Thinker',
      'Problem Solver'
    ];
    let pi = 0, ci = 0, deleting = false;

    function typeLoop() {
      const phrase = phrases[pi];
      if (!deleting) {
        typed.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        typed.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 60 : 90);
    }
    typeLoop();
  }

  // ── BACK TO TOP ──────────────────────────
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.opacity = window.scrollY > 500 ? '1' : '0';
      backTop.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log('✨ Portfolio loaded — Fatema Kazi');
});
