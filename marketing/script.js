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

// Grab necessary elements
const msgSlider = document.getElementById('msgSlider');
const msgCountEl = document.getElementById('msgCount');
const agentCostEl = document.getElementById('agentCost');
const aiCostEl = document.getElementById('aiCost');
const savingsEl = document.getElementById('savingsVal');

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

  // Agent cost: assume $0.50 per message
  const agentCost = messages * 0.50;

  // AI cost: piecewise logic or tiered
  const aiCost = calculateAICost(messages);

  // Update DOM
  agentCostEl.textContent = agentCost.toFixed(2);
  aiCostEl.textContent = aiCost.toFixed(2);
  savingsEl.textContent = (agentCost - aiCost).toFixed(2);
}

// Example function for AI cost
function calculateAICost(messages) {
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
