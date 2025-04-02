function applyTheme(theme) {
    document.body.className = ''; // Reset all classes

    if (theme === 'default') {
        setParticleColor('#ffffff');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode');
        setParticleColor('#000000');
    } else if (theme === 'blue') {
        document.body.classList.add('theme-blue');
        setParticleColor('#00bfff');
    } else if (theme === 'green') {
        document.body.classList.add('theme-green');
        setParticleColor('#32cd32');
    } else if (theme === 'red') {
        document.body.classList.add('theme-red');
        setParticleColor('#ff4500');
    }
}

function setParticleColor(color) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100 },
            "color": { "value": color },
            "size": { "value": 3 },
            "move": { "speed": 1, "direction": "none", "random": true }
        }
    });
}

function saveTheme() {
    const classList = document.body.classList;
    let theme = 'default'; // Default theme

    if (classList.contains('light-mode')) {
        theme = 'light';
    } else if (classList.contains('theme-blue')) {
        theme = 'blue';
    } else if (classList.contains('theme-green')) {
        theme = 'green';
    } else if (classList.contains('theme-red')) {
        theme = 'red';
    }

    localStorage.setItem('theme', theme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}

// Apply the saved theme when the page loads
applySavedTheme();