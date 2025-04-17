/**
 * Electronic Music Council - Main JavaScript
 * Controls site navigation, animations, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real implementation, you would send this to your backend
                alert('Thanks for subscribing! You\'ll receive updates from the Electronic Music Council.');
                emailInput.value = '';
            }
        });
    }
});

/**
 * Mobile Navigation Functionality
 */
function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle navigation menu
            navMenu.classList.toggle('active');
            
            // Toggle menu button appearance
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Handle header transparency on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(14, 14, 20, 0.98)';
                header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.backgroundColor = 'rgba(14, 14, 20, 0.9)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

/**
 * GSAP Animations
 */
function initializeAnimations() {
    // Only initialize if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Fade in and slide up elements as they enter the viewport
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-content h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.hero .tagline', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        // Animate sections as they come into view
        const animationSections = [
            '.featured-event',
            '.mission',
            '.events-grid',
            '.latest-news',
            '.newsletter'
        ];
        
        animationSections.forEach(section => {
            const elements = document.querySelector(section);
            if (elements) {
                // Heading animations
                gsap.from(`${section} .section-header`, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out'
                });
                
                // Content animations with stagger
                gsap.from(`${section} .grid-item, ${section} .event-card, ${section} .news-card, ${section} .mission-content, ${section} .newsletter-content`, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.2
                });
            }
        });
    }
}

/**
 * Parallax Effect for background elements
 */
document.addEventListener('mousemove', function(e) {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

/**
 * Lazy Loading Images
 */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});
