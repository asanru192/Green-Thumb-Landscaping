/* 
    GREEN THUMB LANDSCAPING 
    Premium Interactions — v2
    Preloader, Custom Cursor, Parallax, Counters, Scroll Reveals
*/

document.addEventListener('DOMContentLoaded', () => {

    // ======================
    // 1. PRELOADER
    // ======================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    });
    // Fallback — hide after 3s regardless
    setTimeout(() => preloader.classList.add('loaded'), 3000);


    // ======================
    // 2. CUSTOM CURSOR
    // ======================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (window.innerWidth > 768 && cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        const interactives = document.querySelectorAll('a, button, .magnetic, .portfolio-card, .service-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
        });
    }


    // ======================
    // 3. STICKY HEADER
    // ======================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ======================
    // 4. MOBILE MENU TOGGLE
    // ======================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link, .nav-btn');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ======================
    // 5. SCROLL REVEAL
    // ======================
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseFloat(delay) * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ======================
    // 6. STAT COUNTER ANIMATION
    // ======================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const step = target / 60; // ~60 frames
                const duration = 2000;
                const frameTime = duration / 60;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, frameTime);

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));


    // ======================
    // 7. PARALLAX HERO
    // ======================
    const heroBg = document.getElementById('hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.1)`;
            }
        }, { passive: true });
    }


    // ======================
    // 8. SMOOTH ANCHOR SCROLL
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ======================
    // 9. ACTIVE NAV LINK
    // ======================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);


    // ======================
    // 10. BACK TO TOP
    // ======================
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ======================
    // 11. MAGNETIC BUTTON EFFECT
    // ======================
    if (window.innerWidth > 768) {
        const magneticBtns = document.querySelectorAll('.magnetic');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }


    // ======================
    // 12. HERO FLOATING PARTICLES
    // ======================
    const particleContainer = document.getElementById('hero-particles');

    if (particleContainer) {
        for (let i = 0; i < 8; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf-particle');
            leaf.innerHTML = '<i class="fas fa-leaf"></i>';
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.bottom = '-20px';
            leaf.style.animationDuration = (8 + Math.random() * 12) + 's';
            leaf.style.animationDelay = (Math.random() * 8) + 's';
            leaf.style.fontSize = (0.6 + Math.random() * 1) + 'rem';
            particleContainer.appendChild(leaf);
        }
    }

});
