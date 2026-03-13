document.addEventListener('DOMContentLoaded', () => {

    // ===================== NAVBAR =====================
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarLinks = document.getElementById('navbar-links');

    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    if (navbarLinks) {
        navbarLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navbarLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navbarLinks && navbarLinks.classList.contains('active')) {
            if (!navbarLinks.contains(e.target) && !navbarToggle.contains(e.target)) {
                navbarLinks.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        }
    });

    // ===================== SET MIN DATE ON ALL DATE INPUTS =====================
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
    });

    // ===================== TICKER =====================
    const destinations = [
        { name: 'Solapur',     image: 'images/solapur.jpg'    },
        { name: 'Akkalkot',    image: 'images/akkalkot.jpg'   },
        { name: 'Tuljapur',    image: 'images/tuljapur.jpg'   },
        { name: 'Pandharpur',  image: 'images/pandharpur.jpg' },
        { name: 'Pune',        image: 'images/pune.jpg'       },
        { name: 'Mumbai',      image: 'images/mumbai.jpg'     },
        { name: 'Nashik',      image: 'images/nashik.jpg'     },
        { name: 'Kolhapur',    image: 'images/kolhapur.jpg'   },
        { name: 'Ahmednagar',  image: 'images/ahmednagar.jpg' },
        { name: 'Shirdi',      image: 'images/shirdi.jpg'     },
        { name: 'Thane',       image: 'images/thane.jpg'      },
        { name: 'Hyderabad',   image: 'images/hyderabad.jpg'  }
    ];

    const tickerWrapper = document.getElementById('ticker-wrapper');
    if (tickerWrapper) {
        [...destinations, ...destinations].forEach(dest => {
            const item = document.createElement('div');
            item.className = 'ticker-item';
            item.style.backgroundImage = `url(${dest.image})`;
            const name = document.createElement('span');
            name.textContent = dest.name;
            item.appendChild(name);
            tickerWrapper.appendChild(item);
        });
    }

    // ===================== BOOKING FORM HANDLER =====================
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name        = form.querySelector('input[name="name"]').value.trim();
        const mobile      = form.querySelector('input[name="mobile"]').value.trim();
        const source      = form.querySelector('input[name="source"]').value.trim();
        const destination = form.querySelector('input[name="destination"]').value.trim();
        const dateInput   = form.querySelector('input[name="date"]').value;
        const vehicleEl   = form.querySelector('select[name="vehicle"]');
        const passEl      = form.querySelector('input[name="passengers"]');

        const vehicle     = vehicleEl ? vehicleEl.value : 'Not specified';
        const passengers  = passEl && passEl.value ? passEl.value : 'Not specified';

        // Validate mobile number
        if (!/^(\+91|91)?[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ''))) {
            alert('Please enter a valid 10-digit Indian mobile number.');
            return;
        }

        // Validate date
        if (!dateInput) {
            alert('Please select a travel date.');
            return;
        }

        const date = new Date(dateInput).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        const ownerWhatsApp = '917020460865';

        const message =
            `🚗 *New Booking Request — Abhijeet Travels*\n\n` +
            `👤 *Name*: ${name}\n` +
            `📞 *Mobile*: ${mobile}\n` +
            `📍 *From*: ${source}\n` +
            `🏁 *To*: ${destination}\n` +
            `📅 *Date*: ${date}\n` +
            `🚘 *Vehicle*: ${vehicle}\n` +
            `👥 *Passengers*: ${passengers}`;

        const whatsappURL = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        form.reset();
    };

    const heroForm = document.getElementById('hero-form');
    if (heroForm) heroForm.addEventListener('submit', handleFormSubmit);

    const contactForm = document.getElementById('contact-booking-form');
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

});