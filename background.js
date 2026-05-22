// ===================================================
// PREMIUM CUSTOM LERP CURSOR & NATIVE SWITCH SYSTEM
// ===================================================
const cursorDot = document.getElementById('custom-cursor-dot');
const cursorRing = document.getElementById('custom-cursor-ring');

let mouseX = -100;
let mouseY = -100;
let dotX = -100;
let dotY = -100;
let ringX = -100;
let ringY = -100;
let hasMoved = false;
let isHoveringInteractive = false;

// Track mouse position globally for canvas particle physics
const mouse = {
  x: null,
  y: null,
  radius: 175 // Attraction proximity
};

// Unified cursor toggle handler
function handleCursorToggle(target) {
  if (!cursorRing || !cursorDot) return;
  // Check if cursor is over interactive elements
  const onCardOrInteractive = target.closest('.auth-card') || 
                              target.closest('a') || 
                              target.closest('button') || 
                              target.closest('input') || 
                              target.closest('select') || 
                              target.closest('.oauth-btn') || 
                              target.closest('.theme-toggle-floating') || 
                              target.closest('[role="button"]') ||
                              target.closest('label');

  if (onCardOrInteractive) {
    if (!isHoveringInteractive) {
      isHoveringInteractive = true;
      cursorRing.classList.add('expand');
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      document.body.classList.add('native-cursor-active');
    }
  } else {
    if (isHoveringInteractive) {
      isHoveringInteractive = false;
      cursorRing.classList.remove('expand');
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      document.body.classList.remove('native-cursor-active');
    }
  }
}

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  
  handleCursorToggle(e.target);

  if (!hasMoved) {
    dotX = ringX = mouseX;
    dotY = ringY = mouseY;
    hasMoved = true;
    if (!isHoveringInteractive && cursorDot && cursorRing) {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
  }
});

// Hide custom cursor elements when offscreen
document.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
  if (cursorDot && cursorRing) {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  }
  document.body.classList.remove('native-cursor-active');
  isHoveringInteractive = false;
});

document.addEventListener('mouseenter', (e) => {
  handleCursorToggle(e.target);
});

// High performance animation loop for custom ring lerping tracking (0.08 easing)
function animateCursor() {
  if (hasMoved && cursorDot && cursorRing) {
    dotX = mouseX;
    dotY = mouseY;
    
    ringX += (mouseX - ringX) * 0.08;
    ringY += (mouseY - ringY) * 0.08;
    
    cursorDot.style.transform = `translate3d(calc(${dotX}px - 50%), calc(${dotY}px - 50%), 0)`;
    cursorRing.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();


// ===================================================
// DUAL-THEME SYNC AND LOCALSTORAGE MANAGER
// ===================================================
const themeToggleBtn = document.getElementById('signup-theme-toggle') || document.querySelector('.theme-toggle-floating');

function syncThemeUI() {
  if (!themeToggleBtn) return;
  const toggleIcon = themeToggleBtn.querySelector('.toggle-icon');
  if (!toggleIcon) return;
  const isDark = document.body.classList.contains('dark-mode');
  toggleIcon.textContent = isDark ? '☀️' : '🌙';
  
  toggleIcon.style.transform = 'scale(0.8) rotate(180deg)';
  setTimeout(() => {
    toggleIcon.style.transform = 'scale(1) rotate(0deg)';
  }, 150);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    syncThemeUI();
    
    window.dispatchEvent(new Event('themeChanged'));
  });
}

window.addEventListener('themeChanged', syncThemeUI);
syncThemeUI();


// ===================================================
// HIGH-DPI ANTI-GRAVITY SPRING PARTICLE BACKGROUND
// ===================================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  let oldWidth = 0;
  let oldHeight = 0;
  
  const torchRadius = 220; // Torch radius reveal
  const attractionForce = 1.35; // Vector attraction pull weight
  const springStiffness = 0.038; // Restoring spring force

  // Scale canvas backing store on resize to avoid blurring
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    if (particlesArray.length > 0 && oldWidth > 0 && oldHeight > 0) {
      particlesArray.forEach(p => {
        p.x = (p.x / oldWidth) * w;
        p.y = (p.y / oldHeight) * h;
        p.baseX = (p.baseX / oldWidth) * w;
        p.baseY = (p.baseY / oldHeight) * h;
      });
    }
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    ctx.scale(dpr, dpr);
    oldWidth = w;
    oldHeight = h;
  }

  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 2.8 + 2.2;
      
      this.hue = Math.random() * 360;
      this.saturation = Math.floor(Math.random() * (85 - 55 + 1) + 55);
      this.lightness = Math.floor(Math.random() * (90 - 72 + 1) + 72);
      
      this.lightColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, `;
    }

    update() {
      let ax = 0;
      let ay = 0;

      if (mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          let proximityForce = (mouse.radius - dist) / mouse.radius;
          ax += (dx / dist) * proximityForce * attractionForce;
          ay += (dy / dist) * proximityForce * attractionForce;
        }
      }

      let springX = this.baseX - this.x;
      let springY = this.baseY - this.y;
      
      ax += springX * springStiffness;
      ay += springY * springStiffness;

      // Strict 0.82 velocity damping per frame
      this.vx = (this.vx + ax) * 0.82;
      this.vy = (this.vy + ay) * 0.82;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Populate exactly 160 evenly distributed dots across the viewport
  function initParticles() {
    particlesArray = [];
    const totalParticles = 160;
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    for (let i = 0; i < totalParticles; i++) {
      let x = Math.random() * w;
      let y = Math.random() * h;
      particlesArray.push(new Particle(x, y));
    }
  }

  // Canvas render loop incorporating flashlight composites
  function drawAndSimulate() {
    ctx.clearRect(0, 0, oldWidth, oldHeight);
    const isDark = document.body.classList.contains('dark-mode');

    // 1. Render subtle background torch glow
    if (mouse.x !== null) {
      let glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, torchRadius);
      
      if (isDark) {
        glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        glowGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.06)');
        glowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.02)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, torchRadius, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
    }

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }

    // 2. Render connecting lines (connections < 100px) only inside torch beam
    for (let i = 0; i < particlesArray.length; i++) {
      let p1 = particlesArray[i];
      
      for (let j = i + 1; j < particlesArray.length; j++) {
        let p2 = particlesArray[j];
        
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          let midX = (p1.x + p2.x) / 2;
          let midY = (p1.y + p2.y) / 2;
          
          let mdx = mouse.x - midX;
          let mdy = mouse.y - midY;
          let distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouse.x !== null && distToMouse < torchRadius) {
            let torchFade = 1 - distToMouse / torchRadius;
            torchFade = Math.pow(torchFade, 1.8);
            let distFade = 1 - dist / 100;
            let lineOpacity = torchFade * distFade * 0.42;
            
            if (lineOpacity > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              
              if (isDark) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
              } else {
                ctx.strokeStyle = `${p1.lightColor}${lineOpacity})`;
              }
              
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }
    }

    // 3. Render dots only inside torch radius
    for (let i = 0; i < particlesArray.length; i++) {
      let p = particlesArray[i];
      
      if (mouse.x !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < torchRadius) {
          let opacity = 1 - distToMouse / torchRadius;
          opacity = Math.pow(opacity, 1.4);
          
          if (opacity > 0.01) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            
            if (isDark) {
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.shadowBlur = 3;
              ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
            } else {
              ctx.fillStyle = `${p.lightColor}${opacity})`;
              ctx.shadowBlur = 0;
            }
            ctx.fill();
          }
        }
      }
    }

    requestAnimationFrame(drawAndSimulate);
  }

  resizeCanvas();
  initParticles();
  drawAndSimulate();
}
