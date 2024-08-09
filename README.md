# Students App

Este é um aplicativo de gerenciamento de estudantes utilizando React, Material-UI e Context API para gerenciamento de estado e autenticação. O aplicativo permite que os usuários façam login e, uma vez autenticados, possam listar, adicionar, atualizar e excluir estudantes.

## Tecnologias

- **React**: Biblioteca para construção da interface de usuário.
- **Material-UI**: Biblioteca de componentes React que implementa o Material Design.
- **React Hook Form**: Biblioteca para manipulação de formulários com validação.
- **Context API**: API do React para gerenciamento de estado global.
- **Axios**: Cliente HTTP para fazer requisições à API.

## Estrutura do Projeto
```bash
src/
├── assets/
│ └── logo.js
├── components/
│ ├── modal-create-student/
│    └── index.jsx
│ ├── modal-edit-student/
│    └── index.jsx
├── contexts/
│ └── AuthContext.jsx
│ └── StudentsContext.jsx
│ └── index.jsx
├── routes/
│ └── Routes.jsx
│ └── index.jsx
└── services/
│ └── api.jsx
└── styles/
│ └── reset.css
└── utils/
│ └── fotmatDate.js
└── views/
│ └── dashboard/
│    └── students-list/
│       └── index.jsx
│       └── card/
│          └── index.jsx
│    └── index.jsx
│ └── login/
│    └── index.jsx
```
## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/igosantana/students-app.git
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd students-app
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:

   ```bash
   npm start
   ```


## Licença

MIT
