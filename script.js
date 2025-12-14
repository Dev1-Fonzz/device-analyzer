
// Particles Background (Lightweight)
function initParticles() {
  const container = document.getElementById('particles');
  const particleCount = 60;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 3 + 1 + 'px';
    p.style.height = p.style.width;
    p.style.background = '#8a8aff';
    p.style.borderRadius = '50%';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.boxShadow = '0 0 10px #8a8aff';
    container.appendChild(p);

    // Animate
    animateParticle(p);
  }
}

function animateParticle(el) {
  const duration = 15000 + Math.random() * 20000;
  const x = Math.random() > 0.5 ? 30 : -30;
  const y = Math.random() > 0.5 ? 30 : -30;
  el.style.transition = `transform ${duration}ms linear`;
  el.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    el.style.transition = 'none';
    el.style.transform = 'translate(0, 0)';
    setTimeout(() => animateParticle(el), 50);
  }, duration);
}

// Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString('en-MY', {
    hour12: false,
    timeZoneName: 'short'
  });
}
setInterval(updateClock, 1000);
updateClock();

// Full Scan
function runFullScan() {
  const os = /android/i.test(navigator.userAgent) ? 'Android' : /iPad|iPhone/.test(navigator.userAgent) ? 'iOS' : 'Other';
  const device = /mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  const screen = `${screen.width}x${screen.height}`;
  const touch = 'ontouchstart' in window ? 'Active' : 'None';
  const online = navigator.onLine ? 'Online' : 'Offline';
  const battery = 'getBattery' in navigator ? 'Accessible' : 'Blocked';

  let output = `> OS: ${os}\n> Device: ${device}\n> Screen: ${screen}\n> Touch: ${touch}\n> Network: ${online}\n> Battery API: ${battery}\n> Scan Complete.`;
  const el = document.getElementById('scanOutput');
  el.textContent = output;
  el.classList.add('show');
}

// Touch Field
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

// Report
function submitReport() {
  const msg = document.getElementById('userReport').value.trim();
  if (!msg) return alert('Enter your report.');
  const subject = 'NeuroScan Diagnostic Report';
  window.location.href = `mailto:pfareezonzz01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
}

// Start
window.onload = () => {
  initParticles();
};
