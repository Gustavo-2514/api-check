# API  -Projeto (Check - ToDoList)

::: warning
API 100% desenvolvida por mim. Sem seguir nenhum tutorial!
:::

## Descrição 

A API, construida com o padrão de aquitetura ***MVC***, possui ***auntenticação de usuário***, cadastro de Listas de tarefas, e cadastro das tarefas, após o usuario estiver autenticado, todas as requisições passa por um ***middleware***, que trata a autenticação do usuario verificando o seu ***Token***(JWT), se o Token atender todos os requisitos o usuario tem acesso a seus Dados que estão armazenados no Banco de dados não relacional ***MongoDB***, em que nele Pode realizar o CRUD, nas listas e nas tarefas!

---

## Tecnologias

- Javascript(**NodeJS**) 

- Framework **Express** 
    - Construção da API

- **Bcrypt** 
    - Para fazer o hash nas senhas antes de salvar no banco.

-**JWT** (Json Web Token ) 
    -Para autenticar o usuario via Token.

- **Mongo DB**
    -**Mongoose** (ODM) para estruturar os dados.


# Teste

Caso queira testar a api ela esta hospedada na Vercel: