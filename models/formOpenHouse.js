const mongoose = require('mongoose')
let Schema = mongoose.Schema


//add cliente open 

let formOpenHouseSchema = new Schema({

    nomeCompleto: {
    type: String,  
    required: [true, "O Nome é obrigatório"], 
    },

    telefone: {
    type: String,
    required: false,
    defaut: '', 
    validate:{
        validator: function(valor){
            return /^(\(\d{2}\) 9?\d{4}-\d{4})|$/.test(valor)
        },
        message: props => `${props.value} não é um telefone válido!`
        }
    },

email:{
    type: String,
    required: [true, 'O E-mail é obrigatório'],
    validate:{
        validator: function(valor){
return /^([a-zA-Z]([a-zA-Z]|[0-9]|\-||_||.)+\@[a-zA-Z]{3,}\.(com|biz|io|me)(\.[a-zA-Z]{2,3})?)$/
        }
    }
},

//api via cep -> fazer na api ou flutter
cep: {
    type: String,
    required: [true, 'A CEP é obrigatório'],
    validate:{
        validator: function(valor){
            return /^[0-9]{5}-[0-9]{3}$/.test(valor);
        },
        message: props => `${props.value} não é um cep válido!`
    }
},

logradouro: {
    type: String,
    required: true,
    defaut: '',
},

complemento: {
    type: String,
    required: false,
    defaut: '',
},

bairro: {
    type: String,
    required: true,
    defaut: '',
},

cidade: {
    type: String,
    required: true,
    defaut: '',
},

estado: {
    type: String,
    required: true,
    defaut: '',
},

larva: {
    type: String,  
    required: false, 
},

pupa: {
    type: String,  
    required: false, 
},

quantidadeLarva:{
    type: String,  
    required: false, 
},

codigoDeposito: {
    type: String,  
    required: false, 
},

deposito: {
    type: String,  
    required: false
},

especie: {
    type: String,  
    required: false, 
}});

//nome da collection que eu quero colocar no banco
module.exports = mongoose.model('formOpenHouse', formOpenHouseSchema);
