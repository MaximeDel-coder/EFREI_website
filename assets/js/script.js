document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<span>✕</span>' : '<span>☰</span>';
        });
    }

    // 2. Easter Egg: 3 clicks on logo redirects to Frenglish version
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        let clickTimer;

        logo.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;

            clearTimeout(clickTimer);

            if (clickCount === 3) {
                // Secret redirect triggered
                window.location.href = 'index_frgl.html';
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => {
                    if (clickCount === 1) {
                        const target = logo.getAttribute('href');
                        if (target) window.location.href = target;
                    }
                    clickCount = 0;
                }, 500);
            }
        });
    }

    // 3. Active Nav Link Highlighting
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const itemPath = item.getAttribute('href').toLowerCase();
        if (itemPath === currentPath || (currentPath === '' && itemPath.includes('index'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 4. Enhanced Carousel with Touch Swipe Support
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;

        function showSlide(index) {
            items[currentIndex].classList.remove('active');
            if (index < 0) {
                currentIndex = items.length - 1;
            } else if (index >= items.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            items[currentIndex].classList.add('active');
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
        
        // Initialize first slide as active for animations
        if(items.length > 0) items[0].classList.add('active');

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

        let autoPlay = setInterval(() => showSlide(currentIndex + 1), 6000);

        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
            carousel.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => showSlide(currentIndex + 1), 6000);
            });

            // Touch support for mobile swipe
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                clearInterval(autoPlay);
            }, {passive: true});

            carousel.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const diff = startX - currentX;
                
                // If swipe is significant enough
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        showSlide(currentIndex + 1); // Swipe left -> next
                    } else {
                        showSlide(currentIndex - 1); // Swipe right -> prev
                    }
                    isDragging = false; // Prevent multiple slides in one swipe
                }
            }, {passive: true});

            carousel.addEventListener('touchend', () => {
                isDragging = false;
                autoPlay = setInterval(() => showSlide(currentIndex + 1), 6000);
            });
        }
    }

    // 5. Professional Form Validation (Replacing alerts)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Create an element for showing status messages
        const formStatus = document.createElement('div');
        formStatus.className = 'form-status';
        formStatus.style.padding = '15px';
        formStatus.style.marginTop = '20px';
        formStatus.style.borderRadius = '8px';
        formStatus.style.display = 'none';
        formStatus.style.fontWeight = '600';
        contactForm.appendChild(formStatus);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name') ? document.getElementById('name').value : '';
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value : '';

            // Reset status
            formStatus.style.display = 'block';
            
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                formStatus.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
                formStatus.style.color = 'var(--accent-color)';
                formStatus.textContent = 'Veuillez remplir tous les champs obligatoires.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
                formStatus.style.color = 'var(--accent-color)';
                formStatus.textContent = 'Veuillez entrer une adresse email valide.';
                return;
            }

            // Success
            formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            formStatus.style.color = '#10b981'; // Emerald
            formStatus.textContent = 'Merci ! Votre message a été envoyé avec succès.';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const p = parent.querySelector('p');

            if (p) {
                if (p.style.display === 'block') {
                    p.style.display = 'none';
                    item.style.color = 'var(--text-primary)';
                } else {
                    p.style.display = 'block';
                    item.style.color = 'var(--primary-color)';
                }
            }
        });
        const p = item.parentElement.querySelector('p');
        if (p) p.style.display = 'none';
    });
});
