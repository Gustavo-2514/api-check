# API -Projeto (Check - ToDoList)

::: warning
API 100% desenvolvida por mim. Sem seguir nenhum tutorial!
:::

## Descrição

A API, construida com o padrão de aquitetura **_MVC_**, possui **_auntenticação de usuário_**, cadastro de Listas de tarefas, e cadastro das tarefas, após o usuario estiver autenticado, todas as requisições passa por um **_middleware_**, que trata a autenticação do usuario verificando o seu **_Token_**(JWT), se o Token atender todos os requisitos o usuario tem acesso a seus Dados que estão armazenados no Banco de dados não relacional **_MongoDB_**, em que nele Pode realizar o CRUD, nas listas e nas tarefas!

---

## Tecnologias

- Javascript(**NodeJS**)

- Framework **Express**

  - Construção da API

- **Bcrypt**
  - Para fazer o hash nas senhas antes de salvar no banco.

- **JWT** (Json Web Token ) 

  - Para autenticar o usuario via Token.

- **Mongo DB**

  - **Mongoose** (ODM) para estruturar os dados.

# Teste

Caso queira testar a api ela esta hospedada na Vercel, use algum software de teste em API como o _PostMan_ ou _Insomnia_ ou apenas o Frontend da aplicação:

[Link para api pura](https://api-check-kohl.vercel.app)

[Link do front que se comunica com a api](https://check-to-do-list-delta.vercel.app)

---

# Rotas Disponíveis

`Não se esqueça de trocar :userId, :checklistId, :taskId, pelo id retornado da api`

## Verificação de Autorização:

- **Rota**: _GET_ /:userId/checkAuthorization
- **Descrição**: Verifica a autorização do usuário com base no token fornecido.

### Registro de Usuário

- **Rota**: _POST_ /register
- **Descrição**: Registra um novo usuário na aplicação, retornado um token para autenticação

### Login de Usuário

- **Rota**: _POST_ /login
- **Descrição**: Permite que um usuário faça login, gerando um token de autenticação.

### Gerenciamento de Checklists

- **Rota**: _GET_ /:userId/checklists

- **Descrição**: Obtém todas as listas de verificação associadas a um usuário.

- **Rota**: _GET_ /:userId/checklist/:checklistId

- **Descrição**: Obtém detalhes específicos de uma lista de verificação.

- **Rota**: _POST_ /:userId/checklist/create

- **Descrição**: Cria uma nova lista de verificação para o usuário.

- **Rota**: _PUT_ /:userId/checklist/:checklistId/update

- **Descrição**: Atualiza os detalhes de uma lista de verificação existente.

- **Rota**: DELETE /:userId/checklist/:checklistId/delete

- **Descrição**: Exclui uma lista de verificação específica.

### Gerenciamento de Tarefas

- **Rota**: _GET_ /:userId/checklist/:checklistId/task/:taskId

- **Descrição**: Obtém detalhes específicos de uma tarefa em uma lista de verificação.

- **Rota**: _POST_ /:userId/checklist/:checklistId/task/create

- **Descrição**: Cria uma nova tarefa em uma lista de verificação.

- **Rota**: _PUT_ /:userId/checklist/:checklistId/task/:taskId/updateTitle

- **Descrição**: Atualiza o título de uma tarefa em uma lista de verificação.

- **Rota**: _PUT_ /:userId/checklist/:checklistId/task/:taskId/updateDone

- **Descrição**: Atualiza o status de conclusão de uma tarefa em uma lista de verificação.

- **Rota**: _DELETE_ /:userId/checklist/:checklistId/task/:taskId/delete

- **Descrição**: Exclui uma tarefa específica de uma lista de verificação.
