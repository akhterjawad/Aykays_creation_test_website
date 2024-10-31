// JavaScript for handling mega menu visibility
const megaMenuDropdown = document.getElementById('megaMenuDropdown');
const megaMenu = document.querySelector('.mega-menu');


megaMenuDropdown.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    megaMenu.classList.toggle('show'); // Toggle the show class
});

// Close mega menu if clicked outside
document.addEventListener('click', function (e) {
    if (!megaMenuDropdown.contains(e.target) && !megaMenu.contains(e.target)) {
        megaMenu.classList.remove('show'); // Hide the mega menu
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize slider
    function updateSlider() {
        // Move the slider track
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update button states
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Optional: Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0 && currentSlide < totalSlides - 1) {
                // Swipe left
                currentSlide++;
                updateSlider();
            } else if (difference < 0 && currentSlide > 0) {
                // Swipe right
                currentSlide--;
                updateSlider();
            }
        }
    }

    // Initialize slider on load
    updateSlider();

    // Simplified event handler for info buttons
    function initializeMaterialInfo() {
        // Add click handlers for info buttons
        document.querySelectorAll('.info-toggle-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Find the closest material card and its info panel
                const card = this.closest('.material-card');
                const infoPanel = card.querySelector('.material-info');
                const infoText = this.querySelector('.info-text');

                // Close all other info panels
                document.querySelectorAll('.material-info').forEach(panel => {
                    if (panel !== infoPanel) {
                        panel.classList.remove('active');
                        const otherButton = panel.closest('.material-card')
                            .querySelector('.info-text');
                        if (otherButton) {
                            otherButton.textContent = 'INFO';
                        }
                    }
                });

                // Toggle current panel
                if (!infoPanel.classList.contains('active')) {
                    infoPanel.classList.add('active');
                    infoPanel.style.display = 'block';
                    infoText.textContent = 'CLOSE';
                } else {
                    infoPanel.classList.remove('active');
                    setTimeout(() => {
                        infoPanel.style.display = 'none';
                    }, 300); // Match transition duration
                    infoText.textContent = 'INFO';
                }
            });
        });

        // Close panels when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.material-card')) {
                document.querySelectorAll('.material-info').forEach(panel => {
                    panel.classList.remove('active');
                    setTimeout(() => {
                        panel.style.display = 'none';
                    }, 300);
                    const button = panel.closest('.material-card')
                        .querySelector('.info-text');
                    if (button) {
                        button.textContent = 'INFO';
                    }
                });
            }
        });
    }

    // Initialize when DOM is loaded
    initializeMaterialInfo();
});
