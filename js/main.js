/* ═══════════════════════════════════════════════
   EXAME EM CASA — main.js
   Sticky header · Mobile menu · Scroll animations
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM refs ─── */
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const reveals   = document.querySelectorAll('.reveal');

  /* ─── Sticky header on scroll ─── */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ─── Mobile hamburger menu ─── */
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ─── Active nav highlight based on scroll position ─── */
  function highlightActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    allLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ─── Scroll reveal via IntersectionObserver ─── */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger sibling reveals within the same parent
            const siblings = entry.target.parentElement
              ? Array.from(entry.target.parentElement.querySelectorAll('.reveal'))
              : [];
            const index = siblings.indexOf(entry.target);
            const delay = Math.min(index * 80, 400); // cap at 400ms

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);

            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─── Service cards stagger on scroll ─── */
  const serviceCards = document.querySelectorAll('.service-card');
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const cards = Array.from(serviceCards);
            const index = cards.indexOf(entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, index * 90);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    serviceCards.forEach(function (card) {
      card.classList.add('reveal');
      cardObserver.observe(card);
    });
  }

  /* ─── Step cards stagger ─── */
  const steps = document.querySelectorAll('.step');
  if ('IntersectionObserver' in window) {
    const stepObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const allSteps = Array.from(steps);
            const index = allSteps.indexOf(entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, index * 120);
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    steps.forEach(function (step) {
      step.classList.add('reveal');
      stepObserver.observe(step);
    });
  }

  /* ─── Hours cards stagger ─── */
  const hoursCards = document.querySelectorAll('.hours-card');
  if ('IntersectionObserver' in window) {
    const hoursObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const allCards = Array.from(hoursCards);
            const index = allCards.indexOf(entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, index * 120);
            hoursObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    hoursCards.forEach(function (card) {
      card.classList.add('reveal');
      hoursObserver.observe(card);
    });
  }

  /* ─── WhatsApp float tooltip on mobile tap ─── */
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    waFloat.addEventListener('mouseenter', function () {
      waFloat.querySelector('.whatsapp-tooltip').style.opacity = '1';
    });
  }

  /* ─── Typing effect for hero title (subtle word highlight) ─── */
  // Add entrance class once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.style.visibility = 'visible';
    }
  });

})();
