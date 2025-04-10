// Theme management script
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
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

    // Apply saved color or background image
    if (savedImage) {
        body.style.backgroundImage = `url('${savedImage}')`;
        body.style.backgroundSize = "cover";
    } else {
        applyColor(savedRed, savedGreen, savedBlue);
    }

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

        // Save RGB values to localStorage
        localStorage.setItem("red", red);
        localStorage.setItem("green", green);
        localStorage.setItem("blue", blue);

        applyColor(red, green, blue);
    }

    // Apply RGB color to body
    function applyColor(red, green, blue) {
        body.style.backgroundImage = "none";
        body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }

    // Reset to default theme
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            localStorage.removeItem("red");
            localStorage.removeItem("green");
            localStorage.removeItem("blue");
            localStorage.removeItem("backgroundImage");

            // Reset to default dark theme
            applyColor(0, 0, 0);
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
                    body.style.backgroundImage = `url('${imageUrl}')`;
                    body.style.backgroundSize = "cover";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});