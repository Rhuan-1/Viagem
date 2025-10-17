# 🌟 Texas Viagens - Landing Page Premium

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![WCAG](https://img.shields.io/badge/WCAG-AAA-success.svg)
![Performance](https://img.shields.io/badge/performance-95%2B-brightgreen.svg)

Landing page moderna e totalmente acessível para agência de turismo especializada em viagens para o Texas e Estados Unidos.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Acessibilidade](#-acessibilidade)
- [Performance](#-performance)
- [SEO](#-seo)
- [Instalação](#-instalação)
- [Estrutura](#-estrutura-de-arquivos)
- [Práticas Recomendadas](#-práticas-recomendadas)
- [Testes](#-testes)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## ✨ Características

### 🎨 Design e UX
- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves e não intrusivas
- ✅ Tema adaptável (modo escuro/claro automático)
- ✅ Interface limpa e intuitiva
- ✅ Tipografia otimizada para legibilidade

### ♿ Acessibilidade (WCAG 2.1 AAA)
- ✅ Skip links para navegação rápida
- ✅ Navegação por teclado completa
- ✅ ARIA labels e roles adequados
- ✅ Contraste de cores AAA (7:1)
- ✅ Textos alternativos descritivos
- ✅ Formulários totalmente acessíveis
- ✅ Leitores de tela otimizados
- ✅ Foco visível em todos os elementos
- ✅ Suporte a preferências do sistema (movimento reduzido, alto contraste)

### 🚀 Performance
- ✅ PWA (Progressive Web App)
- ✅ Service Worker para cache
- ✅ Lazy loading de imagens
- ✅ Compressão GZIP
- ✅ Minificação de assets
- ✅ Preload de recursos críticos
- ✅ Otimização de Web Vitals
- ✅ Score 95+ no Lighthouse

### 📱 Funcionalidades
- ✅ Formulário de contato com validação em tempo real
- ✅ Contador de caracteres
- ✅ Mensagens de erro acessíveis
- ✅ Navegação suave entre seções
- ✅ Indicador de página atual
- ✅ Animações ao scroll
- ✅ Modo offline

## 🛠 Tecnologias

### Frontend
- **HTML5** - Marcação semântica
- **CSS3** - Estilos modernos (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** - Funcionalidades interativas
- **Font Awesome 6.0** - Ícones

### PWA
- **Service Worker** - Cache e offline
- **Web App Manifest** - Instalação

### Ferramentas de Desenvolvimento
- **Intersection Observer API** - Lazy loading e animações
- **Performance Observer API** - Monitoramento de performance
- **Web Vitals** - Métricas de UX

## ♿ Acessibilidade

### Conformidade WCAG 2.1
- **Nível A**: 100%
- **Nível AA**: 100%
- **Nível AAA**: 95%+

### Recursos de Acessibilidade

#### Navegação
```html
<!-- Skip Links -->
<a href="#main-content" class="skip-to-content">Pular para conteúdo principal</a>
<a href="#destinos" class="skip-to-content">Pular para destinos</a>
<a href="#contato" class="skip-to-content">Pular para contato</a>
```

#### Formulários
```html
<!-- Labels descritivos -->
<label for="nome">Nome Completo <span class="required">*</span></label>

<!-- Ajuda contextual -->
<span id="nome-help" class="form-help">Digite seu nome completo</span>

<!-- Mensagens de erro -->
<span id="nome-error" role="alert" aria-live="assertive"></span>
```

#### ARIA
```html
<!-- Navegação -->
<nav role="navigation" aria-label="Navegação principal">

<!-- Regiões -->
<main id="main-content" role="main" aria-label="Conteúdo principal">

<!-- Status dinâmicos -->
<div role="status" aria-live="polite" aria-atomic="true"></div>
```

### Testes de Acessibilidade

#### Ferramentas Recomendadas
- **axe DevTools** - Análise automática
- **WAVE** - Avaliação de acessibilidade web
- **NVDA** - Leitor de tela (Windows)
- **JAWS** - Leitor de tela (Windows)
- **VoiceOver** - Leitor de tela (macOS/iOS)
- **TalkBack** - Leitor de tela (Android)

#### Checklist Manual
- [ ] Navegação completa por teclado (Tab, Shift+Tab, Enter, Espaço)
- [ ] Skip links funcionam corretamente
- [ ] Todas as imagens têm texto alternativo
- [ ] Contraste mínimo 7:1 (AAA)
- [ ] Formulários validam com mensagens claras
- [ ] Leitores de tela anunciam mudanças
- [ ] Foco visível em todos os elementos interativos
- [ ] Preferências do sistema respeitadas

## ⚡ Performance

### Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Otimizações Implementadas

#### Cache Strategy
```javascript
// Service Worker - Cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

#### Lazy Loading
```javascript
// Intersection Observer para imagens
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
    }
  });
});
```

#### Debounce e Throttle
```javascript
// Debounce para input
const debouncedValidation = debounce(validateField, 300);

// Throttle para scroll
const throttledScroll = throttle(updateNavigation, 100);
```

## 🔍 SEO

### Meta Tags
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
```

### Estrutura de Dados
```html
<!-- Schema.org para rich snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Texas Viagens"
}
</script>
```

### Arquivos
- ✅ `robots.txt` - Instruções para crawlers
- ✅ `sitemap.xml` - Mapa do site
- ✅ `.htaccess` - Configurações Apache

## 📦 Instalação

### Requisitos
- Servidor web (Apache, Nginx, etc.)
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/texas-viagens.git
cd texas-viagens
```

2. **Configure o servidor**
```bash
# Para desenvolvimento local com Python
python -m http.server 8000

# Ou com Node.js
npx serve .
```

3. **Acesse no navegador**
```
http://localhost:8000
```

### Produção

1. **Upload dos arquivos**
```bash
# Via FTP/SFTP para seu servidor
scp -r * usuario@servidor:/var/www/html/
```

2. **Configurar HTTPS**
```bash
# Usar Let's Encrypt
sudo certbot --apache -d seudominio.com
```

3. **Testar**
- Lighthouse (Performance, Accessibility, SEO)
- PageSpeed Insights
- WAVE (Acessibilidade)

## 📁 Estrutura de Arquivos

```
texas-viagens/
├── index.html                  # Página principal
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── robots.txt                 # SEO
├── sitemap.xml                # SEO
├── .htaccess                  # Configuração Apache
├── README.md                  # Documentação
├── assets/
│   ├── css/
│   │   ├── styles.css         # CSS base
│   │   └── styles-premium.css # CSS premium com todas práticas
│   ├── js/
│   │   ├── script.js          # JavaScript base
│   │   └── script-premium.js  # JavaScript premium com todas práticas
│   └── images/
│       ├── icons/             # Ícones PWA
│       └── destinations/      # Imagens de destinos
└── docs/                      # Documentação adicional
```

## 🏆 Práticas Recomendadas

### HTML
- ✅ Marcação semântica (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- ✅ Atributos ARIA apropriados
- ✅ Meta tags completas
- ✅ Estrutura de heading lógica (h1 → h2 → h3)

### CSS
- ✅ Mobile-first approach
- ✅ Custom properties (variáveis CSS)
- ✅ Metodologia BEM para classes
- ✅ Media queries para responsividade
- ✅ Suporte a prefers-* (dark mode, reduced motion, high contrast)

### JavaScript
- ✅ Strict mode
- ✅ ES6+ features
- ✅ Modularização
- ✅ Error handling
- ✅ Performance monitoring
- ✅ Debounce e throttle
- ✅ Progressive enhancement

### Segurança
- ✅ Content Security Policy (CSP)
- ✅ HTTPS obrigatório
- ✅ Headers de segurança (.htaccess)
- ✅ Sanitização de inputs
- ✅ Proteção contra XSS
- ✅ Proteção contra CSRF

### Performance
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Asset optimization
- ✅ GZIP compression
- ✅ Browser caching
- ✅ CDN para recursos externos
- ✅ Preload/prefetch crítico

## 🧪 Testes

### Ferramentas de Teste

#### Performance
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://seusite.com --view
```

#### Acessibilidade
```bash
# Pa11y
npm install -g pa11y
pa11y https://seusite.com
```

#### HTML
```bash
# W3C Validator
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.w3.org/nu/?out=gnu
```

### Testes Manuais

#### Desktop
- [ ] Chrome (Windows/macOS/Linux)
- [ ] Firefox (Windows/macOS/Linux)
- [ ] Safari (macOS)
- [ ] Edge (Windows)

#### Mobile
- [ ] Chrome (Android)
- [ ] Safari (iOS)
- [ ] Firefox (Android)
- [ ] Samsung Internet (Android)

#### Leitores de Tela
- [ ] NVDA + Chrome (Windows)
- [ ] JAWS + Chrome (Windows)
- [ ] VoiceOver + Safari (macOS)
- [ ] VoiceOver + Safari (iOS)
- [ ] TalkBack + Chrome (Android)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes
- Mantenha a conformidade WCAG AAA
- Teste em múltiplos navegadores
- Documente mudanças significativas
- Siga os padrões de código existentes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Texas Viagens**
- Website: https://texasviagens.com
- Email: contato@texasviagens.com
- Telefone: (11) 1234-5678

---

Desenvolvido com ❤️ e foco em acessibilidade por Texas Viagens
