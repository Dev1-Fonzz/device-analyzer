
// ───────────────────────────────────────
// NEUROSCAN ELITE – INTELLIGENCE ENGINE
// ───────────────────────────────────────

// ✅ Particles (Lightweight)
function initParticles() {
  const container = document.getElementById('particles');
  const count = window.innerWidth > 768 ? 80 : 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute; width: ${size}px; height: ${size}px;
      background: ${Math.random() > 0.7 ? '#8affea' : '#8a8aff'};
      border-radius: 50%; opacity: ${Math.random() * 0.5 + 0.1};
      left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${size * 3}px currentColor;
    `;
    container.appendChild(p);
    animateParticle(p);
  }
}
function animateParticle(el) {
  const dur = 15000 + Math.random() * 20000;
  const x = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50);
  const y = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50);
  el.style.transition = `transform ${dur}ms linear`;
  el.style.transform = `translate(${x}px, ${y}px)`;
  setTimeout(() => {
    el.style.transition = 'none';
    el.style.transform = 'translate(0,0)';
    setTimeout(() => animateParticle(el), 50);
  }, dur);
}

// ⏱️ Live Intel Bar
function updateIntelBar() {
  const now = new Date();
  const mem = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "N/A";
  const cores = navigator.hardwareConcurrency || "N/A";
  document.getElementById('liveIntel').textContent = 
    `${now.toLocaleTimeString()} | RAM: ${mem} | Cores: ${cores} | Touch: ${'ontouchstart' in window ? 'Active' : 'None'}`;
}
setInterval(updateIntelBar, 1000);
updateIntelBar();

// 🌌 Theme Toggle
function toggleTheme() {
  const body = document.getElementById('body');
  const isQuantum = body.classList.contains('quantum');
  if (isQuantum) {
    body.classList.remove('quantum');
    localStorage.setItem('theme', 'dark');
    document.getElementById('modeBtn').textContent = '🌌 Dark Matter';
  } else {
    body.classList.add('quantum');
    localStorage.setItem('theme', 'light');
    document.getElementById('modeBtn').textContent = '✨ Quantum Light';
  }
}
// Restore saved theme
window.onload = () => {
  if (localStorage.getItem('theme') === 'light') {
    document.getElementById('body').classList.add('quantum');
    document.getElementById('modeBtn').textContent = '✨ Quantum Light';
  }
  initParticles();
};

// 🧠 INTEL SCAN
function runIntelScan() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  // OS
  let os = "Unknown";
  if (/android/i.test(ua)) os = "Android";
  else if (/iPad|iPhone/i.test(ua)) os = "iOS";
  else if (/MacIntel/.test(platform) && navigator.maxTouchPoints > 1) os = "iOS (Mac)";
  else if (/Mac/.test(platform)) os = "macOS";
  else if (/Win/.test(platform)) os = "Windows";
  else if (/Linux/.test(platform)) os = "Linux";

  // Device & Model
  const isMobile = /Mobile|Android|iP(hone|od)/.test(ua);
  const isTablet = /Tablet|iPad/.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  let model = "Generic";
  if (os === "Android") {
    const match = ua.match(/Android.*?;\s([^;]+)/);
    model = match ? match[1].trim() : "Generic Android";
  } else if (os === "iOS") {
    model = /iPad/.test(ua) ? "iPad" : "iPhone";
  }

  // Screen & Browser
  const screenRes = `${window.screen.width} × ${window.screen.height}`;
  const viewport = `${window.innerWidth} × ${window.innerHeight}`;
  const browser = navigator.userAgent.includes("Chrome") ? "Chrome" :
                   navigator.userAgent.includes("Firefox") ? "Firefox" :
                   navigator.userAgent.includes("Safari") ? "Safari" : "Other";
  const online = navigator.onLine ? "Online" : "Offline";
  const language = navigator.language;

  // Build output
  let output = `> OS: ${os}\n> Device: ${device}\n> Model (Est.): ${model}\n> Screen: ${screenRes}\n> Viewport: ${viewport}\n> Browser: ${browser}\n> Language: ${language}\n> Network: ${online}\n> RAM (Est.): ${navigator.deviceMemory || "N/A"} GB\n> CPU Cores: ${navigator.hardwareConcurrency || "N/A"}\n──────────────\n> Intel Scan v2.0 • ${new Date().toLocaleTimeString()}`;
  
  const el = document.getElementById('intelOutput');
  el.textContent = output;
  el.classList.add('show');
}

// 🖐️ TOUCH MATRIX (Multi-Touch)
let touchHistory = [];
function activateTouchMatrix() {
  const field = document.getElementById('touchMatrix');
  field.classList.add('active');
  field.innerHTML = '';
  touchHistory = [];

  const handleTouch = (e) => {
    e.preventDefault();
    const touches = e.type.startsWith('touch') ? e.touches : [e];
    field.innerHTML = ''; // clear previous
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i];
      const rect = field.getBoundingClientRect();
      const x = (e.type.startsWith('touch') ? t.clientX : t.clientX) - rect.left;
      const y = (e.type.startsWith('touch') ? t.clientY : t.clientY) - rect.top;

      // Create point
      const point = document.createElement('div');
      point.className = 'touch-point';
      point.style.left = x + 'px';
      point.style.top = y + 'px';
      point.style.background = getColorByIndex(i);
      field.appendChild(point);

      // Record
      touchHistory.push({ x, y, time: Date.now() });
    }

    // Update stats
    updateTouchStats();
  };

  field.addEventListener('mousedown', handleTouch);
  field.addEventListener('touchstart', handleTouch, { passive: false });
  field.addEventListener('mousemove', handleTouch);
  field.addEventListener('touchmove', handleTouch, { passive: false });
}

function getColorByIndex(i) {
  const colors = ['#ff6b6b', '#4ade80', '#60a5fa', '#fbbf24', '#d946ef'];
  return colors[i % colors.length];
}

function updateTouchStats() {
  const uniqueZones = new Set();
  touchHistory.forEach(t => {
    const zoneX = Math.floor(t.x / 50);
    const zoneY = Math.floor(t.y / 50);
    uniqueZones.add(`${zoneX},${zoneY}`);
  });

  const total = touchHistory.length;
  const zones = uniqueZones.size;
  const field = document.getElementById('touchMatrix');
  const coverage = Math.min(100, Math.round((zones / 36) * 100)); // assume 6x6 grid

  let stats = `> Total Touches: ${total}\n> Active Zones: ${zones}\n> Screen Coverage: ${coverage}%\n> Status: ${coverage < 40 ? '⚠️ Low coverage – possible dead zones' : '✅ Good coverage'}`;
  
  const el = document.getElementById('touchStats');
  el.textContent = stats;
  el.classList.add('show');
}

// ⚡ STRESS TEST
function runStressTest() {
  const start = performance.now();
  let count = 0;
  const totalFrames = 120; // 2 seconds at 60fps

  function animate() {
    if (count < totalFrames) {
      const progress = count / totalFrames;
      document.body.style.setProperty('--stress-color', `hsl(${progress * 360}, 100%, 60%)`);
      count++;
      requestAnimationFrame(animate);
    } else {
      const end = performance.now();
      const fps = Math.round((totalFrames / ((end - start) / 1000)));
      const result = fps >= 55 ? "Excellent" : fps >= 45 ? "Good" : "Needs Optimization";
      document.getElementById('stressResult').textContent = `> Rendered Frames: ${totalFrames}\n> Achieved FPS: ${fps}\n> Performance: ${result}\n> Test Duration: ${(end - start).toFixed(1)}ms`;
      document.getElementById('stressResult').classList.add('show');
      document.body.style.removeProperty('--stress-color');
    }
  }
  animate();
}

// 📡 INTELLIGENT REPORT
function generateFingerprint() {
  const ua = navigator.userAgent;
  const data = [
    ua,
    screen.width,
    screen.height,
    navigator.language,
    navigator.platform,
    new Date().getTimezoneOffset()
  ];
  const hash = btoa(data.join('|')).replace(/=/g, '').substring(0, 12);
  navigator.clipboard.writeText(hash).then(() => {
    alert(`Fingerprint copied: ${hash}`);
  });
}

function sendIntelligentReport() {
  const issue = document.getElementById('userIssue').value.trim();
  if (!issue) return alert('Describe the issue first.');
  
  // Auto-attach scan if available
  const scan = document.getElementById('intelOutput').textContent || 'No scan data';
  const body = `User Report:\n${issue}\n\nAuto-Scan Data:\n${scan}\n\n[Sent via NeuroScan Elite v2.0]`;
  window.location.href = `mailto:pfareezonzz01@gmail.com?subject=NeuroScan%20Elite%20Report&body=${encodeURIComponent(body)}`;
}

// QR Code (static link to WhatsApp)
document.getElementById('qrCode').innerHTML = `
  <a href="https://wa.me/60145400413?text=Hi%20Fareez%2C%20I%27m%20using%20NeuroScan%20Elite%20and%20need%20help." target="_blank" style="color:#8affea;">💬 Open WhatsApp Support</a>
`;
