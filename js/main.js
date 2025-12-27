document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - (window.innerWidth > 768 ? 0 : navHeight);
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation and scroll progress
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (nav) {
        nav.style.setProperty('--scroll-progress', scrolled + '%');
        const progressBar = nav.querySelector('::before');
        if (nav.style) {
            nav.style.setProperty('--scroll-height', scrolled + '%');
        }
    }
}

window.addEventListener('scroll', () => {
    updateActiveNav();
    updateScrollProgress();
    
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '2px 0 15px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '2px 0 10px rgba(0, 0, 0, 0.03)';
    }
});

// Initialize on load
updateActiveNav();
updateScrollProgress();

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-category, .education-card, .stat-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('%c👋 Hey there!', 'font-size: 24px; color: #6366f1; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px; color: #64748b;');

// Auto-update copyright year
const updateCopyrightYear = () => {
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Arun Kumar S. All rights reserved.`;
    }
};

// Auto-calculate years of experience
const updateExperience = () => {
    // Start from internship at Zoho Schools (2020)
    const startDate = new Date('2020-01-01');
    const currentDate = new Date();
    
    const diffTime = Math.abs(currentDate - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const yearsExp = Math.floor(diffYears);
    const monthsExp = Math.floor((diffYears - yearsExp) * 12);
    
    // Update experience timeline
    const timelineDate = document.querySelector('.timeline-date');
    if (timelineDate) {
        let expText = `May 2022 - Present (${Math.floor((new Date() - new Date('2022-05-01')) / (1000 * 60 * 60 * 24 * 365.25))}+ years`;
        const fullTimeMonths = Math.floor(((new Date() - new Date('2022-05-01')) / (1000 * 60 * 60 * 24 * 365.25) - Math.floor((new Date() - new Date('2022-05-01')) / (1000 * 60 * 60 * 24 * 365.25))) * 12);
        if (fullTimeMonths > 0) {
            expText += `, ${fullTimeMonths} months`;
        }
        expText += ')';
        timelineDate.textContent = expText;
    }
    
    // Update stats card with total experience (including internship)
    const statCard = document.querySelector('.stat-card h3');
    if (statCard && statCard.textContent.includes('+')) {
        statCard.textContent = `${yearsExp}+`;
    }
};

// Initialize updates
updateCopyrightYear();
updateExperience();

// Update every minute to keep it fresh
setInterval(() => {
    updateCopyrightYear();
    updateExperience();
}, 60000);

// Download Resume functionality
const downloadResumeBtn = document.getElementById('downloadResume');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function() {
        // Wait for print dialog to open
        setTimeout(() => {
            window.print();
        }, 300);
    });
}