const mongoose = require('mongoose')
let Schema = mongoose.Schema
let jwt = require('jsonwebtoken');
let bcrypt = require ('bcrypt');
const segredo = require('../config/chaveToken');

let loginSchema = new Schema({

    email:{
        type: String,
        required:[true, 'O E-mail é obrigatório'],
        unique: true,
        validate:{
            validator: function(valor){
        return /^([a-zA-Z]([a-zA-Z]|[0-9]|\-||_||.)+\@[a-zA-Z]{3,}\.(com|biz|io|me)(\.[a-zA-Z]{2,3})?)$/ 
            },
            message: "Não está no padrao"
        }
    },
    password: {
        type: String,
        //minlength: 8
    },
    // password: {
    //     type: String,
    //     // required: [true, '// deve conter ao menos um dígito //deve conter ao menos uma letra minúscula // deve conter ao menos uma letra maiúscula// deve conter ao menos um caractere especial // deve conter ao menos 8 dos caracteres mencionados'], 
    //     // minlength: 8,
    //     // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    // },

    token:{
        type: String
    },

    group:{
        type: String, 
        required: true,
        enum:['user','admin'],
        default: 'user'
    },
});

//comparação da senha com o que está gravado na senha
loginSchema.methods.comparePassword = function(password, user, cb){
    bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) return cb(err);
        else cb(null, isMatch);
    });
}
//acesso ao token
loginSchema.methods.generateAuthToken = function(user){
    return new Promise ((success, reject)=>{        
        const token = jwt.sign(
            {_id: user._id},
            segredo.segredoToken,
            {expiresIn: '5d'}   
        );
        user.token = token;

        user.save()
        .then(user =>{
            success({success: true, token: token})
        })
        .catch(error =>{
            reject({sucess: false, token: null, error: error.message})
        });
    });
}

module.exports = mongoose.model('login', loginSchema);

