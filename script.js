// --- DEVICE ANALYSIS ---
function analyzeDevice() {
  const os = getOS();
  const device = getDeviceType();
  const vendor = navigator.vendor || "Unknown";
  const platform = navigator.platform || "Unknown";
  const language = navigator.language;
  const screenRes = `${window.screen.width} x ${window.screen.height}`;
  const viewport = `${window.innerWidth} x ${window.innerHeight}`;
  const touch = 'ontouchstart' in window ? "Yes" : "No";
  const deviceMemory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown";
  const hardwareConcurrency = navigator.hardwareConcurrency || "Unknown";

  getBatteryInfo(bat => {
    let html = `
      <div class="info-row"><span>OS:</span> <span>${os}</span></div>
      <div class="info-row"><span>Device Type:</span> <span>${device}</span></div>
      <div class="info-row"><span>Vendor:</span> <span>${vendor}</span></div>
      <div class="info-row"><span>Platform:</span> <span>${platform}</span></div>
      <div class="info-row"><span>Screen (Physical):</span> <span>${screenRes}</span></div>
      <div class="info-row"><span>Viewport:</span> <span>${viewport}</span></div>
      <div class="info-row"><span>Touch Support:</span> <span>${touch}</span></div>
      <div class="info-row"><span>Language:</span> <span>${language}</span></div>
      <div class="info-row"><span>RAM (Est.):</span> <span>${deviceMemory}</span></div>
      <div class="info-row"><span>CPU Cores:</span> <span>${hardwareConcurrency}</span></div>
    `;

    if (bat) {
      html += `
        <div class="info-row"><span>Battery Level:</span> <span>${bat.level}%</span></div>
        <div class="info-row"><span>Charging:</span> <span>${bat.charging ? 'Yes' : 'No'}</span></div>
      `;
    } else {
      html += `<div class="info-row"><span>Battery:</span> <span>Not accessible (privacy)</span></div>`;
    }

    document.getElementById('deviceInfo').innerHTML = html;
    document.getElementById('deviceInfo').classList.add('show');
  });
}

function getOS() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android";
  if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
  if (/win/i.test(ua)) return "Windows";
  if (/mac/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Unknown";
}
function getDeviceType() {
  return /mobile/i.test(navigator.userAgent) ? "Mobile" : /tablet/i.test(navigator.userAgent) ? "Tablet" : "Desktop";
}

function getBatteryInfo(callback) {
  if ('getBattery' in navigator) {
    navigator.getBattery().then(b => callback({ level: Math.round(b.level * 100), charging: b.charging }))
      .catch(() => callback(null));
  } else callback(null);
}

// --- TOUCH TESTER ---
function startTouchTest() {
  const tester = document.getElementById('touchTester');
  tester.classList.add('active');
  tester.innerHTML = '';
  tester.style.height = (window.innerHeight * 0.45) + 'px';
  
  tester.removeEventListener('click', handleTouch);
  tester.removeEventListener('touchstart', handleTouch);
  tester.addEventListener('click', handleTouch);
  tester.addEventListener('touchstart', handleTouch, { passive: true });
}

function handleTouch(e) {
  e.preventDefault();
  const tester = e.currentTarget;
  const rect = tester.getBoundingClientRect();
  const x = (e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY) - rect.top;

  const effect = document.createElement('div');
  effect.className = 'touch-effect';
  effect.style.left = x + 'px';
  effect.style.top = y + 'px';
  tester.appendChild(effect);
  setTimeout(() => effect.remove(), 600);
}

// --- DISPLAY TEST ---
function showColor(color) {
  let hex;
  switch(color) {
    case 'red': hex = '#ff0000'; break;
    case 'green': hex = '#00ff00'; break;
    case 'blue': hex = '#0000ff'; break;
    case 'white': hex = '#ffffff'; break;
    case 'black': hex = '#000000'; break;
    case 'gray': hex = '#888888'; break;
    default: hex = '#000000';
  }
  const overlay = document.getElementById('colorOverlay');
  if (!overlay) {
    const el = document.createElement('div');
    el.id = 'colorOverlay';
    document.body.appendChild(el);
  }
  document.getElementById('colorOverlay').style.background = hex;
  document.getElementById('colorOverlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function exitColorTest() {
  const overlay = document.getElementById('colorOverlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// --- NETWORK TEST ---
function testNetwork() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const downlink = conn ? conn.downlink : 'Unknown';
  const effectiveType = conn ? conn.effectiveType : 'Unknown';
  const rtt = conn ? conn.rtt : 'Unknown';
  const online = navigator.onLine ? "Online" : "Offline";

  let html = `
    <div class="info-row"><span>Online Status:</span> <span>${online}</span></div>
    <div class="info-row"><span>Connection Type:</span> <span>${effectiveType}</span></div>
    <div class="info-row"><span>Speed (Est.):</span> <span>${downlink} Mbps</span></div>
    <div class="info-row"><span>Latency:</span> <span>${rtt} ms</span></div>
    <div class="info-row"><span>User Agent:</span> <span>${navigator.userAgent.substring(0,60)}...</span></div>
  `;

  document.getElementById('networkInfo').innerHTML = html;
  document.getElementById('networkInfo').classList.add('show');
}

// --- REPORTING ---
function copyDeviceSummary() {
  analyzeDevice(); // ensure latest
  setTimeout(() => {
    const data = {
      OS: getOS(),
      Device: getDeviceType(),
      Screen: `${window.screen.width}x${window.screen.height}`,
      Touch: 'ontouchstart' in window ? "Yes" : "No",
      Battery: 'getBattery' in navigator ? "Accessible" : "Blocked",
      Online: navigator.onLine ? "Yes" : "No"
    };
    const text = Object.entries(data).map(([k,v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(text).then(() => alert('✅ Device info copied!'));
  }, 100);
}

function sendReport() {
  const desc = document.getElementById('issueDesc').value.trim();
  if (!desc) return alert("Please describe your issue.");
  const subject = "Device Troubleshoot Report";
  const body = `User Report:\n${desc}\n\n[Device info may be included manually.]`;
  window.location.href = `mailto:pfareezonzz01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
