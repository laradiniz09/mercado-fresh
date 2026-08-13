# Mercado Fresh (MVP)

**Nota de Contexto:** Este projeto foi desenvolvido inteiramente como um estudo prático de produto para aprofundar conhecimentos em UX Design, Inteligência Artificial,  Design System (DS), regras de negócio, desenvolvimento frontend (código), acessibilidade e boas práticas de versionamento (Git/GitHub e segurança).

---

## Sobre o Projeto

Aplicação web que simula um mercado em que o usuário digita no app do mercado o que deseja cozinhar e suas restrições (ex: fazer um "pudim" sendo "intolerante à lactose"). O sistema cruza os dados, filtra os ingredientes e lida com a indisponibilidade de itens, sugerindo substitutos da mesma categoria.

> **Nota:** Esta é uma simulação baseada nas práticas do mercado. O projeto é um MVP Web para validação inicial, com transição prevista para Expo após a aprovação do fluxo.

---

## Como Funciona na Prática (Exemplo de Teste)

O projeto conta com uma base de dados centralizada no arquivo `recipes.js`* (contendo receitas como bolo de fubá, mousse de chocolate e pudim). 

- **Exemplo de Uso:** Ao buscar por **pudim** com restrição de **intolerância à lactose**: "Quero fazer um pudim, mas sou intolerante à lactose"
  1. O sistema consulta o `recipes.js` para buscar os ingredientes originais.
  2. Cruza os dados com as restrições informadas no `database.ts` .
  3. Identifica os itens com lactose, filtra e **indica ingredientes substitutos** adequados da mesma categoria, respeitando a regra de negócio.

---

## Sobre o Escopo e Funcionalidades (Workflow)

Este protótipo/MVP foca em validar o fluxo principal de ponta a ponta:

- **Botões Ilustrativos:** Elementos visuais e botões na interface possuem caráter meramente ilustrativo para fidelidade visual do estudo, sem lógica de backend ou ações complexas acopladas.
- **Natureza Experimental:** Sendo um ambiente de aprendizado e testes, o sistema pode apresentar limitações ou pequenos ajustes pendentes.

---

## O que foi exercitado neste estudo?

- **UX e Design:** Arquitetura de informação, fluxos de telas e aplicação de Design System.
- **Criação de uma tela:** Com base no design system bem definido, utilizando a integração via **MCP Figma-cursor**.
- Uso do MCP Figma-cursor.
- **Regras de Negócio:** Tratamento de restrições alimentares e substituição de ingredientes via `recipes.js` e  `database.ts`
- **Engenharia e Código:** Componentização limpa, estruturação de pastas e tipagem.
- **Acessibilidade:** Padrões inclusivos na interface.
- **Git e Segurança:** Uso correto de `.gitignore`, proteção de dados sensíveis e padronização de commits.

---

## Como rodar o projeto na sua máquina

Certifique-se de ter o Node.js instalado. No terminal, execute:

```bash

# Clone o repositório

git clone  https://github.com/laradiniz09/mercado-fresh.git

# Entre na pasta do projeto

cd mercado-fresh

# Instale as dependências

npm install

# Inicie o projeto em modo de desenvolvimento

npm run dev

```

