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