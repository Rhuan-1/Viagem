# Contribuindo para Texas Viagens

Obrigado por considerar contribuir para o projeto Texas Viagens! 🎉

## 📋 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, espera-se que você mantenha este código.

## 🤔 Como Posso Contribuir?

### Reportando Bugs

Antes de criar um relatório de bug:
- **Verifique** se o bug já foi relatado
- **Use** o template de issue para bugs
- **Inclua** detalhes sobre como reproduzir
- **Anexe** screenshots se aplicável

#### Template para Bugs

```markdown
**Descrição do Bug**
Uma descrição clara do que é o bug.

**Para Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

**Comportamento Esperado**
Uma descrição clara do que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [ex. Windows 10]
- Navegador: [ex. Chrome 98]
- Versão: [ex. 22]
- Leitor de tela (se aplicável): [ex. NVDA 2021.3]

**Contexto Adicional**
Qualquer outro contexto sobre o problema.
```

### Sugerindo Melhorias

#### Template para Sugestões

```markdown
**A sugestão está relacionada a um problema?**
Uma descrição clara do problema.

**Descreva a solução que você gostaria**
Uma descrição clara do que você quer que aconteça.

**Descreva alternativas que você considerou**
Uma descrição de soluções ou recursos alternativos.

**Contexto Adicional**
Qualquer outro contexto ou screenshots sobre a sugestão.
```

### Pull Requests

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Faça commit** das suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. **Abra** um Pull Request

#### Checklist para Pull Requests

- [ ] Código segue o estilo do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Mudanças mantêm WCAG AAA
- [ ] Testado em múltiplos navegadores
- [ ] Testado com leitores de tela
- [ ] Performance mantida ou melhorada
- [ ] Sem warnings de acessibilidade

## 🎨 Guias de Estilo

### HTML

```html
<!-- BOM -->
<button type="button" aria-label="Fechar modal">
    <i class="fas fa-times" aria-hidden="true"></i>
</button>

<!-- RUIM -->
<div onclick="close()">X</div>
```

### CSS

```css
/* BOM - Use BEM */
.card {}
.card__title {}
.card__content {}
.card--featured {}

/* RUIM */
.card .title {}
.cardContent {}
```

### JavaScript

```javascript
// BOM - Use ES6+
const handleClick = (event) => {
    event.preventDefault();
    // lógica
};

// RUIM
function handleClick(event) {
    event.preventDefault();
    // lógica
}
```

### Acessibilidade

#### Prioridades

1. **Crítico** - Impede uso por pessoas com deficiência
2. **Alto** - Dificulta muito o uso
3. **Médio** - Causa inconveniência
4. **Baixo** - Melhorias menores

#### Regras Obrigatórias

- ✅ Todas as imagens devem ter `alt` descritivo
- ✅ Contraste mínimo 7:1 (AAA)
- ✅ Navegação 100% por teclado
- ✅ ARIA usado corretamente
- ✅ Formulários com labels apropriados
- ✅ Mensagens de erro descritivas
- ✅ Skip links funcionais
- ✅ Heading hierarchy lógica

### Commits

#### Formato

```
tipo(escopo): descrição curta

Descrição mais detalhada se necessário.

BREAKING CHANGE: descrição de mudanças que quebram compatibilidade
```

#### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, espaços em branco
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Adição de testes
- `chore`: Tarefas de manutenção
- `a11y`: Melhorias de acessibilidade

#### Exemplos

```bash
feat(form): adiciona validação em tempo real

fix(nav): corrige navegação por teclado no menu mobile

a11y(images): melhora textos alternativos das imagens

docs(readme): atualiza instruções de instalação

perf(images): implementa lazy loading
```

## 🧪 Testes

### Teste Antes de Submeter

#### Navegadores Desktop
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)

#### Navegadores Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

#### Leitores de Tela
- [ ] NVDA + Chrome (Windows)
- [ ] JAWS + Chrome (Windows) - se disponível
- [ ] VoiceOver + Safari (macOS/iOS)

#### Ferramentas Automatizadas
- [ ] Lighthouse (95+ em todas categorias)
- [ ] axe DevTools (0 violações)
- [ ] WAVE (0 erros)

### Como Testar Acessibilidade

1. **Apenas Teclado**
   - Desconecte o mouse
   - Navegue usando Tab, Shift+Tab, Enter, Espaço
   - Verifique foco visível em todos elementos

2. **Leitor de Tela**
   - Ative NVDA ou VoiceOver
   - Navegue pela página
   - Verifique se todos elementos são anunciados
   - Teste formulários completamente

3. **Zoom**
   - Aumente zoom para 200%
   - Verifique se tudo funciona
   - Nada deve quebrar ou sobrepor

4. **Modo Alto Contraste**
   - Windows: Ative Alto Contraste
   - Verifique visibilidade de todos elementos

## 📝 Documentação

Ao adicionar novas funcionalidades:

1. **Atualize o README.md** com exemplos
2. **Adicione comentários** no código quando necessário
3. **Documente APIs** se criar funções públicas
4. **Atualize CHANGELOG.md**

## 🔍 Processo de Revisão

Pull Requests serão revisados em:
- **Funcionalidade**: Faz o que deveria?
- **Acessibilidade**: Mantém WCAG AAA?
- **Performance**: Não degrada?
- **Código**: Segue os padrões?
- **Testes**: Adequadamente testado?
- **Documentação**: Claramente documentado?

## 💡 Dúvidas?

- **Issues**: Para bugs e sugestões
- **Discussions**: Para perguntas gerais
- **Email**: contato@texasviagens.com

## 🙏 Agradecimentos

Obrigado por tornar a web mais acessível! 

Toda contribuição, grande ou pequena, é valorizada.

---

**Lembre-se**: Acessibilidade não é opcional, é essencial!
