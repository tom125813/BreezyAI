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
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

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

  // Agent cost: assume $1 per message
  const agentCost = messages * 0.50;

  // AI cost: piecewise logic or tiered. Example:
  //  up to 500 => $0.10 each
  //  501 - 1000 => $0.09 each
  //  1001 - 3000 => $0.08 each
  //  3001 - 5000 => $0.07 each
  //  5001 - 10000 => $0.06 each
  //  >10000 => $0.05 each
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
