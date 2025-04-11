document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const header = document.querySelector(".header");
    const buttons = document.querySelectorAll(".button");
    const redSlider = document.getElementById("red");
    const greenSlider = document.getElementById("green");
    const blueSlider = document.getElementById("blue");
    const resetButton = document.getElementById("reset-theme");
    const uploadInput = document.getElementById("upload-background");

    // Load saved theme settings from localStorage
    const savedRed = localStorage.getItem("red") || 0;
    const savedGreen = localStorage.getItem("green") || 0;
    const savedBlue = localStorage.getItem("blue") || 0;
    const savedImage = localStorage.getItem("backgroundImage");
    const savedFontColor = localStorage.getItem("fontColor") || "#ffffff";
    const savedButtonColor = localStorage.getItem("buttonColor") || "rgba(255, 255, 255, 0.1)";

    // Apply saved background color or image
    if (savedImage) {
        applyImageBackground(savedImage);
    } else {
        applyColorBackground(savedRed, savedGreen, savedBlue);
    }

    // Apply saved font and button colors
    applyFontAndButtonStyles(savedFontColor, savedButtonColor);

    // Update sliders to reflect saved values
    if (redSlider && greenSlider && blueSlider) {
        redSlider.value = savedRed;
        greenSlider.value = savedGreen;
        blueSlider.value = savedBlue;

        // Attach slider event listeners
        redSlider.addEventListener("input", updateTheme);
        greenSlider.addEventListener("input", updateTheme);
        blueSlider.addEventListener("input", updateTheme);
    }

    // Update theme based on RGB slider values
    function updateTheme() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;

        const fontColor = calculateFontColor(red, green, blue);
        const buttonColor = `rgba(${255 - red}, ${255 - green}, ${255 - blue}, 0.3)`;

        // Save values to localStorage
        localStorage.setItem("red", red);
        localStorage.setItem("green", green);
        localStorage.setItem("blue", blue);
        localStorage.setItem("fontColor", fontColor);
        localStorage.setItem("buttonColor", buttonColor);

        // Apply background color
        applyColorBackground(red, green, blue);

        // Update font and button styles
        applyFontAndButtonStyles(fontColor, buttonColor);
    }

    // Apply RGB color to body
    function applyColorBackground(red, green, blue) {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }

    // Apply uploaded image background
    function applyImageBackground(imageUrl) {
        body.style.backgroundImage = `url('${imageUrl}')`;
        body.style.backgroundSize = "cover";
        body.style.backgroundColor = "transparent"; // Fallback
    }

    // Apply font and button styles
    function applyFontAndButtonStyles(fontColor, buttonColor) {
        body.style.color = fontColor;
        if (header) header.style.color = fontColor;
        buttons.forEach((button) => {
            button.style.color = fontColor;
            button.style.backgroundColor = buttonColor;
        });
    }

    // Reset to default theme
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            localStorage.removeItem("red");
            localStorage.removeItem("green");
            localStorage.removeItem("blue");
            localStorage.removeItem("backgroundImage");
            localStorage.removeItem("fontColor");
            localStorage.removeItem("buttonColor");

            // Reset to default dark theme
            applyColorBackground(0, 0, 0);
            applyFontAndButtonStyles("#ffffff", "rgba(255, 255, 255, 0.1)");
            if (redSlider && greenSlider && blueSlider) {
                redSlider.value = 0;
                greenSlider.value = 0;
                blueSlider.value = 0;
            }
        });
    }

    // Handle custom background image upload
    if (uploadInput) {
        uploadInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    localStorage.setItem("backgroundImage", imageUrl);

                    // Apply uploaded image
                    applyImageBackground(imageUrl);

                    // Adjust font and button styles for visibility
                    applyFontAndButtonStyles("#ffffff", "rgba(0, 0, 0, 0.5)");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Calculate appropriate font color for contrast
    function calculateFontColor(red, green, blue) {
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
        return brightness > 125 ? "#000000" : "#ffffff";
    }
});