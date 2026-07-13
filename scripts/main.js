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
                observer.unobserve(entry.target); // Stop observing once it has animated in once
            }
        });
    }, observerOptions);

    // Start observing the hidden elements
    hiddenElements.forEach((el) => scrollObserver.observe(el));

    // Optional navigation scroll offset handling for fixed header if needed
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
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
    const modalLink = document.getElementById('modal-link');

    // Project data extracted from resume
    const projectData = {
        '1': {
            title: 'GST RAG Assistant',
            image: 'images/gst_rag_logo.png',
            desc: [
                'Built an entire RAG application to retrieve answers to queries in GST Acts and Rules.',
                'Improved retrieval by Cross-Encoder reranking and using Streamlit interface to interact with the retrieval model through chat.',
                'Optimized and tested iteratively to achieve manual retrieval accuracy of 85%.'
            ],
            tech: ['Python', 'Streamlit', 'ChromaDB', 'Sentence Transformer', 'OpenRouter'],
            link: ''
        },
        '2': {
            title: 'SmartQueue — Healthcare App Architecture',
            image: 'images/Q_Management_Logo.jpg',
            desc: [
                'Engineered a high-performance cross-platform React Native application designed for real-time digital outpatient department (OPD) queue tracking and comprehensive clinic appointment booking systems.',
                'Integrated an intelligent AI-based symptom classification module that parses patient inputs to automatically route cases to appropriate medical specialties, slashing manual triage overhead.',
                'Designed and implemented a tamper-proof QR-code token framework enabling real-time queue position tracking, live processing updates, and push notifications for status updates.'
            ],
            tech: ['React Native', 'AI Symptom Triage', 'Real-Time Database'],
            link: 'https://smart-queue-management-psi.vercel.app/'
        },
        '3': {
            title: 'EVCONNECT',
            image: 'images/EV_Connect_Logo.jpg',
            desc: 'Designed a platform connecting EV users with nearby home chargers. Enabled map-based discovery and slot booking. Developed concept for decentralized network and designed clean UI/UX using Antigravity.',
            tech: ['Antigravity', 'UI/UX Design', 'Maps API'],
            link: 'https://saisujith97.github.io/EV-Connect/'
        },
        '4': {
            title: 'Smart Pill Dispenser System',
            image: 'images/project_3.jpg',
            desc: [
                'Designed a hardware-software workflow system that handles real-time scheduling logic and precise physical mechanisms to automatically release prescription medications based on user configurations.',
                'Developed an asynchronous notification engine pushing instant SMS alerts and dedicated caregiver notifications to drastically minimize missed medication dosages and improve chronic care compliance.'
            ],
            tech: ['IoT Integration', 'Notification Engines', 'Workflow Logic'],
            link: ''
        }
    };

    function openModal(id) {
        const data = projectData[id];
        if (!data) return;

        // Populate Modal
        modalImg.src = data.image;
        modalTitle.textContent = data.title;
        
        // Handle array or string description
        if (Array.isArray(data.desc)) {
            modalDesc.innerHTML = `<ul style="margin: 10px 0 0 15px; padding: 0; list-style-type: disc;">${data.desc.map(bullet => `<li style="margin-bottom: 8px; color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem; text-align: left;">${bullet}</li>`).join('')}</ul>`;
        } else {
            modalDesc.textContent = data.desc;
        }

        // Populate Tech Tags
        modalTech.innerHTML = '';
        data.tech.forEach(techStr => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = techStr;
            modalTech.appendChild(span);
        });

        // Set Link
        if (data.link) {
            modalLink.href = data.link;
            modalLink.style.display = 'inline-flex';
        } else {
            modalLink.href = '#';
            modalLink.style.display = 'none';
        }

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

    // Dynamic Cursor Glow Tracking with requestAnimationFrame Interpolation
    const glowElement = document.getElementById('cursor-glow');
    if (glowElement && window.matchMedia('(hover: hover)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;
        const speed = 0.08; // smooth trailing speed
        let hasMoved = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            hasMoved = true;
        });

        function animateGlow() {
            if (hasMoved) {
                glowX += (mouseX - glowX) * speed;
                glowY += (mouseY - glowY) * speed;
                glowElement.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;
            }
            requestAnimationFrame(animateGlow);
        }
        requestAnimationFrame(animateGlow);
    } else if (glowElement) {
        glowElement.style.display = 'none';
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

    // Mobile Navigation Menu Drawer Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (menuToggle.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close drawer when clicking a link
        document.querySelectorAll('.nav-bar-anchr-tags').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
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
