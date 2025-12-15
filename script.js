/**
 * OSE Main Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
    setupOpeningAnimation();
    setupSmoothScroll();
    setupScrollObserver();
    setupHeaderScrollEffect();
    setupMobileMenu();
    setupCardHoverEffects();
});

/**
 * Opening Animation Logic
 */
function setupOpeningAnimation() {
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');

    if (!openingScreen) return;

    // Prevent scrolling during opening
    document.body.style.overflow = 'hidden';

    let animationStarted = false;
    let converged = false;

    const startAnimation = () => {
        if (animationStarted || converged) return;

        animationStarted = true;
        openingScreen.classList.add('mouse-moved');

        // Start convergence after image and text move
        setTimeout(() => {
            if (converged) return;
            converged = true;
            openingScreen.classList.add('converged');

            // Fade out opening screen and show main content
            setTimeout(() => {
                openingScreen.classList.add('fade-out');

                setTimeout(() => {
                    openingScreen.style.display = 'none';

                    if (mainContent) mainContent.classList.add('show');
                    if (header) header.classList.add('show');

                    // Allow scrolling if menu is not active
                    if (!navMenu || !navMenu.classList.contains('active')) {
                        document.body.style.overflow = 'auto';
                    }
                }, 1000); // Wait for fade-out
            }, 800); // Wait for convergence
        }, 800); // Wait for initial move
    };

    window.addEventListener('wheel', startAnimation);
    document.addEventListener('touchmove', startAnimation);
    openingScreen.addEventListener('click', startAnimation);
}

/**
 * Smooth Scrolling for Anchor Links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/**
 * Scroll Observer for Section Animations
 */
function setupScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Delay observation slightly to ensure layout is settled and main content is visible
    setTimeout(() => {
        document.querySelectorAll('section, .animate-on-scroll').forEach(section => {
            observer.observe(section);
        });
    }, 2000);
}

/**
 * Header Background and Back-to-Top Button
 */
function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top');

    if (!header && !backToTopButton) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header background
        if (header) {
            header.style.background = scrollY > 100 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)';
        }

        // Back-to-Top Button
        if (backToTopButton) {
            if (scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    });
}

/**
 * Mobile Menu Toggle and interaction
 */
function setupMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const mainContent = document.getElementById('mainContent');

    if (!navMenu || !hamburger) return;

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            // Only re-enable scroll if main content is shown (opening animation done)
            // If mainContent doesn't exist, we assume it's safe to scroll.
            if (!mainContent || mainContent.classList.contains('show')) {
                document.body.style.overflow = 'auto';
            }
        }
    };

    // Hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling if needed
        toggleMenu();
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/**
 * Card Hover Effects
 */
function setupCardHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

