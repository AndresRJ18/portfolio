/* ============================================
   ANDRÉS RODAS - PORTFOLIO
   JavaScript for Interactions & Animations
   ============================================ */

// ============================================
// DOM Elements
// ============================================
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const langOptions = document.querySelectorAll('.lang-option');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

// ============================================
// Language Switcher (ES/EN)
// ============================================
let currentLang = 'es';

function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'es';
    currentLang = savedLang;
    updateLanguage(currentLang);
    updateLangToggle();
}

function updateLanguage(lang) {
    // Update all elements with data-en and data-es attributes
    const translatableElements = document.querySelectorAll('[data-en][data-es]');
    
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('language', lang);
}

function updateLangToggle() {
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

langOptions?.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        if (selectedLang !== currentLang) {
            currentLang = selectedLang;
            updateLanguage(currentLang);
            updateLangToggle();
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        mobileToggle?.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-toggle')) {
        navMenu?.classList.remove('active');
        mobileToggle?.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling for Navigation
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Particle Animation Background
// ============================================
class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 60;
        this.maxDistance = 150;
        this.mouse = { x: null, y: null };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.getParticleColor();
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.getLineColor(opacity);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
            
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - (distance / 150);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.getAccentColor(opacity);
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    getParticleColor() {
        const theme = document.body.getAttribute('data-theme');
        return theme === 'dark' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 119, 204, 0.6)';
    }
    
    getLineColor(opacity) {
        const theme = document.body.getAttribute('data-theme');
        return theme === 'dark' 
            ? `rgba(0, 212, 255, ${opacity * 0.3})` 
            : `rgba(0, 119, 204, ${opacity * 0.3})`;
    }
    
    getAccentColor(opacity) {
        const theme = document.body.getAttribute('data-theme');
        return theme === 'dark' 
            ? `rgba(0, 212, 255, ${opacity * 0.8})` 
            : `rgba(0, 119, 204, ${opacity * 0.8})`;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// Initialize particle network
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    new ParticleNetwork(canvas);
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
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

// Observe sections, cards, and other animated elements
const animatedElements = document.querySelectorAll('section, .skill-card, .project-card, .stat-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Smooth Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Copy Email on Click
// ============================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.href.replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = currentLang === 'es' ? '¡Email copiado!' : 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--accent-primary);
                    color: var(--bg-primary);
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3);
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                `;
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        }
    });
});

// ============================================
// Project Card Hover Effects
// ============================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    
    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// Typing Animation for Hero (Optional)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing animation on hero title
// const heroName = document.querySelector('.title-name');
// if (heroName) {
//     const originalText = heroName.textContent;
//     typeWriter(heroName, originalText, 80);
// }

console.log('%c🚀 Portfolio loaded successfully!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%c⚡ Built with passion for Cloud & AI', 'color: #b8a89a; font-size: 12px;');
