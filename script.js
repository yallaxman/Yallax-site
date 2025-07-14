// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const botButtons = document.querySelectorAll('.bot-button');
const heroButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
const contactForm = document.querySelector('.contact-form');
const contactInput = document.querySelector('.contact-input');
const cards = document.querySelectorAll('.card');
const aiFeatures = document.querySelectorAll('.ai-feature');

// Page Load Animation
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for animations
    document.body.classList.add('loaded');
    
    // Initialize AOS (Animate On Scroll) alternative
    initScrollAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize AI features
    initAIFeatures();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize particle effect
    initParticleEffect();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Bot button interactions
    botButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.bot-card');
            const botType = card.querySelector('h3').textContent;
            showBotModal(botType);
        });
    });
    
    // Hero button interactions
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Попробовать')) {
                scrollToSection('#contact');
            } else if (this.textContent.includes('демо')) {
                showDemoModal();
            }
        });
    });
    
    // Card hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// AI Features Animation
function initAIFeatures() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger AI brain animation
                if (entry.target.classList.contains('ai-brain')) {
                    animateAIBrain();
                }
            }
        });
    }, { threshold: 0.5 });
    
    aiFeatures.forEach(feature => {
        observer.observe(feature);
    });
    
    const aiBrain = document.querySelector('.ai-brain');
    if (aiBrain) {
        observer.observe(aiBrain);
    }
}

// AI Brain Animation
function animateAIBrain() {
    const nodes = document.querySelectorAll('.brain-node');
    const connections = document.querySelectorAll('.brain-connection');
    
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'pulse 1.5s ease-in-out infinite';
            node.style.animationDelay = `${index * 0.2}s`;
        }, index * 200);
    });
    
    connections.forEach((connection, index) => {
        setTimeout(() => {
            connection.style.animation = 'connectionPulse 2s ease-in-out infinite';
            connection.style.animationDelay = `${index * 0.3}s`;
        }, index * 300);
    });
}

// Contact Form
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = contactInput.value.trim();
        
        if (!email) {
            showNotification('Пожалуйста, введите ваш email', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        // Simulate API call
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.textContent;
        
        button.textContent = 'Отправляем...';
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('Спасибо! Мы свяжемся с вами в ближайшее время', 'success');
            contactInput.value = '';
            button.textContent = originalText;
            button.disabled = false;
            
            // Trigger celebration animation
            createCelebrationEffect();
        }, 2000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.bot-card, .ai-feature, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Particle Effect
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 107, 53, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 10}s;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Utility Functions
function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                    'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function showBotModal(botType) {
    const modal = document.createElement('div');
    modal.className = 'bot-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>🤖 ${botType}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Этот бот поможет вам автоматизировать создание контента с помощью современных ИИ технологий.</p>
                <div class="modal-features">
                    <div class="modal-feature">
                        <span class="feature-icon">✨</span>
                        <span>Генерация уникального контента</span>
                    </div>
                    <div class="modal-feature">
                        <span class="feature-icon">⚡</span>
                        <span>Мгновенная обработка</span>
                    </div>
                    <div class="modal-feature">
                        <span class="feature-icon">🎯</span>
                        <span>Персонализированный подход</span>
                    </div>
                </div>
                <div class="modal-ai-demo">
                    <div class="ai-thinking">
                        <div class="thinking-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p>ИИ генерирует контент...</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary" onclick="startBotDemo('${botType}')">Попробовать сейчас</button>
                <button class="btn-secondary modal-close">Закрыть</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        });
    });
    
    // Start AI demo
    setTimeout(() => {
        simulateAIGeneration(modal);
    }, 1000);
}

function startBotDemo(botType) {
    showNotification(`Демо ${botType} запущено! Проверьте ваш Telegram`, 'success');
}

function simulateAIGeneration(modal) {
    const aiDemo = modal.querySelector('.modal-ai-demo');
    const thinkingElement = modal.querySelector('.ai-thinking');
    
    setTimeout(() => {
        thinkingElement.style.display = 'none';
        
        const result = document.createElement('div');
        result.className = 'ai-result';
        result.innerHTML = `
            <div class="generated-content">
                <h4>✨ Сгенерированный контент:</h4>
                <p>"Революция в создании контента начинается здесь! 🚀 Откройте новые возможности с нашими ИИ-ботами для автоматизации постов в соцсетях. #AI #ContentCreation #Innovation"</p>
            </div>
        `;
        result.style.cssText = `
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-top: 16px;
            animation: slideInUp 0.5s ease-out;
        `;
        
        aiDemo.appendChild(result);
    }, 3000);
}

function showDemoModal() {
    const demoModal = document.createElement('div');
    demoModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content demo-modal">
            <div class="modal-header">
                <h2>🎬 Демо презентация</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="demo-video">
                    <div class="video-placeholder">
                        <div class="play-button">▶</div>
                        <p>Видео демонстрация возможностей наших ИИ-ботов</p>
                    </div>
                </div>
                <div class="demo-features">
                    <h3>Что вы увидите в демо:</h3>
                    <ul>
                        <li>🎯 Создание контента в реальном времени</li>
                        <li>📊 Аналитика и оптимизация постов</li>
                        <li>🤖 Интеграция с популярными платформами</li>
                        <li>⚡ Скорость и качество генерации</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary">Запросить полную демонстрацию</button>
                <button class="btn-secondary modal-close">Закрыть</button>
            </div>
        </div>
    `;
    
    demoModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(demoModal);
    
    // Close functionality
    const closeButtons = demoModal.querySelectorAll('.modal-close, .modal-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            demoModal.remove();
        });
    });
}

function createCelebrationEffect() {
    const colors = ['#ff6b35', '#ff8e3c', '#ffab3f'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall 3s ease-out forwards;
                transform: translate(-50%, -50%) translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// CSS Animations (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes confettiFall {
        0% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) translateY(300px) rotate(720deg); opacity: 0; }
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 107, 53, 0.2);
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: slideInUp 0.3s ease-out;
    }
    
    .modal-header {
        padding: 24px;
        border-bottom: 1px solid rgba(255, 107, 53, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        color: #ff6b35;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 107, 53, 0.2);
    }
    
    .modal-body {
        padding: 24px;
        color: #b3b3b3;
    }
    
    .modal-footer {
        padding: 24px;
        border-top: 1px solid rgba(255, 107, 53, 0.1);
        display: flex;
        gap: 16px;
        justify-content: flex-end;
    }
    
    .modal-features {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 20px 0;
    }
    
    .modal-feature {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 107, 53, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(255, 107, 53, 0.1);
    }
    
    .thinking-dots {
        display: flex;
        gap: 4px;
        margin-bottom: 8px;
    }
    
    .thinking-dots span {
        width: 8px;
        height: 8px;
        background: #ff6b35;
        border-radius: 50%;
        animation: thinking 1.5s infinite ease-in-out;
    }
    
    .thinking-dots span:nth-child(1) { animation-delay: 0s; }
    .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
    .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes thinking {
        0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
        30% { transform: scale(1.3); opacity: 1; }
    }
    
    .video-placeholder {
        background: rgba(255, 107, 53, 0.1);
        border: 2px dashed rgba(255, 107, 53, 0.3);
        border-radius: 12px;
        padding: 60px 20px;
        text-align: center;
        margin-bottom: 20px;
    }
    
    .play-button {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff6b35, #ff8e3c);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .play-button:hover {
        transform: scale(1.1);
    }
    
    .demo-features ul {
        list-style: none;
        padding: 0;
    }
    
    .demo-features li {
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 107, 53, 0.1);
    }
    
    .navbar.scrolled {
        background: rgba(0, 0, 0, 0.95);
        border-bottom-color: rgba(255, 107, 53, 0.3);
    }
`;

document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.bot-modal, .demo-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.remove();
            }
        });
    }
    
    // Ctrl/Cmd + Enter to submit contact form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (contactInput === document.activeElement) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // Limit trail length
    if (mouseTrail.length > 20) {
        mouseTrail.shift();
    }
    
    // Remove old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
});

// Export functions for global use
window.YallaxSite = {
    scrollToSection,
    showNotification,
    showBotModal,
    showDemoModal,
    startBotDemo
};