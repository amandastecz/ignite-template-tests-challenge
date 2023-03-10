# Testes unitários e integração para a aplicação em Node.js

## Rotas da aplicação

### POST `/api/v1/users`

- A rota recebe `name`, `email` e `password` dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status `201`.
- [X] should be able to create a new user
- [X] should not be able to create a new user if the email already exists

### POST `/api/v1/sessions`

- A rota recebe `email` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.
- [X] should be able to authenticate a user
- [X] should not be able to authenticate when the password is wrong
- [X] should not be able to authenticate when the email is wrong

<aside>
💡 Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.

</aside>

### GET `/api/v1/profile`

- A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.
- [X] should be able to list the user information
- [X] should not be able to list the user information when the user doesn't exists

### GET `/api/v1/statements/balance`

- A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade `balance`.
- [X] should be able to list all deposit and withdraw and also total balance from a valid user
- [X] should not be able to find the balance information from a inexistent user

### POST `/api/v1/statements/deposit`

- A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status `201`.
- [X] should be able to make a deposit into an existent account
- [X] should not be able to make a deposit into an non existent account

### POST `/api/v1/statements/withdraw`

- A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status `201`.
- [X] should be able to withdraw to an account with sufficient balance
- [X] should not be able to withdraw from an account with insufficient balance

### GET `/api/v1/statements/:statement_id`

- A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.
- [X] should be able to return the found deposit operation information
- [X] should be able to return the found withdraw operation information
- [X] should not be able to return a statement operation information when the user not exists
- [X] should not be able to return a statement operation information when the statement not exists
