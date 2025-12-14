// ✅ Particle background tetap sama (guna dari sebelum ini)

// ⏱️ Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString('en-MY', {
    hour12: false,
    timeZoneName: 'short'
  });
}
setInterval(updateClock, 1000);
updateClock();

// 🔍 FULL SCAN — versi 2025 (berfungsi)
function runFullScan() {
  const ua = navigator.userAgent;

  // OS Detection
  let os = "Unknown";
  if (/android/i.test(ua)) os = "Android";
  else if (/iPad|iPhone/i.test(ua)) os = "iOS";
  else if (/MacIntel/.test(navigator.platform) && navigator.maxTouchPoints > 1) os = "iOS (Mac)";
  else if (/Mac/.test(navigator.platform)) os = "macOS";
  else if (/Win/.test(navigator.platform)) os = "Windows";
  else if (/Linux/.test(navigator.platform)) os = "Linux";

  // Device Type
  const isMobile = /Mobile|Android|iP(hone|od)/.test(ua);
  const isTablet = /Tablet|iPad/.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  // Estimate Model (for Android/iOS)
  let model = "Unknown";
  if (os === "Android") {
    const match = ua.match(/Android.*?;\s([^;]+)/);
    model = match ? match[1].trim() : "Generic Android";
  } else if (os === "iOS") {
    if (/iPad/.test(ua)) model = "iPad";
    else if (/iPhone/.test(ua)) {
      // Rough iPhone model (limited)
      if (ua.includes("iPhone15")) model = "iPhone 15";
      else if (ua.includes("iPhone14")) model = "iPhone 14";
      else model = "iPhone (Unknown Model)";
    }
  }

  // Screen
  const screenRes = `${window.screen.width} × ${window.screen.height}`;
  const viewport = `${window.innerWidth} × ${window.innerHeight}`;

  // Touch
  const touch = 'ontouchstart' in window ? "Active" : "Not Detected";

  // Online
  const online = navigator.onPlane ? "Offline" : "Online";

  // Battery — dengan fallback
  let batteryStatus = "🔒 Restricted (Privacy)";
  if ('getBattery' in navigator) {
    navigator.getBattery().then(bat => {
      document.getElementById('batteryLine').textContent = `> Battery: ${Math.round(bat.level * 100)}% | ${bat.charging ? 'Charging' : 'Discharging'}`;
    }).catch(() => {
      // silently fail
    });
  }

  // Build output
  let output = `> OS: ${os}\n> Device: ${device}\n> Model (Est.): ${model}\n> Screen: ${screenRes}\n> Viewport: ${viewport}\n> Touch: ${touch}\n> Network: ${online}\n> Battery: ${batteryStatus}\n──────────────\n> Scan completed at ${new Date().toLocaleTimeString()}`;
  
  const el = document.getElementById('scanOutput');
  el.textContent = output;
  el.classList.add('show');

  // Placeholder for battery (will update if accessible)
  if ('getBattery' in navigator) {
    const batLine = document.createElement('div');
    batLine.id = 'batteryLine';
    batLine.textContent = '> Battery: Detecting...';
    batLine.style.color = '#ffcc00';
    el.appendChild(batLine);
  }
}

// ✅ Touch Field (sama seperti sebelum — berfungsi)
function activateTouchField() {
  const field = document.getElementById('touchField');
  field.classList.add('active');
  field.innerHTML = '';
  field.onclick = handleRipple;
  field.ontouchstart = (e) => {
    e.preventDefault();
    handleRipple(e);
  };
}

function handleRipple(e) {
  const field = e.currentTarget;
  const rect = field.getBoundingClientRect();
  const x = (e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY) - rect.top;

  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  field.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

// ✅ Report (berfungsi)
function submitReport() {
  const msg = document.getElementById('userReport').value.trim();
  if (!msg) return alert('Please describe the issue.');
  const subject = 'NeuroScan Diagnostic Report';
  window.location.href = `mailto:pfareezonzz01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
}

// ✅ Start
window.onload = () => {
  initParticles();
};
