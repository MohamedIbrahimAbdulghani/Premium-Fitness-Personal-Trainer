/**
 * Coach Mahmoud Hamada Landing Page interactive Functionality
 * Optimized for Bootstrap 5 & Premium Redesign
 */

document.addEventListener('DOMContentLoaded', () => {

    // Configuration
    const CONFIG = {
        whatsappNumber: '+201208910206', // Egypt country code + phone number
        scrollOffset: 90
    };

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById('header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    /* ==========================================================================
       2. Scroll Reveal Animation
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    /* ==========================================================================
       3. Stats Counter Animation
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeProgress * target);

            el.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => statsObserver.observe(num));
    }

    /* ==========================================================================
       4. Bootstrap Lightbox Integration (Certificates)
       ========================================================================== */
    const lightboxModal = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    // بنستخدم السيليكتور الجديد بتاع الجاليري بدل القديم
    const triggerCards = document.querySelectorAll('.certificate-card-new, .trans-gallery-card');

    if (lightboxModal) {
        const bsModal = new bootstrap.Modal(lightboxModal);

        triggerCards.forEach(card => {
            card.addEventListener('click', () => {
                const imgSrc = card.getAttribute('data-img');
                if (imgSrc) {
                    lightboxImg.src = imgSrc;
                    bsModal.show();
                }
            });
        });

        // Clear image on close for performance
        lightboxModal.addEventListener('hidden.bs.modal', () => {
            lightboxImg.src = '';
        });
    }

    /* ==========================================================================
       4b. Transformation Gallery Modal (Fit To Screen Fix)
       ------------------------------------------------------------------------
       الصور بتاعة "Success Stories" بتفتح موديل باسم #imageModal عن طريق
       data-bs-toggle="modal" الخاصة ببوتستراب نفسها، لكن مفيش كود كان بياخد
       رابط الصورة (data-image) ويحطه جوه <img id="modalImage">.
       عشان كده هنا بنسمع لحدث "show.bs.modal" ونجيب العنصر اللي المستخدم
       دوس عليه (relatedTarget) ونحط الصورة بتاعته جوه الموديل، بنفس الوقت
       الـ CSS بتاعة #imageModal / #modalImage بتتأكد إن الصورة تفضل جوه
       الشاشة (max-width / max-height) وميبقاش فيه أي تكبير زيادة عن اللازم.
       ========================================================================== */
    const transformationModal = document.getElementById('imageModal');
    const transformationModalImg = document.getElementById('modalImage');

    if (transformationModal && transformationModalImg) {
        transformationModal.addEventListener('show.bs.modal', (event) => {
            const trigger = event.relatedTarget;
            const imgSrc = trigger ? trigger.getAttribute('data-image') : null;
            if (imgSrc) {
                transformationModalImg.src = imgSrc;
                transformationModalImg.alt = trigger.getAttribute('data-alt') || 'Transformation';
            }
        });

        // Clear image on close for performance
        transformationModal.addEventListener('hidden.bs.modal', () => {
            transformationModalImg.src = '';
        });
    }

    /* ==========================================================================
       5. Pricing & Package Selection
       ========================================================================== */
    const selectPkgBtns = document.querySelectorAll('.select-pkg-btn');
    const packageSelect = document.getElementById('selectedPackage');

    selectPkgBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkg = btn.getAttribute('data-package');
            if (packageSelect && pkg) {
                packageSelect.value = pkg;
                // Scroll to contact form smoothly
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop - CONFIG.scrollOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       6. WhatsApp Form Submission
       ========================================================================== */
    const whatsappForm = document.getElementById('whatsappForm');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('fullName').value.trim(),
                phone: document.getElementById('phoneNumber').value.trim(),
                age: document.getElementById('userAge').value,
                goal: document.getElementById('userGoal').value,
                package: document.getElementById('selectedPackage').value,
                weight: document.getElementById('userWeight').value,
                height: document.getElementById('userHeight').value,
                experience: document.getElementById('trainingExperience').value,
                medical: document.getElementById('medicalConditions').value,
                notes: document.getElementById('userNotes').value.trim()
            };

            const message =
                `🔥 *NEW TRANSFORMATION REQUEST* 🔥

*👤 Name:* ${data.name}
*📞 Phone:* ${data.phone}
*🎂 Age:* ${data.age} years
*🎯 Goal:* ${data.goal}
*⚡ Selected Plan:* ${data.package}
*⚖️ Weight:* ${data.weight} kg
*📏 Height:* ${data.height} cm
*💪 Experience:* ${data.experience}
*🏥 Medical Conditions/Injuries:* ${data.medical}
*📝 Notes:* ${data.notes || "None"}

I am ready to start my journey with Coach Mahmoud!`;

            const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ==========================================================================
       7. Active Link Tracking
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleActiveLink = () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - CONFIG.scrollOffset - 20) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener('scroll', handleActiveLink);
    handleActiveLink();

    /* ==========================================================================
       8. Theme Toggle (Light/Dark Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const THEME_STORAGE_KEY = 'coach_theme';
    let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (sunIcon && moonIcon) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    };

    // Initialize Theme
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
        });
    }

});