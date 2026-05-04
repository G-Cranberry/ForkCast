// ==========================================
// FORKCAST - SHARED JAVASCRIPT (main.js)
// ==========================================

// ---- Sidebar Toggle ----
(function() {
  const toggle = document.getElementById('menu-toggle');
  const appWrap = document.querySelector('.app-wrap');
  if (!toggle || !appWrap) return;

  toggle.addEventListener('click', () => {
    appWrap.classList.toggle('menu-active');
  });

  // Close sidebar when clicking outside (optional but good UX)
  document.addEventListener('click', (e) => {
    if (appWrap.classList.contains('menu-active') && 
        !toggle.contains(e.target) && 
        !document.getElementById('sidebar').contains(e.target)) {
      appWrap.classList.remove('menu-active');
    }
  });
})();


// ---- Rainbow Cursor Trail ----
(function() {
  const canvas = document.getElementById('rainbow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let trails = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    trails.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (trails.length > 60) trails.shift();
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trails.forEach((p, i) => {
      const hue = (p.age * 6 + i * 3) % 360;
      const size = Math.max(0, 11 - p.age * 0.22);
      const alpha = Math.max(0, 1 - p.age * 0.045);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue},100%,68%,${alpha})`;
      ctx.fill();
      p.age++;
    });
    trails = trails.filter(p => p.age < 55);
    requestAnimationFrame(animate);
  }
  animate();
})();

// ---- Active Sidebar Link ----
function updateActiveLink() {
  const page = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'home.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
updateActiveLink();

// ---- Global Search Bar ----
(function() {
  const input = document.getElementById('global-search-input');
  const btn = document.getElementById('global-search-btn');
  if (!input || !btn) return;

  function doSearch() {
    const q = input.value.trim();
    if (q.length > 0) {
      window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    }
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

  // Advanced Search Actions
  const voiceBtn = document.getElementById('voice-search-btn');
  const scanBtn = document.getElementById('scan-search-btn');

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (!('webkitSpeechRecognition' in window)) {
        alert("Voice recognition not supported in this browser.");
        return;
      }
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      voiceBtn.style.color = 'var(--accent2)';
      
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        input.value = result;
        voiceBtn.style.color = '';
        doSearch();
      };
      recognition.onerror = () => {
        voiceBtn.style.color = '';
      };
    });
  }

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // Simulate scanning
          alert("Scanning ingredients from " + file.name + "...");
          setTimeout(() => {
            input.value = "Tomato, Onion, Paneer"; // Simulated result
            doSearch();
          }, 1500);
        }
      };
      fileInput.click();
    });
  }
})();

// ---- Authentication Logic (Dummy) ----
const Auth = {
  getUser: () => JSON.parse(localStorage.getItem('forkcast_user')),
  setUser: (user) => localStorage.setItem('forkcast_user', JSON.stringify(user)),
  logout: () => {
    localStorage.removeItem('forkcast_user');
    window.location.href = 'index.html';
  },
  isLoggedIn: () => !!localStorage.getItem('forkcast_user')
};

// ---- Dynamic Navigation & Header ----
function updateNav() {
  const nav = document.querySelector('.sidebar-nav');
  const user = Auth.getUser();
  
  // 1. Sidebar update
  if (nav) {
    let navHTML = `
      <a href="home.html" class="nav-item"><span class="nav-icon">🏠</span> Home</a>
      <a href="recipes.html" class="nav-item"><span class="nav-icon">🍽️</span> Recipes</a>
      <a href="planner.html" class="nav-item"><span class="nav-icon">📅</span> Weekly Planner</a>
      <a href="grocery.html" class="nav-item"><span class="nav-icon">🛒</span> Grocery List</a>
      <a href="search.html" class="nav-item"><span class="nav-icon">🔍</span> Smart Search</a>
    `;

    if (user) {
      navHTML += `<a href="profile.html" class="nav-item"><span class="nav-icon">👤</span> Profile</a>`;
      navHTML += `<a href="#" id="logout-btn" class="nav-item"><span class="nav-icon">🚪</span> Logout</a>`;
    } else {
      navHTML += `<a href="login.html" class="nav-item"><span class="nav-icon">🔑</span> Sign In</a>`;
    }

    nav.innerHTML = navHTML;
  }

  // 2. Topbar right update (Profile icon)
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    let topRight = topbar.querySelector('.topbar-right');
    if (!topRight) {
      topRight = document.createElement('div');
      topRight.className = 'topbar-right';
      topbar.appendChild(topRight);
    }

    if (user) {
      topRight.innerHTML = `
        <a href="profile.html" class="profile-icon-link" title="View Profile">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}" alt="Profile">
        </a>
      `;
    } else {
      topRight.innerHTML = `
        <a href="login.html" class="btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">Sign In</a>
      `;
    }
  }

  updateActiveLink();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }
}

document.addEventListener('DOMContentLoaded', updateNav);

// ---- Utility: render recipe cards ----
function renderRecipeCards(recipes, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;">No recipes found. Try a different ingredient!</p>';
    return;
  }
  container.innerHTML = recipes.map(r => `
    <div class="recipe-card fade-up" onclick="window.location.href='recipe-detail.html?id=${r.id}'">
      <div style="position:relative; overflow:hidden;">
        <img src="${r.img}" alt="${r.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'">
      </div>
      <div class="recipe-card-body">
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="tag">${r.category}</span>
          <span style="font-size:0.75rem; color:var(--muted); font-weight:600;">⏱️ ${r.time}</span>
        </div>
      </div>
    </div>
  `).join('');
}
