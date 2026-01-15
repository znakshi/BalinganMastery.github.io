// ===== Dark Mode Toggle =====
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to false
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDark);
});

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Form Validation and Submission =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name) {
        showAlert('Please enter your name.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }

    if (!message) {
        showAlert('Please enter a message.', 'error');
        return;
    }

    // If validation passes
    showAlert(`Thank you, ${name}! Your message has been sent successfully.`, 'success');

    // Clear form
    this.reset();
});

// ===== Email Validation Function =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Alert Function =====
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Style the alert
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#063108' : '#093b07'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
        font-weight: 500;
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 4 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 4000);
}

// ===== Animation Keyframes =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Interactive Timeline =====
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Animate timeline items on scroll
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineObserver.observe(item);
});

// ===== Dynamic Content Loading for Timeline =====
function loadTimelineData() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.offsetHeight; // Trigger reflow
            item.style.transition = 'all 0.6s ease-in-out';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// Load timeline data when page loads
window.addEventListener('load', function() {
    loadTimelineData();
});

// ===== Smooth Scroll Navigation =====

// ===== Scroll Animation for Sections =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// ===== Highlight Active Navigation Link =====
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.borderBottom = 'none';
        link.style.paddingBottom = '0px';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.borderBottom = '2px solid #07360b';
            link.style.paddingBottom = '3px';
        }
    });
});

// ===== Interactive Skill Hover Effect =====
document.querySelectorAll('.skill-list li').forEach(skill => {
    skill.addEventListener('click', function() {
        const skillName = this.textContent;
        showAlert(`You selected: ${skillName}`, 'success');
    });
});

// ===== Project Card Click Effect =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f0f0f0';
    });

    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--light-bg)';
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', function() {
    document.querySelector('.header').style.animation = 'fadeIn 0.6s ease-in-out';
});

// ===== Smooth Scroll to Top on Logo Click =====
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Console Welcome Message =====
console.log('%cWelcome to My Portfolio!', 'color: #0c4b19; font-size: 20px; font-weight: bold;');
console.log('%cThanks for visiting. Feel free to explore!', 'color: #0c4919; font-size: 14px;');
