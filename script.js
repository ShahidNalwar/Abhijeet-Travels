// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Logic ---
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarLinks = document.getElementById('navbar-links');

    // Toggle mobile menu on hamburger click
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked (using event delegation)
    if (navbarLinks) {
        navbarLinks.addEventListener('click', (event) => {
            // Check if the clicked element is a link
            if (event.target.tagName === 'A') {
                if (navbarLinks.classList.contains('active')) {
                    navbarLinks.classList.remove('active');
                    navbarToggle.classList.remove('active');
                }
            }
        });
    }

    // --- Ticker Logic ---
    // IMPORTANT: Create an 'images' folder in your project directory
    // and add your images there. The names must match the 'image' value below.
    const destinations = [
        { name: 'Solapur', image: 'images/ajanta.jpg' },
        { name: 'Akkalkot', image: 'images/akkalkot.jpg' },
        { name: 'Tuljapur', image: 'images/tuljapur.jpg' },
        { name: 'Pandharpur', image: 'images/pandharpur.jpg' },
        { name: 'Pune', image: 'images/pune.jpg' },
        { name: 'Mumbai', image: 'images/mumbai.jpg' },
        { name: 'Nashik', image: 'images/nashik.jpg' },
        { name: 'Kolhapur', image: 'images/kolhapur.jpg' },
        { name: 'Ahmednagar', image: 'images/ahmednagar.jpg' },
        { name: 'Shirdi', image: 'images/shirdi.jpg' },
        { name: 'Thane', image: 'images/thane.jpg' }
    ];

    const tickerWrapper = document.getElementById('ticker-wrapper');
    if (tickerWrapper) {
        // Duplicate the array for a seamless loop
        const tickerItems = [...destinations, ...destinations];

        tickerItems.forEach(dest => {
            const item = document.createElement('div');
            item.className = 'ticker-item';
            item.style.backgroundImage = `url(${dest.image})`;
            const name = document.createElement('span');
            name.textContent = dest.name;
            item.appendChild(name);
            tickerWrapper.appendChild(item);
        });
    }

    // --- Reusable Booking Form Logic ---
    const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const mobile = form.querySelector('input[name="mobile"]').value.trim();
    const source = form.querySelector('input[name="source"]').value.trim();
    const destination = form.querySelector('input[name="destination"]').value.trim();
    const dateInput = form.querySelector('input[name="date"]').value;

    // ✅ Validate number (10 digit or +91)
    if (!/^(\+91|91)?[6-9]\d{9}$/.test(mobile)) {
        alert('Please enter a valid mobile number.');
        return;
    }

    // Format date
    const date = new Date(dateInput).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // ✅ Owner’s WhatsApp number (international format without +)
    const ownerWhatsAppNumber = '917020460865';

    const message = `*New Booking Request*:\n\n*Name*: ${name}\n*Mobile*: ${mobile}\n*From*: ${source}\n*To*: ${destination}\n*Date*: ${date}`;
    const encodedMessage = encodeURIComponent(message);

    // ✅ Correct wa.me link
    const whatsappURL = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
    form.reset();
};


    // Attach event listener to the hero form
    const heroBookingForm = document.getElementById('hero-booking-form');
    if (heroBookingForm) {
        heroBookingForm.addEventListener('submit', handleFormSubmit);
    }

    // Attach event listener to the contact form
    const contactBookingForm = document.getElementById('contact-booking-form');
    if (contactBookingForm) {
        contactBookingForm.addEventListener('submit', handleFormSubmit);
    }
});
