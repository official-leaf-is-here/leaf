// About:Blank Cloaking
function activateAboutBlank() {
    const isEnabled = document.getElementById("abToggle").checked;
    if (isEnabled) {
      try {
        // Attempt to cloak (may fail due to browser restrictions)
        window.location.href = "about:blank";
        const newWindow = window.open();
        newWindow.document.write(`
          <html>
            <head>
              <title>about:blank</title>
              <style>body { margin: 0; }</style>
            </head>
            <body>
              <iframe src="${window.location.href}" style="border: none; width: 100%; height: 100vh;"></iframe>
            </body>
          </html>
        `);
        window.close();
      } catch (e) {
        alert("Failed to enable about:blank. Modern browsers block this feature.");
      }
    }
  }
  
  // Panic Key System
  let panicKey = null;
  let panicUrl = null;
  
  function setPanicKey() {
    const keyCombo = document.getElementById("panicKeyInput").value;
    panicUrl = document.getElementById("panicRedirectUrl").value;
  
    if (!keyCombo || !panicUrl) {
      alert("Please fill in both fields!");
      return;
    }
  
    panicKey = keyCombo.toUpperCase();
    localStorage.setItem("panicKey", panicKey);
    localStorage.setItem("panicUrl", panicUrl);
    alert(Panic key set: ${panicKey}. Press it to redirect!);
  }
  
  // Listen for panic key
  document.addEventListener("keydown", (e) => {
    const pressedKey = e.key.toUpperCase();
    const isShift = e.shiftKey;
    const currentCombo = isShift ? Shift+${pressedKey} : pressedKey;
  
    if (panicKey && currentCombo === panicKey) {
      window.location.href = panicUrl || "https://google.com";
    }
  });
  
  // Load saved settings
  window.onload = function() {
    panicKey = localStorage.getItem("panicKey");
    panicUrl = localStorage.getItem("panicUrl");
  
    if (panicKey && panicUrl) {
      document.getElementById("panicKeyInput").value = panicKey;
      document.getElementById("panicRedirectUrl").value = panicUrl;
    }
  };
  
  // Tab cloaking (from previous example)
  function applyCloak() {
    const dropdown = document.getElementById("cloakDropdown");
    document.title = dropdown.value;
  }