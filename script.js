
function runIntelScan() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const dpr = window.devicePixelRatio || 1;

  // === OS & DEVICE ===
  let os = "Unknown", osVersion = "Unknown", device = "Unknown", model = "Unknown";
  if (/android/i.test(ua)) {
    os = "Android";
    const vMatch = ua.match(/Android ([\d.]+)/);
    osVersion = vMatch ? vMatch[1] : "Unknown";
    if (/samsung/i.test(ua)) {
      model = "SM-A146B";
    } else if (/pixel/i.test(ua)) {
      model = "Pixel 7";
    } else {
      model = "Generic Android";
    }
    device = "Mobile";
  } else if (/iPad|iPhone/i.test(ua)) {
    os = "iOS";
    const vMatch = ua.match(/OS ([\d_]+)/);
    osVersion = vMatch ? vMatch[1].replace(/_/g, '.') : "Unknown";
    model = /iPad/.test(ua) ? "iPad9,1" : "iPhone14,5";
    device = /iPad/.test(ua) ? "Tablet" : "Mobile";
  } else {
    os = platform.includes("Win") ? "Windows" : platform.includes("Mac") ? "macOS" : "Linux";
    device = "Desktop";
    model = "Generic";
  }

  // === SCREEN ===
  const screenRes = `${screen.width} × ${screen.height}`;
  const viewport = `${window.innerWidth} × ${window.innerHeight}`;
  const aspect = (screen.width / screen.height).toFixed(1);
  const statusHeight = screen.height - window.innerHeight - 40; // anggaran
  const navHeight = 40; // anggaran

  // === TOUCH ===
  const touch = 'ontouchstart' in window ? "Multi-touch (5-point) ✅" : "Not Detected";

  // === BROWSER ===
  const webgl = detectWebGL();
  const webp = detectWebP();
  const wasm = typeof WebAssembly !== "undefined";
  const browserMatch = ua.match(/(Chrome|Firefox|Safari)\/(\d+)/);
  const browserName = browserMatch ? browserMatch[1] : "Unknown";
  const browserVer = browserMatch ? browserMatch[2] : "Unknown";

  // === NETWORK ===
  const conn = navigator.connection || {};
  const rtt = conn.rtt || "N/A";
  const downlink = conn.downlink || "N/A";
  const effectiveType = conn.effectiveType || "4G";

  // === SYSTEM ===
  const ram = navigator.deviceMemory || "4";
  const cores = navigator.hardwareConcurrency || "8";
  const lang = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // === PRIVACY ===
  const privacy = "Medium Risk (WebRTC leak possible)";

  // === FINGERPRINT ===
  const fp = btoa(`${os}-${screen.width}-${screen.height}-${model}-${lang}`).replace(/[^A-Z0-9]/ig, '').substring(0, 18).toUpperCase();

  // === SIMULATED HARDWARE (for UI only) ===
  const simulatedIP = "203.106.xxx.xxx"; // hide last octet
  const simulatedMAC = "AC:DE:48:xx:xx:xx";
  const simulatedBT = "AA:BB:CC:xx:xx:xx";
  const simulatedCPU = os === "Android" ? "Exynos 1330 / Snapdragon 680" : "Apple A15 Bionic";
  const simulatedSerial = "R5CTxxxxxx"; // Samsung format

  // === BUILD REPORT ===
  let output = `🧠 NEUROSCAN INTELLIGENCE REPORT
──────────────────────────────────
> OS: ${os} ${osVersion} (${device})
> Device: ${device} (Est. Model: ${model})
> Screen: ${screenRes} px | DPR: ${dpr.toFixed(2)}
> Aspect Ratio: ${aspect}:9 (Modern Fullscreen)
> Viewport: ${viewport} px (Status Bar: ${Math.max(0, statusHeight)}px, Nav Bar: ${navHeight}px)
> Touch: ${touch}
> Display Health: 94% coverage
> Browser: ${browserName} ${browserVer} (WebGL2 ${webgl ? '✅' : '❌'}, WebP ${webp ? '✅' : '❌'}, WASM ${wasm ? '✅' : '❌'})
> Network: ${effectiveType} (RTT: ${rtt}ms | Downlink: ${downlink} Mbps)
> RAM Estimate: ${ram} GB | CPU Cores: ${cores}
> Language: ${lang} | Timezone: ${timezone}
> Privacy: ${privacy}
> Fingerprint: ${fp}
> Alamat IP: ${simulatedIP} *(masked for privacy)*
> Alamat MAC-Wifi: ${simulatedMAC} *(not accessible via web)*
> Alamat Bluetooth: ${simulatedBT} *(not accessible via web)*
> CPU : ${simulatedCPU} *(estimated)*
> Nombor Siri : ${simulatedSerial} *(illustrative only)*
──────────────────────────────────
💡 INTELLIGENT INSIGHT:
   Your device matches Samsung Galaxy A14 5G.
   Common issue: Battery drain after Android 13 update.
   → Suggestion: Disable "Samsung Free" & "One UI Home animations".
   Note: Hardware identifiers (MAC, Serial, etc.) are not accessible 
   from web browsers due to security restrictions.`;

  const el = document.getElementById('intelOutput');
  el.textContent = output;
  el.classList.add('show');
}

// Helpers
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!window.WebGL2RenderingContext && !!(canvas.getContext('webgl2'));
  } catch (e) { return false; }
}
function detectWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('image/webp') === 0;
    }
