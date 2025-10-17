/* ==========================================================================
   JAVASCRIPT - PRÁTICAS RECOMENDADAS MÁXIMAS
   ========================================================================== */

// Strict mode
'use strict';

// Variáveis globais
const app = {
    name: 'Texas Viagens',
    version: '2.0.0',
    environment: 'production'
};

// Utilitários de acessibilidade
const a11y = {
    // Anunciar mensagens para leitores de tela
    announce(message, priority = 'polite') {
        const announcer = document.getElementById('aria-announcer') || this.createAnnouncer();
        announcer.setAttribute('aria-live', priority);
        announcer.textContent = message;
        
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    },
    
    createAnnouncer() {
        const announcer = document.createElement('div');
        announcer.id = 'aria-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
        return announcer;
    },
    
    // Gerenciar foco
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
};

// Debounce para performance
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para eventos de scroll
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading de imagens
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
                
                a11y.announce(`Imagem ${img.alt} carregada`);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// Observar animações ao scroll
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Verificar preferência de movimento reduzido
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        }
    });
}, {
    threshold: 0.1
});

// Validação de formulário
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.touched = {};
        
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        // Prevenir envio padrão
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validação em tempo real
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', debounce(() => this.validateField(input), 300));
        });
        
        // Contador de caracteres
        const textarea = this.form.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', () => this.updateCharCount(textarea));
        }
    }
    
    validateField(field) {
        const { name, value, type, required } = field;
        this.touched[name] = true;
        
        let error = '';
        
        // Validar campo obrigatório
        if (required && !value.trim()) {
            error = `${this.getFieldLabel(name)} é obrigatório`;
        }
        
        // Validação específica por tipo
        if (value.trim() && type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Por favor, insira um e-mail válido';
            }
        }
        
        if (value.trim() && type === 'tel') {
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                error = 'Por favor, insira um telefone válido';
            }
        }
        
        // Validação de comprimento
        if (field.maxLength > 0 && value.length > field.maxLength) {
            error = `${this.getFieldLabel(name)} excede o limite de ${field.maxLength} caracteres`;
        }
        
        if (field.minLength > 0 && value.trim().length < field.minLength && value.trim().length > 0) {
            error = `${this.getFieldLabel(name)} deve ter pelo menos ${field.minLength} caracteres`;
        }
        
        this.errors[name] = error;
        this.displayError(field, error);
        
        return !error;
    }
    
    getFieldLabel(name) {
        const label = this.form.querySelector(`label[for="${name}"]`);
        return label ? label.textContent.replace('*', '').trim() : name;
    }
    
    displayError(field, error) {
        const errorElement = document.getElementById(`${field.name}-error`);
        const helpElement = document.getElementById(`${field.name}-help`);
        
        if (errorElement) {
            errorElement.textContent = error;
            field.setAttribute('aria-invalid', error ? 'true' : 'false');
            
            if (error) {
                field.setAttribute('aria-describedby', `${field.name}-error`);
                a11y.announce(error, 'assertive');
            } else {
                if (helpElement) {
                    field.setAttribute('aria-describedby', `${field.name}-help`);
                } else {
                    field.removeAttribute('aria-describedby');
                }
            }
        }
    }
    
    updateCharCount(textarea) {
        const charCountElement = document.getElementById('char-count');
        if (!charCountElement) return;
        
        const count = textarea.value.length;
        const max = textarea.maxLength || 500;
        
        charCountElement.textContent = `${count}/${max} caracteres`;
        
        // Mudar cor baseado no uso
        if (count > max) {
            charCountElement.style.color = '#d32f2f';
            charCountElement.setAttribute('aria-label', `Limite excedido: ${count} de ${max} caracteres`);
        } else if (count >= max * 0.9) {
            charCountElement.style.color = '#f57c00';
            charCountElement.setAttribute('aria-label', `Próximo ao limite: ${count} de ${max} caracteres`);
        } else {
            charCountElement.style.color = '#666';
            charCountElement.setAttribute('aria-label', `${count} de ${max} caracteres usados`);
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.submitForm();
        } else {
            // Focar no primeiro erro
            const firstError = this.form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
                a11y.announce('Por favor, corrija os erros no formulário', 'assertive');
            }
        }
    }
    
    submitForm() {
        // Simular envio
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Dados do formulário:', data);
        
        // Mostrar mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.setAttribute('role', 'alert');
        successMessage.setAttribute('aria-live', 'assertive');
        successMessage.innerHTML = `
            <p><strong>Mensagem enviada com sucesso!</strong></p>
            <p>Entraremos em contato em breve.</p>
        `;
        
        this.form.insertAdjacentElement('beforebegin', successMessage);
        this.form.reset();
        
        a11y.announce('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'assertive');
        
        // Resetar validação
        this.errors = {};
        this.touched = {};
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
        });
        
        // Remover erros
        const errorElements = this.form.querySelectorAll('.form-error');
        errorElements.forEach(el => el.textContent = '');
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // Scroll para a mensagem
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        successMessage.focus();
    }
}

// Navegação suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const offsetTop = element.offsetTop - 80;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    // Focar no elemento após scroll
    setTimeout(() => {
        element.setAttribute('tabindex', '-1');
        element.focus();
        a11y.announce(`Navegou para ${element.getAttribute('aria-label') || target}`);
    }, 500);
}

// Indicador de página atual na navegação
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Performance monitoring
const performanceMonitor = {
    marks: {},
    
    mark(name) {
        this.marks[name] = performance.now();
    },
    
    measure(name, startMark) {
        if (!this.marks[startMark]) return;
        
        const duration = performance.now() - this.marks[startMark];
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
        return duration;
    }
};

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Erro ao registrar Service Worker:', error);
            });
    });
}

// Detecção de conectividade
window.addEventListener('online', () => {
    a11y.announce('Conexão restaurada', 'polite');
    console.log('🌐 Online');
});

window.addEventListener('offline', () => {
    a11y.announce('Conexão perdida. Trabalhando offline.', 'assertive');
    console.log('📴 Offline');
});

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor.mark('init-start');
    
    console.log(`🚀 ${app.name} v${app.version} inicializado`);
    
    // Inicializar validador de formulário
    const validator = new FormValidator('contactForm');
    
    // Configurar links de navegação
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });
    
    // Configurar skip links
    const skipLinks = document.querySelectorAll('.skip-to-content');
    skipLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Lazy loading de imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.destination-card, .feature');
    animatedElements.forEach(el => animationObserver.observe(el));
    
    // Atualizar ano no footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Scroll event com throttle
    window.addEventListener('scroll', throttle(updateActiveNavLink, 200));
    
    // Detectar preferências do usuário
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    console.log('🎨 Modo escuro:', darkModeQuery.matches);
    console.log('🎭 Movimento reduzido:', reducedMotionQuery.matches);
    console.log('🔆 Alto contraste:', highContrastQuery.matches);
    
    // Monitorar mudanças de preferências
    darkModeQuery.addEventListener('change', (e) => {
        console.log('🌓 Modo escuro alterado:', e.matches);
        a11y.announce(e.matches ? 'Modo escuro ativado' : 'Modo claro ativado');
    });
    
    reducedMotionQuery.addEventListener('change', (e) => {
        console.log('⚡ Preferência de movimento alterada:', e.matches);
    });
    
    // Trap focus no formulário quando focado
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        a11y.trapFocus(contactForm);
    }
    
    // Log de performance
    performanceMonitor.measure('Inicialização completa', 'init-start');
    
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('📊 LCP:', entry.renderTime || entry.loadTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('⚡ FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('📏 CLS:', clsValue);
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
});

// Error handling global
window.addEventListener('error', (e) => {
    console.error('❌ Erro global:', e.message);
    a11y.announce('Ocorreu um erro. Por favor, tente novamente.', 'assertive');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rejeitada:', e.reason);
});

// Exportar para debugging
window.app = app;
window.a11y = a11y;
window.performanceMonitor = performanceMonitor;
