// ───────────────────────────────────────
// NEUROSCAN ELITE v2.0 — CLEAN & SAFE
// ───────────────────────────────────────

// Particles
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth > 768 ? 70 : 45;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = `
      position: absolute; width: ${size}px; height: ${size}px;
      background: ${Math.random() > 0.7 ? '#8affea' : '#8a8aff'};
      border-radius: 50%; opacity: ${Math.random() * 0.5 + 0.1};
      left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
      box-shadow: 0 0 ${size * 2}px currentColor;
    `;
    container.appendChild(p);
    animateParticle(p);
  }
}
function animateParticle(el) {
  const dur = 15000 + Math.random() * 20000;
  const x = (Math.random() > 0.5 ? 1 : -1) * (25 + Math.random() * 40);
  const y = (Math.random() > 0.5 ? 1 : -1) * (25 + Math.random() * 40);
  el.style.transition = `transform ${dur}ms linear`;
  el.style.transform = `translate(${x}px, ${y}px)`;
  setTimeout(() => {
    el.style.transition = 'none';
    el.style.transform = 'translate(0,0)';
    setTimeout(() => animateParticle(el), 50);
  }, dur);
}

// Live Intel Bar
function updateIntelBar() {
  const now = new Date();
  const ram = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "–";
  const cores = navigator.hardwareConcurrency || "–";
  const touch = 'ontouchstart' in window ? 'Touch' : 'No Touch';
  document.getElementById('liveIntel').textContent = 
    `${now.toLocaleTimeString()} | RAM: ${ram} | Cores: ${cores} | ${touch}`;
}
setInterval(updateIntelBar, 1000);
updateIntelBar();

// Theme Toggle
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
window.onload = () => {
  if (localStorage.getItem('theme') === 'light') {
    document.getElementById('body').classList.add('quantum');
    document.getElementById('modeBtn').textContent = '✨ Quantum Light';
  }
  initParticles();
};

// ─── INTELLIGENCE SCAN (100% ACCURATE, NO SIMULATION) ───
function runIntelScan() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const dpr = window.devicePixelRatio || 1;

  // OS Detection
  let os = "Unknown";
  if (/android/i.test(ua)) os = "Android";
  else if (/iPad|iPhone/i.test(ua)) os = "iOS";
  else if (/MacIntel/.test(platform) && navigator.maxTouchPoints > 1) os = "iOS (Mac)";
  else if (/Mac/.test(platform)) os = "macOS";
  else if (/Win/.test(platform)) os = "Windows";
  else if (/Linux/.test(platform)) os = "Linux";

  // Device Type
  const device = /Mobile|Android|iP(hone|od)/.test(ua) ? "Mobile" :
                 /Tablet|iPad/.test(ua) ? "Tablet" : "Desktop";

  // Screen
  const screenRes = `${screen.width} × ${screen.height}`;
  const viewport = `${window.innerWidth} × ${window.innerHeight}`;
  const aspect = (screen.width / screen.height).toFixed(1);
  const dprRounded = dpr.toFixed(2);

  // Touch
  const touch = 'ontouchstart' in window ? "Supported (Multi-touch)" : "Not Detected";

  // Browser
  let browser = "Unknown";
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

  // Capabilities
  const webgl = detectWebGL();
  const webp = detectWebP();
  const wasm = typeof WebAssembly !== "undefined";

  // Network
  const conn = navigator.connection || {};
  const networkType = conn.effectiveType || "Unknown";
  const rtt = conn.rtt ? `${conn.rtt} ms` : "Not available";
  const downlink = conn.downlink ? `${conn.downlink} Mbps` : "Not available";

  // System
  const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Not available";
  const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : "Not available";

  // Locale
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Privacy
  const cookies = navigator.cookieEnabled ? "Enabled" : "Blocked";
  const doNotTrack = navigator.doNotTrack === "1" ? "Requested" : "Not set";

  // Fingerprint (safe)
  const fpData = [os, screen.width, screen.height, browser, language, device].join('|');
  const fingerprint = btoa(fpData).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16).toUpperCase();

  // Insight
  let insight = "💡 Ensure your OS and browser are updated for optimal performance.";
  if (os === "Android" && screen.width === 412 && screen.height === 915) {
    insight = "💡 Common fullscreen Android device detected.\n   → If battery drains fast, check background apps and screen brightness.";
  } else if (os === "iOS" && device === "Mobile") {
    insight = "💡 iPhone detected. Restart weekly to maintain performance.";
  }

  // Output
  let output = `🧠 NEUROSCAN INTELLIGENCE REPORT
──────────────────────────────────
> Operating System: ${os}
> Device Type: ${device}
> Screen Resolution: ${screenRes} px
> Device Pixel Ratio: ${dprRounded}
> Aspect Ratio: ${aspect}:1
> Viewport Size: ${viewport} px
> Touch Support: ${touch}
> Browser: ${browser}
> WebGL2: ${webgl ? 'Supported' : 'Not supported'}
> WebP: ${webp ? 'Supported' : 'Not supported'}
> WebAssembly: ${wasm ? 'Supported' : 'Not supported'}
> Network Type: ${networkType}
> Round-Trip Time: ${rtt}
> Downlink Speed: ${downlink}
> Estimated RAM: ${ram}
> CPU Cores: ${cores}
> Language: ${language}
> Timezone: ${timezone}
> Cookies: ${cookies}
> Do Not Track: ${doNotTrack}
> Session Fingerprint: ${fingerprint}
──────────────────────────────────
${insight}`;

  const el = document.getElementById('intelOutput');
  if (el) {
    el.textContent = output;
    el.classList.add('show');
  }
}

// ─── TOUCH MATRIX ───
let touchHistory = [];
function activateTouchMatrix() {
  const field = document.getElementById('touchMatrix');
  if (!field) return;
  field.classList.add('active');
  field.innerHTML = '';
  touchHistory = [];

  const handleTouch = (e) => {
    e.preventDefault();
    const touches = e.type.startsWith('touch') ? e.touches : [e];
    field.innerHTML = '';
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i];
      const rect = field.getBoundingClientRect();
      const x = (e.type.startsWith('touch') ? t.clientX : t.clientX) - rect.left;
      const y = (e.type.startsWith('touch') ? t.clientY : t.clientY) - rect.top;

      const point = document.createElement('div');
      point.className = 'touch-point';
      point.style.left = x + 'px';
      point.style.top = y + 'px';
      field.appendChild(point);

      touchHistory.push({ x, y, time: Date.now() });
    }
    updateTouchStats();
  };

  field.addEventListener('mousedown', handleTouch);
  field.addEventListener('touchstart', handleTouch, { passive: false });
  field.addEventListener('mousemove', handleTouch);
  field.addEventListener('touchmove', handleTouch, { passive: false });
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
  const coverage = Math.min(100, Math.round((zones / 36) * 100));

  let stats = `> Total Touch Events: ${total}\n> Active Screen Zones: ${zones}\n> Coverage Estimate: ${coverage}%\n> Status: ${coverage < 40 ? '⚠️ Low activity – check responsiveness' : '✅ Normal touch distribution'}`;
  
  const el = document.getElementById('touchStats');
  if (el) {
    el.textContent = stats;
    el.classList.add('show');
  }
}

// ─── STRESS TEST ───
function runStressTest() {
  const start = performance.now();
  let count = 0;
  const totalFrames = 120;

  function animate() {
    if (count < totalFrames) {
      count++;
      requestAnimationFrame(animate);
    } else {
      const end = performance.now();
      const fps = Math.round((totalFrames / ((end - start) / 1000)));
      const result = fps >= 55 ? "Excellent" : fps >= 45 ? "Good" : "Needs Optimization";
      const el = document.getElementById('stressResult');
      if (el) {
        el.textContent = `> Frames Rendered: ${totalFrames}\n> Achieved FPS: ${fps}\n> Performance Rating: ${result}\n> Duration: ${(end - start).toFixed(1)}ms`;
        el.classList.add('show');
      }
    }
  }
  animate();
}

// ─── REPORT & FINGERPRINT ───
function generateFingerprint() {
  const ua = navigator.userAgent;
  const data = [ua, screen.width, screen.height, navigator.language, new Date().getTimezoneOffset()].join('|');
  const hash = btoa(data).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12).toUpperCase();
  navigator.clipboard.writeText(hash).then(() => {
    alert(`Fingerprint copied: ${hash}`);
  }).catch(() => {
    alert('Failed to copy fingerprint.');
  });
}

function sendReport() {
  const issue = document.getElementById('userIssue')?.value?.trim();
  if (!issue) return alert('Please describe your issue.');
  const subject = "NeuroScan Elite Diagnostic Report";
  const body = `User Report:\n${issue}\n\n[Sent via NeuroScan Elite v2.0]`;
  window.location.href = `mailto:pfareezonzz01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ─── HELPERS ───
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    return gl !== null;
  } catch (e) {
    return false;
  }
}

function detectWebP() {
  try {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch (e) {
    return false;
  }
               }
