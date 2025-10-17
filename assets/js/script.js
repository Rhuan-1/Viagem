// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação do header ao rolar a página
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Manipulação do formulário de contato com validação completa
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const mensagemInput = document.getElementById('mensagem');
    
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const mensagemError = document.getElementById('mensagem-error');
    const charCount = document.getElementById('mensagem-count');

    // Contador de caracteres para mensagem
    if (mensagemInput && charCount) {
        mensagemInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count}/500 caracteres`;
            
            if (count > 500) {
                charCount.style.color = '#e74c3c';
            } else if (count >= 450) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#666';
            }
        });
    }

    // Validação do nome
    if (nomeInput && nomeError) {
        nomeInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value.length === 0) {
                this.setAttribute('aria-invalid', 'true');
                nomeError.textContent = 'Por favor, digite seu nome';
            } else if (value.length < 3) {
                this.setAttribute('aria-invalid', 'true');
                nomeError.textContent = 'O nome deve ter pelo menos 3 caracteres';
            } else {
                this.setAttribute('aria-invalid', 'false');
                nomeError.textContent = '';
            }
        });

        nomeInput.addEventListener('input', function() {
            if (this.value.trim().length >= 3) {
                this.setAttribute('aria-invalid', 'false');
                nomeError.textContent = '';
            }
        });
    }

    // Validação do email
    if (emailInput && emailError) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const value = this.value.trim();
            
            if (value.length === 0) {
                this.setAttribute('aria-invalid', 'true');
                emailError.textContent = 'Por favor, digite seu email';
            } else if (!emailPattern.test(value)) {
                this.setAttribute('aria-invalid', 'true');
                emailError.textContent = 'Por favor, digite um email válido (exemplo: seu@email.com)';
            } else {
                this.setAttribute('aria-invalid', 'false');
                emailError.textContent = '';
            }
        });

        emailInput.addEventListener('input', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(this.value.trim())) {
                this.setAttribute('aria-invalid', 'false');
                emailError.textContent = '';
            }
        });
    }

    // Validação da mensagem
    if (mensagemInput && mensagemError) {
        mensagemInput.addEventListener('blur', function() {
            const value = this.value.trim();
            
            if (value.length === 0) {
                this.setAttribute('aria-invalid', 'true');
                mensagemError.textContent = 'Por favor, digite sua mensagem';
            } else if (value.length < 10) {
                this.setAttribute('aria-invalid', 'true');
                mensagemError.textContent = 'A mensagem deve ter pelo menos 10 caracteres';
            } else if (value.length > 500) {
                this.setAttribute('aria-invalid', 'true');
                mensagemError.textContent = 'A mensagem não pode ter mais de 500 caracteres';
            } else {
                this.setAttribute('aria-invalid', 'false');
                mensagemError.textContent = '';
            }
        });

        mensagemInput.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length >= 10 && value.length <= 500) {
                this.setAttribute('aria-invalid', 'false');
                mensagemError.textContent = '';
            }
        });
    }

    // Submissão do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        let firstInvalidField = null;
        
        // Validar nome
        const nomeValue = nomeInput.value.trim();
        if (nomeValue.length === 0 || nomeValue.length < 3) {
            nomeInput.setAttribute('aria-invalid', 'true');
            nomeError.textContent = nomeValue.length === 0 ? 'Por favor, digite seu nome' : 'O nome deve ter pelo menos 3 caracteres';
            isValid = false;
            if (!firstInvalidField) firstInvalidField = nomeInput;
        }
        
        // Validar email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();
        if (emailValue.length === 0 || !emailPattern.test(emailValue)) {
            emailInput.setAttribute('aria-invalid', 'true');
            emailError.textContent = emailValue.length === 0 ? 'Por favor, digite seu email' : 'Por favor, digite um email válido';
            isValid = false;
            if (!firstInvalidField) firstInvalidField = emailInput;
        }
        
        // Validar mensagem
        const mensagemValue = mensagemInput.value.trim();
        if (mensagemValue.length === 0 || mensagemValue.length < 10 || mensagemValue.length > 500) {
            mensagemInput.setAttribute('aria-invalid', 'true');
            if (mensagemValue.length === 0) {
                mensagemError.textContent = 'Por favor, digite sua mensagem';
            } else if (mensagemValue.length < 10) {
                mensagemError.textContent = 'A mensagem deve ter pelo menos 10 caracteres';
            } else {
                mensagemError.textContent = 'A mensagem não pode ter mais de 500 caracteres';
            }
            isValid = false;
            if (!firstInvalidField) firstInvalidField = mensagemInput;
        }
        
        if (isValid) {
            // Mensagem de sucesso
            alert('✅ Obrigado por entrar em contato! Retornaremos em até 24 horas.\n\nSeu formulário foi enviado com sucesso.');
            
            // Resetar formulário
            contactForm.reset();
            
            // Limpar estados de validação
            nomeInput.removeAttribute('aria-invalid');
            emailInput.removeAttribute('aria-invalid');
            mensagemInput.removeAttribute('aria-invalid');
            if (telefoneInput) telefoneInput.removeAttribute('aria-invalid');
            
            // Limpar mensagens de erro
            nomeError.textContent = '';
            emailError.textContent = '';
            mensagemError.textContent = '';
            
            // Resetar contador
            if (charCount) charCount.textContent = '0/500 caracteres';
            
            // Focar no primeiro campo
            nomeInput.focus();
        } else {
            // Focar no primeiro campo inválido
            if (firstInvalidField) {
                firstInvalidField.focus();
                // Anunciar erro para leitores de tela
                const errorMessage = firstInvalidField.getAttribute('aria-describedby');
                if (errorMessage) {
                    const errorElement = document.getElementById(errorMessage.split(' ')[0]);
                    if (errorElement) {
                        errorElement.setAttribute('role', 'alert');
                    }
                }
            }
        }
    });
}

// Animação das cards de destino
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.destination-card, .feature').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Navegação por teclado para cards
document.querySelectorAll('.destination-card, .feature').forEach(card => {
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Anunciar mudanças de página para leitores de tela
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        this.setAttribute('aria-current', 'page');
        
        // Anunciar seção para leitores de tela
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const heading = targetSection.querySelector('h1, h2');
            if (heading) {
                // Criar anúncio acess ível
                setTimeout(() => {
                    heading.focus();
                }, 300);
            }
        }
    });
});

// Atualizar ano automaticamente no footer
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Detectar modo escuro do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Usuário prefere modo escuro');
    // Você pode adicionar lógica para modo escuro aqui
}

// Detectar preferência por movimento reduzido
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Usuário prefere movimento reduzido');
    document.body.classList.add('reduced-motion');
}