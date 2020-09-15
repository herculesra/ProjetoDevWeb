# Instalando dependências
```
npm init -y 
```
* -y aceita todos os termos. Criar o projeto Default

## instalando o express

```
npm install express
```

## Instalando nodemon 
```
npm install nodemon -D
```
* -D dependência apenas para desenvolvimento

Lembrar de modificar o arquivo *** package.json *** para 
"scripts": {
    "start": "nodemon "..."/index.js"
  },
## Instalando o Knex.js
```
npm install knex --save
```

## Instalando o sqlite3
```
npm install sqlite3
```

Caso queira escolher outro BD, olhar a documentação <a href="http://knexjs.org/">aqui</a>

## Instalando CORS da aplicação 
```
npm install cors
```

# Iniciando alguns comandos

## Iniciando o arquivo Knex
```
npx knex init
```
Lembrar de alterar o arquivo knex.js

## Criando a primeira migration
```
npx knex migrate:make create_gift_card
```

## Executando as migrations
```
npx knex migrate:latest
```

Para mais comandos: npx knex -> Lista todos os comandos



