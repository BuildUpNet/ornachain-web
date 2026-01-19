// ========================================
// OrnaChain Jewellery Store - Custom JavaScript
// ========================================

'use strict';

// ========================================
// Sticky Navbar on Scroll
// ========================================
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled', 'shadow-sm');
  } else {
    navbar.classList.remove('scrolled', 'shadow-sm');
  }
});

// ========================================
// Scroll to Top Button
// ========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn?.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// ========================================
// Mobile Menu Dropdown Toggle
// ========================================
document.querySelectorAll('[data-toggle="submenu"]').forEach((item) => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const submenu = this.nextElementSibling;
    const icon = this.querySelector('.dropdown-icon');

    if (submenu.classList.contains('show')) {
      submenu.classList.remove('show');
      icon.classList.remove('rotated');
    } else {
      document.querySelectorAll('.mobile-submenu.show').forEach((menu) => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.dropdown-icon.rotated').forEach((ic) => {
        ic.classList.remove('rotated');
      });

      submenu.classList.add('show');
      icon.classList.add('rotated');
    }
  });
});

// ========================================
// Auto-close Mobile Menu on Link Click
// ========================================
const mobileMenuLinks = document.querySelectorAll('#mobileMenu a:not([data-toggle="submenu"])');
const mobileMenuElement = document.getElementById('mobileMenu');

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', function () {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileMenuElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  });
});

// ========================================
// Product Wishlist Toggle
// ========================================
const wishlistButtons = document.querySelectorAll('.product-overlay .btn-white:first-child');

wishlistButtons.forEach((button) => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const icon = this.querySelector('i');

    if (icon.classList.contains('fa-regular')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      this.classList.add('text-danger');
      showToast('Added to wishlist');
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
      this.classList.remove('text-danger');
      showToast('Removed from wishlist');
    }
  });
});

// ========================================
// Simple Toast Notification
// ========================================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '9999';
  toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-body bg-dark text-white rounded">
                ${message}
            </div>
        </div>
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// ========================================
// Search Modal Focus
// ========================================
const searchModal = document.getElementById('searchModal');
searchModal?.addEventListener('shown.bs.modal', function () {
  const searchInput = this.querySelector('input');
  searchInput?.focus();
});

// ========================================
// Newsletter Form Submission
// ========================================
const newsletterForm = document.querySelector('.newsletter-section form');
newsletterForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const email = emailInput?.value;

  if (email && validateEmail(email)) {
    showToast('Thank you for subscribing!');
    emailInput.value = '';
  } else {
    showToast('Please enter a valid email');
  }
});

// ========================================
// Email Validation
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// Initialize Bootstrap Carousel
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: 'carousel',
      wrap: true,
      keyboard: true,
      pause: 'hover',
    });
  }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// ========================================
// Product Quick View (Placeholder)
// ========================================
const quickViewButtons = document.querySelectorAll('.product-overlay .btn-white:last-child');

quickViewButtons.forEach((button) => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Quick view coming soon!');
  });
});

// ========================================
// Initialize Bootstrap Tooltips
// ========================================
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ========================================
// Console Log
// ========================================
console.log('%c OrnaChain Jewellery Store ', 'background: #ce967e; color: white; font-size: 20px; padding: 10px;');
console.log('Website initialized successfully!');
