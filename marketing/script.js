// LOADING OVERLAY - Simple demonstration
window.addEventListener('load', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none'; // Hide overlay once page fully loads
  }
});


// MOBILE NAV
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const mobileFooter = navLinks.querySelector('.mobile-footer');
const body = document.body;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show', isActive);
    mobileFooter.classList.toggle('show', isActive);
    body.classList.toggle('menu-open', isActive); // Toggle scrolling
  });
}

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    mobileFooter.classList.remove('show');
    body.classList.remove('menu-open');
  });
});

// Reset mobile menu state on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    mobileFooter.classList.remove('show');
    body.classList.remove('menu-open');
  }
});

// FADE-IN ON SCROLL
const faders = document.querySelectorAll('.fade-in-on-scroll');
const options = {
  threshold: 0.1,
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(fader => {
  observer.observe(fader);
});

const msgSlider = document.getElementById('msgSlider');
const msgCountEl = document.getElementById('msgCount');
const manualCostEl = document.getElementById('manualCost');
const breezyCostEl = document.getElementById('breezyCost');
const savingsEl = document.getElementById('savings');

// On page load, and whenever the slider changes, recalc costs
function init() {
  updateCosts();
  msgSlider.addEventListener('input', updateCosts);
}

// Updates all displayed values based on slider
function updateCosts() {
  const messages = parseInt(msgSlider.value, 10);
  // Display messages count
  msgCountEl.textContent = messages;

  // Manual cost: assume $0.50 per message
  const manualCost = messages * 0.50;

  // Breezy cost: piecewise logic or tiered
  const breezyCost = calculateBreezyCost(messages);

  // Update DOM
  manualCostEl.textContent = manualCost.toFixed(2);
  breezyCostEl.textContent = breezyCost.toFixed(2);
  savingsEl.textContent = (manualCost - breezyCost).toFixed(2);
}

// Function for Breezy cost
function calculateBreezyCost(messages) {
  let rate = 0.1; // default up to 500
  if (messages > 500 && messages <= 1000) {
    rate = 0.09;
  } else if (messages > 1000 && messages <= 3000) {
    rate = 0.08;
  } else if (messages > 3000 && messages <= 5000) {
    rate = 0.07;
  } else if (messages > 5000 && messages <= 10000) {
    rate = 0.06;
  } else if (messages > 10000) {
    rate = 0.05;
  }
  return messages * rate;
}

// Initialize
init();

// FAQ TOGGLE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
  const helpItems = document.querySelectorAll('.help-item');

  helpItems.forEach(item => {
    // Make the entire help-item focusable for accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-expanded', 'false');

    // Click Event Listener
    item.addEventListener('click', (e) => {
      // Prevent triggering if clicking a link inside
      if (e.target.tagName === 'A') return;

      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      helpItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle the clicked item
      if (!isActive) {
        item.classList.add('active');
        item.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard Accessibility: Toggle on Enter or Space key
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });
});
