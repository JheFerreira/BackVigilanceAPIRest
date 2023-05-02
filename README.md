# BackVigilanceAPIRest


Vigilância Epidemiologica _ API REST - versão 02 (Implementado a classe usuário, utilizando o princípio de responsabilidade de classes, separando o cadastro do usuário da classe de login).

Esta é uma API criada para armazenar os dados de um aplicativo voltado para área de saúide, especificamente na área de vigilância Epdemiológica.

Nessa versão,(versão 02) a API encontra-se funcional, porém passível de melhorias.
Criada em Node Js, e o banco de dados, Mongo DB.

Como rodar esse projeto:

A aplicação será iniciada e um servidor estará rodanando e acessível no endereço:

localhost: 3000

Utilizo como IDE para execução o VScode, para testes no próprio programa, pode utilizar o plugin Thunder Client (baixar extensão no VSCode).

É necessário também utilizar o banco de dados não relacional, mongo db - você precisa tê-lo instalado em sua máquina.

Para baixar, acesse: https://www.mongodb.com/try/download/community (baixar a versão community - gratuita).

Inicie o banco.

Ao iniciar os testes, o aplicativo cria o banco automaticamente.

Para iniciar o servidor, no terminal utilize o comando: nmp start.

A API

A API possui os endpoints:

POST   localhost:3000/usuario/signup : para cadastrar um novo usuário no sistema
GET    localhost:3000/usuario/getAllUsers : para pesquisar todos os usuários cadastrados no sistema.
GET    localhost:3000/usuario/getUserByID/id: para pesquisar usuários por id 
PUT    localhost:3000/usuario/updateUser/id: para alterar os dados de um usuário
DELETE localhost:3000/usuario/deleteUser/id: para deletar um usuário existente no sistema.


Exemplo:

Para cadastrar um usuário usando o Thunder client, clique em New Request
Crie um método POST, no corpo deve conter: 

{
  "nomeCompleto": "nome",
  "cpf": "cpf",
  "telefone": "telefone",
  "email": "email",
  "password": "password"
}

Após cadastrar o usuário no sistema, o mesmo poderá fazer o login e também o logout com o email e a senha previamente cadastrados.

Rotas a serem utilizadas:

POST   localhost:3000/login/login : para logar um  usuário previamente cadastrado no sistema.

Login/Logout (logar no sistema)

Propriedades (passar no body da requisição)

{
  "username": "username",
  "password": "senha"
}

Para logout
POST   localhost:3000/login/logout : para realizar o logout de um  usuário previamente logado no sistema.

Passar no Headers Authorization   Bearer + a criptografia



validar cadastro de novo cliente na base (casa aberta)

{
"nomeCompleto": "nome",
"telefone": "telefone",
"email": "e-mail",
"cep": "cep",
"logradouro":"logradouro",
"complemento": "",
"bairro": "bairro",
"cidade": "Cidade",
"estado": "Estado",
"larva": "contem/nao contem",
"pupa": "contem/nao contem",
"quantidadeLarva": "quantidade",
"codigoDeposito": "codigo",
"deposito": "deposito",
"especie": "especie"
}

validar cadastro de novo cliente na base (casa fechada)

{
  "data": "data ",
  "cep": "cep",
  "logradouro": "logradouro",
  "complemento": "",
  "bairro": "bairro",
  "cidade": "cidade",
  "estado": "estado",
  "retorno" : "data"
}





