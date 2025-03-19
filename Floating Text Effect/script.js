// Get all color buttons
const colorButtons = document.querySelectorAll('.color-button');

// Loop through each color button and add a click event listener
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the background and shadow color from the button's data attributes
        const bgColor = button.getAttribute('data-bg');
        const shadowColor = button.getAttribute('data-shadow');

        // Update the CSS variables dynamically
        document.documentElement.style.setProperty('--card-background', `var(--card-background-${bgColor})`);
        document.documentElement.style.setProperty('--box-shadow', `var(--box-shadow-${shadowColor})`);
    });
});
