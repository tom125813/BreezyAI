// main.js

document.addEventListener('DOMContentLoaded', () => {

  // --- Existing Code ---

  // Function to check user authentication
  // todo: use secure cookies to check.
  function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // If the user is not logged in, redirect to the login page
      //console.log("checkauth: not logged in");
      //window.location.href = '../login.html';
    }
  }

  // Call checkAuth on page load
  checkAuth();

  // Function to load HTML components (Sidebar and Topbar)
  function loadComponent(id, url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (id === 'sidebar-placeholder') {
          initializeSidebar();
        } else if (id === 'topbar-placeholder') {
          initializeTopbar();
        }
      })
      .catch(error => console.error('Error loading component:', error));
  }

  // Load Sidebar and Topbar
  loadComponent('sidebar-placeholder', 'components/sidebar.html');
  loadComponent('topbar-placeholder', 'components/topbar.html');

  // Initialize Sidebar Navigation
  function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const logoutBtn = document.getElementById('logoutBtn');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Mapping between data-target and corresponding HTML files
    const sectionToFile = {
      'dashboardSection': 'index.html',
      'messagesSection': 'messages.html',
      'analyticsSection': 'analytics.html',
      'configurationSection': 'configuration.html',
      'accountSection': 'account.html',
      'purchaseSection': 'purchase.html',
      'helpSection': 'help.html',
      'feedbackSection': 'feedback.html',
      'settingsSection': 'settings.html'
    };

    // Function to remove 'active' class from all sidebar items
    function removeActiveClasses() {
      sidebarItems.forEach(item => {
        item.classList.remove('active');
      });
    }

    // Function to set 'active' class based on current URL
    function setActiveSidebarItem() {
      const currentPage = window.location.pathname.split('/').pop(); // e.g., 'messages.html'
      sidebarItems.forEach(item => {
        const target = item.getAttribute('data-target');
        const targetPage = sectionToFile[target];
        if (targetPage === currentPage) {
          item.classList.add('active');
        }
      });
    }

    // Add click event listeners to sidebar items
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        removeActiveClasses();
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        navigateTo(targetId);
      });
    });

    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Clear any authentication tokens or user data here
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../login.html';
      });
    }

    // Hamburger Menu for mobile navigation
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.id = 'hamburger';
    hamburger.innerHTML = `
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    `;
    document.body.appendChild(hamburger);

    const sidebar = document.querySelector('.sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');

    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      hamburger.classList.toggle('active');
      dashboardMain.classList.toggle('active');
    });

    // Close sidebar when a link is clicked (for mobile)
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          hamburger.classList.remove('active');
          dashboardMain.classList.remove('active');
        }
      });
    });

    // Set active sidebar item based on current page
    setActiveSidebarItem();

    // Initialize Theme Toggle Button
    initializeThemeToggle(themeToggleBtn);
  }

  // Initialize Topbar Interactions
  function initializeTopbar() {
    const creditBalance = document.querySelector('.credit-balance');
    if (creditBalance) {
      creditBalance.addEventListener('click', () => {
        navigateTo('purchaseSection');
      });
    }
  }

  // Navigation Function
  function navigateTo(targetId) {
    // Redirect to the corresponding HTML page
    const sectionToFile = {
      'dashboardSection': 'index.html',
      'messagesSection': 'messages.html',
      'analyticsSection': 'analytics.html',
      'configurationSection': 'configuration.html',
      'accountSection': 'account.html',
      'purchaseSection': 'purchase.html',
      'helpSection': 'help.html',
      'feedbackSection': 'feedback.html',
      'settingsSection': 'settings.html'
    };

    const targetPage = sectionToFile[targetId] || 'index.html';
    window.location.href = targetPage;
  }

  // Logout function (can be called anywhere)
  function logout() {
    //localStorage.removeItem('isLoggedIn');
    //console.log("logout: not logged in");
    //window.location.href = '../login.html';
  }

  // Expose logout function to window so it can be used globally
  window.logout = logout;

  // --- Start of Dark Mode Script ---

  // Function to initialize theme toggle
  function initializeThemeToggle(toggleButton) {
    if (!toggleButton) return;

    // Function to set the initial theme based on localStorage or system preference
    function setInitialTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
        updateToggleIcon(savedTheme);
      } else {
        // Optional: Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark-mode', prefersDark);
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        updateToggleIcon(prefersDark ? 'dark' : 'light');
      }
    }

    // Function to update toggle button icon
    function updateToggleIcon(theme) {
      const icon = toggleButton.querySelector('i');
      const text = toggleButton.querySelector('span');

      if (theme === 'dark') {
        // Switch to light mode (show sun icon and 'Light Mode' text)
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Light Mode';
      } else {
        // Switch to dark mode (show moon icon and 'Dark Mode' text)
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = 'Dark Mode';
      }
    }

    // Set the initial theme
    setInitialTheme();

    // Event listener for toggle button
    toggleButton.addEventListener('click', () => {
      const isDarkMode = document.documentElement.classList.toggle('dark-mode');
      const theme = isDarkMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      updateToggleIcon(theme);
    });
  }

  // --- End of Dark Mode Script ---
});
