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

    // Dummy data dictionary (In a real app, this might come from a JSON file or API)
    const projectData = {
        '1': {
            title: 'Neural Net Visualizer',
            image: 'images/project_1.jpg',
            desc: 'An interactive visualization tool allowing users to build, train, and watch the learning process of deep neural networks in real-time right in the browser. Built to demystify AI architecture.',
            tech: ['Python', 'TensorFlow.js', 'React', 'D3.js']
        },
        '2': {
            title: 'Global E-Commerce',
            image: 'images/project_2.jpg',
            desc: 'A full-stack, highly scalable global marketplace application supporting multi-currency payments, international shipping APIs, and a sleek modern dashboard for vendors.',
            tech: ['Node.js', 'Express', 'MongoDB', 'Stripe API']
        },
        '3': {
            title: 'Scalable API Service',
            image: 'images/project_3.jpg',
            desc: 'A robust, load-balanced backend architecture built to handle millions of requests per minute. Features advanced rate limiting, Redis caching layers, and comprehensive test coverage.',
            tech: ['Go', 'Redis', 'Docker', 'Kubernetes']
        },
        '4': {
            title: 'Modern UI Framework',
            image: 'images/project_4.jpg',
            desc: 'An open-source, lightweight CSS framework designed for building ultra-fast dashboard interfaces. It strips away bloat and focuses on a strict, professional design language.',
            tech: ['Sass', 'HTML5', 'PostCSS']
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
            glowElement.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});
