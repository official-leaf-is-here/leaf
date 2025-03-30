// ===== 2025 Popup Window =====
document.getElementById("popupBtn").addEventListener("click", () => {
    const features = "width=800,height=600,menubar=no,toolbar=no,location=no";
    const popup = window.open("", "_blank", features);
    
    if (!popup || popup.closed) {
      alert("Allow popups to use this feature.");
      return;
    }
  
    popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Secure Window</title>
        <style>
          body { margin: 0; background: #f0f2f5; }
          iframe { border: none; width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <iframe src="${window.location.href}"></iframe>
      </body>
      </html>
    `);
  });
  
  // ===== 2025 Panic Key System =====
  let panicKey = localStorage.getItem("panicKey") || "Shift+P";
  let redirectUrl = localStorage.getItem("redirectUrl") || "https://google.com";
  
  function updateDisplay() {
    document.getElementById("displayKey").textContent = panicKey;
    document.getElementById("keyInput").value = panicKey;
    document.getElementById("redirectUrl").value = redirectUrl;
  }
  
  document.getElementById("saveBtn").addEventListener("click", () => {
    panicKey = document.getElementById("keyInput").value.trim();
    redirectUrl = document.getElementById("redirectUrl").value.trim();
    
    if (!panicKey || !redirectUrl) {
      alert("Both fields required!");
      return;
    }
  
    localStorage.setItem("panicKey", panicKey);
    localStorage.setItem("redirectUrl", redirectUrl);
    updateDisplay();
    alert(`✅ New panic key: ${panicKey}`);
  });
  
  document.addEventListener("keydown", (e) => {
    const keyPressed = e.key.toUpperCase();
    const isShift = e.shiftKey;
    const currentCombo = isShift ? `Shift+${keyPressed}` : keyPressed;
  
    if (currentCombo === panicKey) {
      window.location.href = redirectUrl;
    }
  });
  
  // ===== 2025 Tab Cloaking =====
  document.getElementById("cloakBtn").addEventListener("click", () => {
    const preset = document.getElementById("sitePreset").value;
    document.title = preset;
  
    // Favicon spoofing (dynamic SVG to avoid external files)
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${getEmoji(preset)}</text></svg>`;
  });
  
  function getEmoji(preset) {
    const emojiMap = {
      "Google Docs": "📄",
      "Outlook": "📧",
      "Zoom": "🎥",
    };
    return emojiMap[preset] || "🔒";
  }
  
  // Initialize
  updateDisplay();
  