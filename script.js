/**
 * Indian Raw Goods Export
 * Main JavaScript File
 */

// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 50
  });
  
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function() {
      navMobile.classList.toggle('show');
    });
  }
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc3545';
        } else {
          field.style.borderColor = '';
        }
      });
      
      // Email validation
      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderColor = '#dc3545';
        }
      }
      
      if (isValid) {
        // In a real implementation, you would send the form data to a server
        // For now, we'll simulate a successful submission
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API request
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Reset field borders
          requiredFields.forEach(field => {
            field.style.borderColor = '';
          });
          
          // Show success message
          if (formSuccess) {
            formSuccess.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              formSuccess.style.display = 'none';
            }, 5000);
          }
          
          // Reset button
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          // Hide error message if visible
          if (formError) {
            formError.style.display = 'none';
          }
        }, 1500);
      } else {
        // Show error message
        if (formError) {
          formError.style.display = 'block';
        }
      }
    });
  }
  
  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  
  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const emailField = newsletterForm.querySelector('#email');
      const consentField = newsletterForm.querySelector('#consent');
      
      if (!emailField.value.trim() || !consentField.checked) {
        isValid = false;
      }
      
      if (emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
        }
      }
      
      if (isValid) {
        // Simulate submission
        newsletterForm.reset();
        newsletterSuccess.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          newsletterSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }
  
  // Scroll Animation for elements with slide-in class
  function checkScrollAnimation() {
    const elements = document.querySelectorAll('.slide-in');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Check if element is in viewport
      if (position.top < window.innerHeight - 100) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkScrollAnimation);
  window.addEventListener('load', checkScrollAnimation);
  
  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide back to top button based on scroll position
    function toggleBackToTopButton() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
    
    // Scroll to top when back to top button is clicked
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    window.addEventListener('scroll', toggleBackToTopButton);
    // Initial check
    toggleBackToTopButton();
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMobile && navMobile.classList.contains('show')) {
          navMobile.classList.remove('show');
        }
      }
    });
  });
  
  // Product Filtering (for product pages)
  const filterButtons = document.querySelectorAll('.filter-button');
  const productItems = document.querySelectorAll('.product-item');
  
  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        productItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Image Lightbox (for product detail pages)
  const productImages = document.querySelectorAll('.product-image-thumbnail');
  const mainProductImage = document.querySelector('.product-main-image');
  
  if (productImages.length > 0 && mainProductImage) {
    productImages.forEach(image => {
      image.addEventListener('click', () => {
        // Update main image src
        mainProductImage.src = image.src;
        
        // Remove active class from all thumbnails
        productImages.forEach(img => img.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        image.classList.add('active');
      });
    });
  }
  
  // Product Quantity Input
  const quantityInput = document.querySelector('.quantity-input');
  const quantityPlus = document.querySelector('.quantity-plus');
  const quantityMinus = document.querySelector('.quantity-minus');
  
  if (quantityInput && quantityPlus && quantityMinus) {
    quantityPlus.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      value = isNaN(value) ? 0 : value;
      value++;
      quantityInput.value = value;
    });
    
    quantityMinus.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      value = isNaN(value) ? 0 : value;
      value = value > 1 ? value - 1 : 1;
      quantityInput.value = value;
    });
  }
});
