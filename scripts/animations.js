function addLeafAnimationStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        .layer1 img {
            animation: animateLayer1 15s linear infinite;
        }

        @keyframes animateLayer1 {
            0% { top: -30%; opacity: 0; }
            10% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        .layer2 img {
            animation: animateLayer2 12s linear infinite;
        }

        @keyframes animateLayer2 {
            0% { top: -30%; opacity: 0; }
            10% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        .layer3 img {
            animation: animateLayer3 10s linear infinite;
        }

        @keyframes animateLayer3 {
            0% { top: -30%; opacity: 0; }
            10% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}