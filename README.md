# Transactions API
API responsável por criar um usuário com seu saldo e realizar transferências para outras contas.

## Requisitos

* <b>Docker e Docker Compose</b>

## Setup do projeto
Faça o clone do repositório e entre na pasta e rode os seguintes comando
- <b>cp .env.example .env</b>
- <b>docker compose up -d</b>

## Criar um usuário
Para criar um usuário, basta fazer uma requisição no endpoint abaixo.
restrições: <b>email e document são únicos.</b>
typeClient: <b> COMMON ou MERCHANT </b>

URL: http://localhost:3001/users</b>
method: POST
```json
{
    "name": "joao",
    "document": "99224861059",
    "typeClient": "COMMON",
    "email": "joao@hotmail.com",
    "password": "123465",
    "balance": 100
}
```

## Realizar uma transferência
Para realizar uma transferência, será necessário informar o payer (quem irá pagar), payee (quem irá receber)  e o amount.


URL: http://localhost:3001/transaction</b>
method: POST
```json
{
    "value": 10,
    "payer": "d0efd3d4-5985-492c-b4e3-c26b1653f089",
    "payee": "7d9c6595-bb31-48c8-b6f7-017db76a7d21"
}
```
