// Animation manager for dynamic background animations

const animationContainerId = "animationContainer";
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
        case "leaves":
            createLeafLayers(container);
            break;
        case "bubbles":
            createBubbleLayers(container);
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
}

// Create bubble animation with layers
function createBubbleLayers(container) {
    const layers = ["layer1", "layer2", "layer3"];

    layers.forEach(layerName => {
        const layer = document.createElement("div");
        layer.classList.add("bubble-layer", layerName);

        for (let i = 0; i < 5; i++) { // Add 5 bubbles per layer
            const bubble = document.createElement("div");
            const randomX = Math.random(); // Random horizontal starting position
            const randomDirection = Math.random() * 40 - 20; // Random horizontal drift direction
            const size = Math.random() * 20 + 10; // Random size between 10px and 30px

            bubble.style.setProperty("--random-x", randomX);
            bubble.style.setProperty("--random-direction", randomDirection + "px");
            bubble.style.setProperty("--size", size + "px");
            layer.appendChild(bubble);
        }

        container.appendChild(layer);
    });

    addBubbleAnimationStyles();
}

// Add styles for bubble animation
function addBubbleAnimationStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Bubble Layers */
        .bubble-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .bubble-layer div {
            position: absolute;
            bottom: -5%; /* Bubbles start slightly below the bottom of the screen */
            left: calc(5% + 90% * var(--random-x));
            width: var(--size);
            height: var(--size);
            background-color: var(--primary-color, #8B4513); /* Use primary theme color */
            border-radius: 50%;
            opacity: 0.8;
            animation: rise 12s linear infinite;
        }

        @keyframes rise {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; } /* Fade in */
            100% { transform: translate(var(--random-direction), -120vh); opacity: 0; } /* Fade out above the screen */
        }
    `;
    document.head.appendChild(style);
}

// Create leaf animation with layers
function createLeafLayers(container) {
    const leafImages = [
        "leafs/leaves1.png",
        "leafs/leaves2.png",
        "leafs/leaves3.png",
        "leafs/leaves4.png"
    ];
    const layers = ["layer1", "layer2", "layer3"];

    layers.forEach(layerName => {
        const layer = document.createElement("div");
        layer.classList.add("falling-leaves-layer", layerName);

        for (let i = 0; i < 3; i++) { // Add 3 leaves per layer
            const leaf = document.createElement("img");
            const randomLeaf = leafImages[Math.floor(Math.random() * leafImages.length)];
            const randomX = Math.random(); // Random horizontal starting position
            const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1.0

            leaf.src = randomLeaf;
            leaf.alt = "Leaf";
            leaf.style.setProperty("--random-x", randomX);
            leaf.style.setProperty("--scale", scale);

            layer.appendChild(leaf);
        }

        container.appendChild(layer);
    });

    addLeafAnimationStyles();
}

// Add styles for leaf animation
function addLeafAnimationStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Falling Leaves Layers */
        .falling-leaves-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden; /* Prevent scrolling */
            pointer-events: none; /* Leaves should not interact with the user */
            z-index: 0; /* Place behind all other content */
        }

        /* Random Leaf Sizes */
        .falling-leaves-layer img {
            position: absolute;
            width: calc(5vw + 5vw * var(--scale)); /* Randomized sizes */
            height: auto;
            opacity: 0.8; /* Slight transparency for depth */
        }

        /* Layer 1 (Far Background) */
        .layer1 img {
            animation: animateLayer1 15s linear infinite;
        }

        @keyframes animateLayer1 {
            0% { top: -30%; left: calc(5% + 90% * var(--random-x)); transform: translateX(10px) scale(var(--scale)); opacity: 0; }
            10% { opacity: 1; } /* Fade in as it enters the screen */
            50% { transform: translateX(-10px) rotate(45deg); }
            100% { top: 110%; left: calc(5% + 90% * var(--random-x)); transform: translateX(-10px) scale(var(--scale)) rotate(90deg); opacity: 0; }
        }

        /* Layer 2 (Middle Background) */
        .layer2 img {
            animation: animateLayer2 12s linear infinite;
        }

        @keyframes animateLayer2 {
            0% { top: -30%; left: calc(5% + 90% * var(--random-x)); transform: translateX(20px) scale(var(--scale)); opacity: 0; }
            10% { opacity: 1; } /* Fade in as it enters the screen */
            50% { transform: translateX(-20px) rotate(90deg); }
            100% { top: 110%; left: calc(5% + 90% * var(--random-x)); transform: translateX(-20px) scale(var(--scale)) rotate(180deg); opacity: 0; }
        }

        /* Layer 3 (Foreground) */
        .layer3 img {
            animation: animateLayer3 10s linear infinite;
        }

        @keyframes animateLayer3 {
            0% { top: -30%; left: calc(5% + 90% * var(--random-x)); transform: translateX(30px) scale(var(--scale)); opacity: 0; }
            10% { opacity: 1; } /* Fade in as it enters the screen */
            50% { transform: translateX(-30px) rotate(135deg); }
            100% { top: 110%; left: calc(5% + 90% * var(--random-x)); transform: translateX(-30px) scale(var(--scale)) rotate(270deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}