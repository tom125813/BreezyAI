// Toggle mobile nav
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Handle Google OAuth login
const googleLoginBtn = document.getElementById('google-login-btn');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  });
}

// Handle login form submission (normal email/password)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Simulate login process (replace with server authentication call)
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password');
    }
  });
}

// Redirect to dashboard if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  window.location.href = 'dashboard.html';
}


// Handle signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    // Real app: Create account, get token, etc.
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'dashboard.html';
  });
}

// If user is logged in, show dashboard link
/*if (localStorage.getItem('isLoggedIn') === 'true') {
  const dashLink = document.querySelector('.dashboard-link');
  if (dashLink) dashLink.style.display = 'inline-block';
}*/

// Toggle overlays on button click
const notificationsBtn = document.querySelector('.notifications-btn');
const messagesBtn = document.querySelector('.messages-btn');
const notificationsOverlay = document.getElementById('notificationsOverlay');
const messagesOverlay = document.getElementById('messagesOverlay');

if (notificationsBtn) {
  notificationsBtn.addEventListener('click', () => {
    notificationsOverlay.style.display =
      notificationsOverlay.style.display === 'block' ? 'none' : 'block';
    messagesOverlay.style.display = 'none';
  });
}
if (messagesBtn) {
  messagesBtn.addEventListener('click', () => {
    messagesOverlay.style.display =
      messagesOverlay.style.display === 'block' ? 'none' : 'block';
    notificationsOverlay.style.display = 'none';
  });
}

const creditBalance = document.getElementById('creditBalance');
const purchaseModal = document.getElementById('purchaseModal');
const closePurchaseModal = document.getElementById('closePurchaseModal');

if (creditBalance) {
  creditBalance.addEventListener('click', () => {
    purchaseModal.style.display = 'block';
  });
}
if (closePurchaseModal) {
  closePurchaseModal.addEventListener('click', () => {
    purchaseModal.style.display = 'none';
  });
}
window.addEventListener('click', e => {
  if (e.target === purchaseModal) {
    purchaseModal.style.display = 'none';
  }
});

const configForm = document.querySelector('.config-form');
if (configForm) {
  configForm.addEventListener('submit', e => {
    e.preventDefault();
    // get form fields
    const brandTone = document.getElementById('brandTone').value;
    const replyDelay = document.getElementById('replyDelay').value;
    // etc.
    // store them or send to server
    alert('Configuration saved!');
  });
}
