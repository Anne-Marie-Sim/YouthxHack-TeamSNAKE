function checkAccountSession() {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPage = window.location.pathname.split("/").pop();
  
    if (user) {
      // Populate the navbar with the user's name and the correct dashboard link
      const navbarLinks = document.getElementById("navbar-links");
      if (navbarLinks) {
        navbarLinks.innerHTML += `
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === dashboardLink ? 'active' : ''}" href="${dashboardLink}">${user.firstname}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'resources.html' ? 'active' : ''}" href="resources.html">Resources</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'forum.html' ? 'active' : ''}" href="forum.html">Forum</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'credit.html' ? 'active' : ''}" href="credits.html">Credits</a>
          </li>
        `;
      }
  
    } else {
      // Populate the navbar for non-logged-in users
      const navbarLinks = document.getElementById("navbar-links");
      if (navbarLinks) {
        navbarLinks.innerHTML = `
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'login.html' ? 'active' : ''}" href="login.html">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'resources.html' ? 'active' : ''}" href="resources.html">Resources</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'forum.html' ? 'active' : ''}" href="forum.html">Forum</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'credit.html' ? 'active' : ''}" href="credits.html">Credits</a>
          </li>
        `;
      }
    }
  }
  
  // Call the function to check account session and populate details
  checkAccountSession();
