const mongoose = require('mongoose')
let Schema = mongoose.Schema

//add cliente
let formClosedHouseSchema = new Schema({
data: {
    type: String,  
    required: [true, "A data é obrigatória"], 
   // match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
},

cep: {
    type: String,
    required: [true, 'A CEP é obrigatório'],
    validate:{
        validator: function(valor){
            return /^[0-9]{5}-[0-9]{3}$/.test(valor);
        },
        message: props => `${props.value} não é um telefone válido!`
    }
},

logradouro: {
    type: String,
    required: true,
    unique: true,
},

complemento: {
    type: String,
    required: false,
    defaut: '',
},

bairro: {
    type: String,
    required: false,
    defaut: '',
},

cidade: {
    type: String,
    required: false,
    defaut: '',
},

estado: {
    type: String,
    required: false,
    defaut: '',
},

retorno: {
    type: String,  
    required: [true, "A data é obrigatória"],
},

});

//nome da collection que eu quero colocar no banco
module.exports = mongoose.model('formClosedHouse', formClosedHouseSchema);