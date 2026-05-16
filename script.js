// Header Scroll Effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.background = 'rgba(10, 10, 11, 0.9)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.background = 'rgba(10, 10, 11, 0.7)';
        header.style.boxShadow = 'none';
        header.style.padding = '0.8rem 0';
    }
});

// Scroll Reveal Animations via Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, observerOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Form Submission Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.textContent = 'Message Sent Successfully!';
            btn.style.background = '#818cf8';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// Modal / Lightbox Logic
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('modal-caption');
const closeModal = document.querySelector('.close-modal');

// Select all cards with data-image attribute
const badgeCards = document.querySelectorAll('.badge-card[data-image]');

badgeCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Prevent redirection if it's an 'a' tag (which they are)
        e.preventDefault();
        
        const imgSrc = this.getAttribute('data-image');
        const caption = this.querySelector('p').textContent;
        
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = caption;
        
        // Disable scroll
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
if (closeModal) {
    closeModal.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// Close on click outside image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}
// Skills Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card-v2');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
                // Trigger reveal animation again for filtered items
                card.classList.remove('active');
                setTimeout(() => {
                    card.classList.add('active');
                }, 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
    });
});
// Project Tab Switching Logic
const projectTabs = document.querySelectorAll('.project-tab');
const projectDetailCards = document.querySelectorAll('.project-details-card');

if (projectTabs.length > 0) {
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            projectTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const projectId = tab.getAttribute('data-project');

            // Hide all cards and show the selected one
            projectDetailCards.forEach(card => {
                if (card.id === `details-${projectId}`) {
                    card.style.display = 'block';
                    // Trigger reveal animation
                    card.classList.remove('active');
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });
}
