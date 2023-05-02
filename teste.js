require('./config/database')();

const User = require('./models/user');

let users = new User();
users.nome = 'Jessica'
users.cpf = '111.111.111-11'
users.email = 'teste@teste.com.br'
users.senha = 'Admin5@0'

let error = users.validateSync()
if(error){
    console.log(error.message);
}


users.save().then(user=>{
    console.log(user);
})
.catch(error=>{
    console.log(error.message);  
})