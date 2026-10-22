# 🌐 Portfólio Pessoal

Este é o meu portfólio pessoal, desenvolvido para apresentar meus projetos, habilidades e experiência como desenvolvedor **Fullstack**.  
O site foi construído com foco em **performance**, **design responsivo** e **experiência do usuário**.

---

## 🚀 Tecnologias Utilizadas

- **React**
- **Vite**
- **Tailwind CSS**
- **CVA (Class Variance Authority)**

---

## 🌗 Funcionalidades

- **Modo Claro e Escuro** – Alternância entre temas de forma suave.  
- **Design Responsivo** – Layout adaptável para qualquer dispositivo.  
- **Interface Intuitiva** – Navegação simples e agradável.  
- **Visual Profissional** – Foco em estética limpa e moderna.

## Idiomas

O site oferece português, inglês e espanhol. A primeira visita usa o primeiro idioma compatível nas preferências do navegador, com português como fallback. A escolha manual no seletor da navegação fica salva no navegador e tem prioridade nas próximas visitas.

As traduções ficam em `src/common/translations.ts`. O hook `src/hooks/useLanguage.ts` sincroniza a interface, o título da página e o atributo `lang` do HTML. Os componentes de texto e destaque reutilizam essa tradução sem alterar os dados originais dos projetos.
