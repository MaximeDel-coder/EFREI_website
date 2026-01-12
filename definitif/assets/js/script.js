document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        let clickTimer;

        logo.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;

            clearTimeout(clickTimer);

            if (clickCount === 3) {
                window.location.href = 'accueil_frgl.html';
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

    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const itemPath = item.getAttribute('href').toLowerCase();
        if (itemPath === currentPath || (currentPath === '' && itemPath.includes('accueil'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        let currentIndex = 0;

        function showSlide(index) {
            if (index < 0) {
                currentIndex = items.length - 1;
            } else if (index >= items.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

        let autoPlay = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);

        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
            carousel.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    showSlide(currentIndex + 1);
                }, 5000);
            });
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields / Veuillez remplir tous les champs.');
                return;
            }

            if (!email.includes('@')) {
                alert('Please enter a valid email / Veuillez entrer une adresse email valide.');
                return;
            }

            alert('Message sent successfully! / Message envoyé avec succès !');
            contactForm.reset();
        });
    }

    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const p = parent.querySelector('p');

            if (p) {
                if (p.style.display === 'block') {
                    p.style.display = 'none';
                    item.style.color = 'var(--text-color)';
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
