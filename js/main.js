/* ============================================
   ÉTOILE - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Navigation scroll effect
  const nav = document.querySelector('.nav');
  
  // Hide on Scroll - Variablen
  let lastScrollY = 0;
  let ticking = false;
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Grundlegende scroll Klasse (für Hintergrund)
    if (currentScrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Hide on Scroll Logik
    if (currentScrollY > 0) {
      if (currentScrollY > lastScrollY) {
        // Nach unten scrollen → Navbar ausblenden
        nav.classList.add('hidden');
      } else {
        // Nach oben scrollen → Navbar einblenden
        nav.classList.remove('hidden');
      }
    } else {
      // Ganz oben → Navbar immer sichtbar
      nav.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
  handleScroll();
  
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close mobile nav when clicking a link
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Scroll animations - Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    fadeElements.forEach(el => {
      fadeObserver.observe(el);
    });
  }
  
  // Testimonial slider (simple version)
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  if (testimonialItems.length > 1) {
    let currentTestimonial = 0;
    
    // Hide all except first
    testimonialItems.forEach((item, index) => {
      if (index !== 0) {
        item.style.display = 'none';
      }
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      testimonialItems[currentTestimonial].style.display = 'none';
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      testimonialItems[currentTestimonial].style.display = 'block';
      testimonialItems[currentTestimonial].style.opacity = '0';
      
      // Fade in effect
      let opacity = 0;
      const fadeIn = setInterval(() => {
        if (opacity < 1) {
          opacity += 0.1;
          testimonialItems[currentTestimonial].style.opacity = opacity;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }, 5000);
  }
  
  // Form validation and submission
  const reservationForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');
  
  function handleFormSubmit(form) {
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ff4444';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
        return;
      }
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Log data (in production, send to server)
      console.log('Form submitted:', data);
      
      // Show success message
      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Gesendet!';
      btn.style.backgroundColor = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      btn.style.color = '#fff';
      
      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset();
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 3000);
    });
  }
  
  handleFormSubmit(reservationForm);
  handleFormSubmit(contactForm);
  
  // Clear error styling on input
  const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = '';
    });
  });
  
  // Gallery lightbox (simple version)
  const galleryItems = document.querySelectorAll('.gallery-item, .gallery-masonry-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        // In production, implement a full lightbox
        // For now, open image in new tab
        window.open(img.src, '_blank');
      }
    });
  });
  
  // Navbar link active state based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-links a');
  
  navLinksAll.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});