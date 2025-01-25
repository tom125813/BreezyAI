document.addEventListener('DOMContentLoaded', () => {

  // Function to load HTML components
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

    // Mapping between data-target and corresponding HTML files
    const sectionToFile = {
      'dashboardSection': 'index.html',
      'messagesSection': 'messages.html',
      'analyticsSection': 'analytics.html',
      'configurationSection': 'configuration.html',
      'accountSection': 'account.html',
      'purchaseSection': 'purchase.html',
      'helpSection': 'help.html',
      'feedbackSection': 'feedback.html'
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
        window.location.href = 'login.html';
      });
    }

    // Hamburger Menu
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
    switch (targetId) {
      case 'dashboardSection':
        window.location.href = 'index.html';
        break;
      case 'messagesSection':
        window.location.href = 'messages.html';
        break;
      case 'analyticsSection':
        window.location.href = 'analytics.html';
        break;
      case 'configurationSection':
        window.location.href = 'configuration.html';
        break;
      case 'accountSection':
        window.location.href = 'account.html';
        break;
      case 'purchaseSection':
        window.location.href = 'purchase.html';
        break;
      case 'helpSection':
        window.location.href = 'help.html';
        break;
      case 'feedbackSection':
        window.location.href = 'feedback.html';
        break;
      default:
        window.location.href = 'index.html';
    }
  }
});
