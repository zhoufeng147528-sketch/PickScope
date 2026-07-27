/**
 * PickScope - Main JavaScript
 * Handles: navigation, mobile menu, scroll animations, form validation
 */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // Mobile Menu Toggle
  // ============================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================================
  // Navbar Scroll Effect
  // ============================================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================================
  // Scroll-triggered Fade-in Animation
  // ============================================================
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============================================================
  // Contact Form Validation
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Name
      const name = document.getElementById('name');
      const nameError = document.getElementById('name-error');
      if (name && name.value.trim().length < 2) {
        showError(name, nameError, 'Please enter your name (at least 2 characters).');
        isValid = false;
      } else if (name) {
        hideError(name, nameError);
      }

      // Email
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid email address.');
        isValid = false;
      } else if (email) {
        hideError(email, emailError);
      }

      // Subject
      const subject = document.getElementById('subject');
      const subjectError = document.getElementById('subject-error');
      if (subject && subject.value.trim().length < 2) {
        showError(subject, subjectError, 'Please enter a subject.');
        isValid = false;
      } else if (subject) {
        hideError(subject, subjectError);
      }

      // Message
      const message = document.getElementById('message');
      const messageError = document.getElementById('message-error');
      if (message && message.value.trim().length < 10) {
        showError(message, messageError, 'Please enter a message (at least 10 characters).');
        isValid = false;
      } else if (message) {
        hideError(message, messageError);
      }

      if (isValid) {
        // Show success (static site — no backend)
        const formSuccess = document.querySelector('.form-success');
        if (formSuccess) {
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
        }
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        const errorEl = document.getElementById(field.id + '-error');
        if (errorEl) {
          hideError(field, errorEl);
        }
      });
    });
  }

  function showError(field, errorEl, message) {
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    if (field) {
      field.style.borderColor = 'var(--color-danger)';
    }
  }

  function hideError(field, errorEl) {
    if (errorEl) {
      errorEl.style.display = 'none';
    }
    if (field) {
      field.style.borderColor = '';
    }
  }

  // ============================================================
  // Newsletter Form (simple)
  // ============================================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(emailInput.value.trim())) {
          emailInput.value = '';
          emailInput.placeholder = 'Subscribed! Thank you.';
          setTimeout(function () {
            emailInput.placeholder = 'Your email address';
          }, 3000);
        }
      }
    });
  }

  // ============================================================
  // Current Year (for copyright)
  // ============================================================
  const yearEls = document.querySelectorAll('#current-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
