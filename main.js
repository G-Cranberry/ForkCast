// ==========================================
// FORKCAST - SHARED JAVASCRIPT (main.js)
// ==========================================

// ---- Theme Initialization ----
(function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

// ---- Sidebar Toggle ----
(function () {
  const toggle = document.getElementById('menu-toggle');
  const appWrap = document.querySelector('.app-wrap');
  if (!toggle || !appWrap) return;

  toggle.addEventListener('click', () => {
    appWrap.classList.toggle('menu-active');
  });

  document.addEventListener('click', (e) => {
    if (appWrap.classList.contains('menu-active') &&
      !toggle.contains(e.target) &&
      !document.getElementById('sidebar').contains(e.target)) {
      appWrap.classList.remove('menu-active');
    }
  });
})();


// ---- Rainbow Cursor Trail ----
(function () {
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
(function () {
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

  const voiceBtn = document.getElementById('voice-search-btn');
  const scanBtn = document.getElementById('scan-search-btn');

  window.startVoiceSearch = function (inputElement, onSearchCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    let voiceOverlay = document.getElementById('voice-modal');
    if (!voiceOverlay) {
      voiceOverlay = document.createElement('div');
      voiceOverlay.id = 'voice-modal';
      voiceOverlay.className = 'voice-modal-overlay';
      voiceOverlay.innerHTML = `
        <div class="voice-modal-content">
          <span class="voice-close" id="voice-close-btn">&times;</span>
          <div class="voice-mic-icon">🎤</div>
          <div class="voice-status" id="voice-status-text">Listening...</div>
          <div class="voice-text" id="voice-text-output">Speak now...</div>
        </div>
      `;
      document.body.appendChild(voiceOverlay);
    }

    const voiceTextOutput = document.getElementById('voice-text-output');
    const voiceStatus = document.getElementById('voice-status-text');
    const voiceCloseBtn = document.getElementById('voice-close-btn');

    voiceOverlay.classList.add('active');
    voiceTextOutput.textContent = "Speak now...";
    voiceStatus.textContent = "Listening...";

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = '';

    recognition.onstart = () => { voiceStatus.textContent = "Listening..."; };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      const combined = finalTranscript + interimTranscript;
      voiceTextOutput.textContent = combined;
      if (inputElement) inputElement.value = combined.trim();
    };

    recognition.onerror = (event) => {
      switch (event.error) {
        case 'not-allowed': voiceStatus.textContent = "Microphone permission denied"; break;
        case 'no-speech': voiceStatus.textContent = "No speech detected"; break;
        case 'audio-capture': voiceStatus.textContent = "Microphone not found"; break;
        default: voiceStatus.textContent = "Voice recognition error";
      }
      setTimeout(() => { voiceOverlay.classList.remove('active'); }, 2000);
    };

    recognition.onend = () => {
      voiceStatus.textContent = "Processing...";
      setTimeout(() => {
        voiceOverlay.classList.remove('active');
        if (finalTranscript.trim()) {
          if (inputElement) inputElement.value = finalTranscript.trim();
          if (onSearchCallback) onSearchCallback();
        }
      }, 700);
    };

    voiceCloseBtn.onclick = () => {
      recognition.stop();
      voiceOverlay.classList.remove('active');
    };

    recognition.start();
  };

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      window.startVoiceSearch(input, doSearch);
    });
  }

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      window.location.href = 'scanner.html';
    });
  }
})();

// ============================================================
// AUTH — Firebase se user data read karta hai
// ============================================================
const Auth = {
  getUser() {
    const u = localStorage.getItem('forkcast_user');
    return u ? JSON.parse(u) : null;
  },
  setUser(data) {
    localStorage.setItem('forkcast_user', JSON.stringify(data));
  },
  logout() {
    localStorage.removeItem('forkcast_user');
    if (window._auth && window._signOut) {
      window._signOut(window._auth).finally(() => {
        window.location.replace('login.html?logout=1');
      });
    } else {
      window.location.replace('login.html?logout=1');
    }
  },
  isLoggedIn() {
    return !!localStorage.getItem('forkcast_user');
  }
};

// Protected pages — agar login nahi hai toh login pe bhejo
const publicPages = ['signup.html', 'login.html', 'index.html'];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
if (!publicPages.includes(currentPage) && !Auth.isLoggedIn()) {
  window.location.replace('login.html');
}

// ---- Dynamic Navigation & Header ----
function updateNav() {
  const nav = document.querySelector('.sidebar-nav');
  const user = Auth.getUser();

  if (nav) {
    let navHTML = `
      <a href="home.html" class="nav-item"><span class="nav-icon">🏠</span> Home</a>
      <a href="recipes.html" class="nav-item"><span class="nav-icon">🍽️</span> Recipes</a>
      <a href="planner.html" class="nav-item"><span class="nav-icon">📅</span> Weekly Planner</a>
      <a href="grocery.html" class="nav-item"><span class="nav-icon">🛒</span> Grocery List</a>
      <a href="search.html" class="nav-item"><span class="nav-icon">🔍</span> Smart Search</a>
      <a href="scanner.html" class="nav-item"><span class="nav-icon">📷</span> Fridge Scanner</a>
    `;

    if (user) {
      navHTML += `<a href="profile.html" class="nav-item"><span class="nav-icon">👤</span> Profile</a>`;
      navHTML += `<a href="#" id="logout-btn" class="nav-item"><span class="nav-icon">🚪</span> Logout</a>`;
    } else {
      navHTML += `<a href="login.html" class="nav-item"><span class="nav-icon">🔑</span> Sign In</a>`;
    }

    nav.innerHTML = navHTML;
  }

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    let topRight = topbar.querySelector('.topbar-right');
    if (!topRight) {
      topRight = document.createElement('div');
      topRight.className = 'topbar-right';
      topbar.appendChild(topRight);
    }

    let authHTML = '';
    if (user) {
      authHTML = `
        <a href="profile.html" class="profile-icon-link" title="View Profile">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}" alt="Profile">
        </a>
      `;
    } else {
      authHTML = `
        <a href="login.html" class="btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">Sign In</a>
      `;
    }

    const isDark = document.body.classList.contains('dark-mode');
    const themeToggleHTML = `
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Theme" style="font-size: 1.5rem; background: none; border: none; cursor: pointer; transition: transform 0.2s;">
        ${isDark ? '☀️' : '🌙'}
      </button>
    `;

    topRight.innerHTML = themeToggleHTML + authHTML;

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const dark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        themeToggleBtn.innerHTML = dark ? '☀️' : '🌙';
        window.dispatchEvent(new Event('themeChanged'));
      });
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
