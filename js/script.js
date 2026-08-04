/**
 * Coach Mahmoud Hamada Landing Page Interactive Functionality
 * Core JS Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // Configuration Settings
    const CONFIG = {
        whatsappNumber: '201012345678', // Egypt country code + phone number (Modify this to the trainer's actual number)
        scrollOffset: 80,
        testimonialInterval: 5000
    };

    /* ==========================================================================
       1. Navigation Bar Scroll Effect & Hamburger Menu
       ========================================================================== */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky transparent to glassmorphic header
    const handleHeaderScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Run on startup

    // Mobile Hamburger Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.contains('open');
            toggleMobileMenu(!isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== navToggle) {
                toggleMobileMenu(false);
            }
        });
    }

    const toggleMobileMenu = (open) => {
        if (open) {
            navToggle.classList.add('open');
            navMenu.classList.add('open');
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Close menu when clicking any nav link & handle active states manually if clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    });


    /* ==========================================================================
       2. Scroll Reveal Animation using IntersectionObserver
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver support
        revealElements.forEach(el => el.classList.add('active'));
    }


    /* ==========================================================================
       3. Active Navigation Link Tracking on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const handleActiveLinkScroll = () => {
        const scrollPosition = window.scrollY + CONFIG.scrollOffset + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const targetLink = document.getElementById(`nav-link-${sectionId}`);

            if (targetLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', handleActiveLinkScroll);


    /* ==========================================================================
       4. Animated Statistics Counter
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1600; // Total duration in ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out cubic progress curve
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);

            el.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target; // Ensure exact final value
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => statsObserver.observe(num));
    } else {
        // Fallback
        statNumbers.forEach(num => {
            num.textContent = num.getAttribute('data-target');
        });
    }


    /* ==========================================================================
       5. Certificate & Transformation Lightbox Modal
       ========================================================================== */
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggerCards = document.querySelectorAll('.certificate-card, .trans-img-container');

    const openLightbox = (imgSrc, altText) => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = altText || 'Expanded fitness image';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock scrolling
        setTimeout(() => {
            if (lightboxImg) lightboxImg.src = '';
        }, 300);
    };

    triggerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const imgSrc = card.getAttribute('data-img');
            const imgEl = card.querySelector('img');
            const altText = imgEl ? imgEl.alt : '';
            if (imgSrc) {
                openLightbox(imgSrc, altText);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    // Keyboard support (Escape key close)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });


    /* ==========================================================================
       6. Testimonials Carousel / Slider
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    let currentSlide = 0;
    let testimonialTimer;

    const showSlide = (index) => {
        if (testimonialSlides.length === 0) return;

        // Reset indexes
        if (index >= testimonialSlides.length) currentSlide = 0;
        else if (index < 0) currentSlide = testimonialSlides.length - 1;
        else currentSlide = index;

        // Translate the testimonials container
        const wrapper = document.getElementById('testimonialsWrapper');
        if (wrapper) {
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Toggle classes
        testimonialSlides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    const startTestimonialTimer = () => {
        stopTestimonialTimer();
        testimonialTimer = setInterval(nextSlide, CONFIG.testimonialInterval);
    };

    const stopTestimonialTimer = () => {
        if (testimonialTimer) clearInterval(testimonialTimer);
    };

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startTestimonialTimer(); // Reset auto rotation timer
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startTestimonialTimer(); // Reset auto rotation timer
        });
    }

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startTestimonialTimer();
        });
    });

    // Start auto slide rotation
    startTestimonialTimer();


    /* ==========================================================================
       7. FAQ Accordion Transition Handler
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close other open FAQ items (Optional - Accordion mode)
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    activeItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current FAQ item
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            }
        });
    });


    /* ==========================================================================
       8. Pricing Package Button Select Behavior
       ========================================================================== */
    const selectPackageBtns = document.querySelectorAll('.select-pkg-btn');
    const packageDropdown = document.getElementById('selectedPackage');

    selectPackageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkgName = btn.getAttribute('data-package');
            if (packageDropdown && pkgName) {
                packageDropdown.value = pkgName;
                
                // Highlight dropdown visually
                packageDropdown.focus();
                packageDropdown.style.borderColor = 'var(--primary)';
                setTimeout(() => {
                    packageDropdown.style.borderColor = '';
                }, 1000);
            }
        });
    });


    /* ==========================================================================
       9. Inquiry Form Validation & WhatsApp Redirection
       ========================================================================== */
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve form values
            const fullName = document.getElementById('fullName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const age = document.getElementById('userAge').value.trim();
            const height = document.getElementById('userHeight').value.trim();
            const weight = document.getElementById('userWeight').value.trim();
            const city = document.getElementById('userCity').value.trim();
            const selectedPackage = document.getElementById('selectedPackage').value;

            // Form validations
            if (!fullName || !phoneNumber || !age || !height || !weight || !city || !selectedPackage) {
                alert('Please fill out all required fields.');
                return;
            }

            // Basic phone digits check (Egyptian number or general international structure)
            const cleanPhone = phoneNumber.replace(/[\s\-\+\(\)]/g, '');
            if (cleanPhone.length < 8) {
                alert('Please enter a valid WhatsApp phone number.');
                return;
            }

            // Formulate WhatsApp message with emoji details
            const message = 
`🔥 NEW BIOMETRIC ASSESSMENT 🔥

👤 Name: ${fullName}
📞 Client WhatsApp: ${phoneNumber}
🎂 Age: ${age} years old
📏 Height: ${height} cm
⚖️ Weight: ${weight} kg
📍 Location: ${city}
⚡ Selected Program: ${selectedPackage}

Looking forward to starting my physical transformation program with Coach Mahmoud!`;

            // Encode message and perform redirection
            const encodedText = encodeURIComponent(message);
            const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;

            // Open WhatsApp link in new tab
            window.open(waUrl, '_blank');
        });
    }

});
