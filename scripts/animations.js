// Animation manager for dynamic background animations

const animationContainerId = "animationContainer";
let animationElements = [];
let animationInterval;
let activeAnimation = "none";

// Start animations based on user selection
function startAnimation(animationType) {
    clearAnimation();
    activeAnimation = animationType;

    const container = document.createElement("div");
    container.id = animationContainerId;
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    container.style.zIndex = "-1";

    document.body.appendChild(container);

    switch (animationType) {
        case "snow":
            createSnowflakes(container);
            break;
        case "bubbles":
            createBubbles(container);
            break;
        case "leaves":
            createLeaves(container);
            break;
        default:
            clearAnimation();
    }
}

// Clear existing animations
function clearAnimation() {
    const container = document.getElementById(animationContainerId);
    if (container) {
        container.remove();
    }
    animationElements.forEach(el => el.remove());
    animationElements = [];
    clearInterval(animationInterval);
}

// Create snowflake animation (with random sizes)
function createSnowflakes(container) {
    const spawnInterval = 500; // Spawn snowflakes every 500ms
    const animationSpeed = 10; // Fixed animation duration (seconds)

    animationInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) { // Spawn 5 snowflakes at a time
            const size = Math.random() * 20 + 10; // Random size between 10px and 30px
            const snowflake = document.createElement("div");
            snowflake.style.position = "absolute";
            snowflake.style.top = "-10px";
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.backgroundColor = "white";
            snowflake.style.borderRadius = "50%";
            snowflake.style.opacity = "0.8";
            snowflake.style.animation = `fall ${animationSpeed}s linear infinite`;

            container.appendChild(snowflake);
            animationElements.push(snowflake);
        }
    }, spawnInterval);

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fall {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; } /* Fade in */
            100% { transform: translateY(100vh); opacity: 0; } /* Fade out */
        }
    `;
    document.head.appendChild(style);
}

// Create bubble animation (spawn from the bottom)
function createBubbles(container) {
    const spawnInterval = 500; // Spawn bubbles every 500ms
    const animationSpeed = 10; // Fixed animation duration (seconds)

    animationInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) { // Spawn 5 bubbles at a time
            const size = Math.random() * 30 + 10; // Random size between 10px and 40px
            const bubble = document.createElement("div");
            bubble.style.position = "absolute";
            bubble.style.bottom = "-10px"; // Start below the screen
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.borderRadius = "50%";
            bubble.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            bubble.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            bubble.style.animation = `rise ${animationSpeed}s linear infinite`;

            container.appendChild(bubble);
            animationElements.push(bubble);
        }
    }, spawnInterval);

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes rise {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; } /* Fade in */
            100% { transform: translateY(-100vh); opacity: 0; } /* Fade out */
        }
    `;
    document.head.appendChild(style);
}

// Create leaf animation (match leafy.html)
function createLeaves(container) {
    const leafImages = [
        "leafs/leaves1.png",
        "leafs/leaves2.png",
        "leafs/leaves3.png",
        "leafs/leaves4.png"
    ];
    const spawnInterval = 500; // Spawn leaves every 500ms
    const animationSpeed = 12; // Fixed animation duration (seconds)

    animationInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) { // Spawn 3 leaves at a time
            const leaf = document.createElement("img");
            const randomLeaf = leafImages[Math.floor(Math.random() * leafImages.length)];
            const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1.0

            leaf.src = randomLeaf;
            leaf.style.position = "absolute";
            leaf.style.top = "-10px";
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.width = `${50 * scale}px`; // Scaled width
            leaf.style.height = "auto";
            leaf.style.opacity = "0.8";
            leaf.style.animation = `fall-rotate ${animationSpeed}s linear infinite`;

            container.appendChild(leaf);
            animationElements.push(leaf);
        }
    }, spawnInterval);

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fall-rotate {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; } /* Fade in */
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } /* Fade out */
        }
    `;
    document.head.appendChild(style);
}