# Pokédex - CRUD de Pokémons

Este projeto consiste em uma aplicação web desenvolvida em React para o gerenciamento de uma Pokédex personalizada. A aplicação permite listar, cadastrar, editar e excluir registros de Pokémons, utilizando uma API simulada para persistência de dados.

## Funcionalidades

- **Listagem Dinâmica:** Exibição de cards com informações detalhadas vindas da API.
- **Gerenciamento (CRUD):** Criação, leitura, atualização e deleção de registros de Pokémons.
- **Integração com PokéAPI:** Geração automática de imagens baseada no número identificador do Pokémon.
- **Interface Responsiva:** Modal para formulários e confirmações de exclusão.

## Tecnologias Utilizadas

- **Frontend:** React.js
- **Build Tool:** Vite
- **Comunicação HTTP:** Axios
- **Backend Mock:** JSON Server (para simulação de API REST)
- **Estilização:** CSS

## Como Executar

### Pré-requisitos

- Node.js instalado
- Gerenciador de pacotes npm

### Passo a Passo

1. **Clonar o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/api-pokemon-json-server.git](https://github.com/seu-usuario/api-pokemon-json-server.git)
   cd api-pokemon-json-server
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

3. **Iniciar a API (JSON Server):**
   _Abra um terminal e execute:_

   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Iniciar a aplicação (Vite):**
   _Em outro terminal, execute:_
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

- `src/App.jsx`: Componente principal contendo a lógica de estados e renderização.
- `src/provider/api.js`: Configuração do Axios para comunicação com o backend.
- `src/style.css`: Estilização global e dos componentes (cards e modais).

---

### Informações Acadêmicas

Este projeto foi desenvolvido como parte integrante das atividades práticas da disciplina de **Programação Web** do curso de **Análise e Desenvolvimento de Sistemas (3º Semestre)**.

**Instituição:** São Paulo Tech School - SPTech
