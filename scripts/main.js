document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    const hiddenElements = document.querySelectorAll('.section-hidden');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Optional: Stop observing once it has animated in once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if you want the animation to repeat on scroll up/down
                entry.target.classList.remove('section-visible');
            }
        });
    }, observerOptions);

    // Start observing the hidden elements
    hiddenElements.forEach((el) => scrollObserver.observe(el));

    // Optional navigation scroll offset handling for fixed header if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Modal Logic ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');

    // Modal Details Elements
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');

    // Project data extracted from resume
    const projectData = {
        '1': {
            title: 'SmartQueue',
            image: 'images/project_1.jpg',
            desc: 'Developed a React Native app for digital OPD queue and appointment management. Integrated AI-based symptom triage to auto-assign medical departments and a QR-based token system with real-time tracking.',
            tech: ['React Native', 'AI Integration', 'QR System']
        },
        '2': {
            title: 'EVCONNECT',
            image: 'images/project_2.jpg',
            desc: 'Designed a platform connecting EV users with nearby home chargers. Enabled map-based discovery and slot booking. Developed concept for decentralized network and designed clean UI/UX using Antigravity.',
            tech: ['Antigravity', 'UI/UX Design', 'Maps API']
        },
        '3': {
            title: 'Smart Pill Dispenser',
            image: 'images/project_3.jpg',
            desc: 'Automated medication dispensing system based on user-defined schedules. Implemented reminder notifications and caregiver alerts to reduce missed doses. Designed the workflow including time monitoring and dispensing mechanism.',
            tech: ['Hardware/IoT', 'Systems Design']
        }
    };

    function openModal(id) {
        const data = projectData[id];
        if (!data) return;

        // Populate Modal
        modalImg.src = data.image;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;

        // Populate Tech Tags
        modalTech.innerHTML = '';
        data.tech.forEach(techStr => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = techStr;
            modalTech.appendChild(span);
        });

        // Show Modal
        modal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Attach Listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            openModal(id);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Escape Key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Dynamic Cursor Glow Tracking
    const glowElement = document.getElementById('cursor-glow');
    if (glowElement) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            glowElement.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        });
    }

    // Floating Chatbot Menu Toggle
    const chatbotBtn = document.getElementById('chatbot-btn');
    const floatingMenu = document.getElementById('floating-menu');
    if (chatbotBtn && floatingMenu) {
        chatbotBtn.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');
            const icon = chatbotBtn.querySelector('i');
            if (floatingMenu.classList.contains('active')) {
                icon.classList.remove('fa-message');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-message');
            }
        });
    }

    // Navbar Scroll Tracking (Floating Pill)
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');

            // Switch the FontAwesome icon between sun and moon
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // Resume Popup Logic
    const resumePopup = document.getElementById('resume-popup');
    if (resumePopup) {
        setTimeout(() => {
            resumePopup.classList.add('show');
            setTimeout(() => {
                resumePopup.classList.remove('show');
            }, 4500); // 4.5 seconds visibility
        }, 500); // appear 500ms after load
    }
});
