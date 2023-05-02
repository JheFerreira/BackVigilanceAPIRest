const mongoose = require('mongoose')
let jwt = require('jsonwebtoken');
let bcrypt = require ('bcrypt');
const segredo = require('../config/chaveToken');
let Schema = mongoose.Schema


let usuarioSchema = new Schema({
   
    nomeCompleto:{
        type: String,
        required: [true, "O nome é obrigatório"],
        
        
    },

    cpf:  {
        type: String, 
        required:[true, "O CPF é obrigatório"], 
        unique: true, 
        match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    },

    telefone: {
        type: String,
        required: false,
        defaut: '', 
        validate:{
            validator: function(valor){
                return /^(\(\d{2}\) 9?\d{4}-\d{4})|()$/.test(valor)
            },
            message: props => `${props.value} não é um telefone válido!`
        }
    },

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

    token:{
        type: String
    },

    group:{
        type: String, 
        required: true,
        enum:['user','admin'],
        default: 'user'
    },
 
    
       // password: {
    //     type: String,
    //     // required: [true, '// deve conter ao menos um dígito //deve conter ao menos uma letra minúscula // deve conter ao menos uma letra maiúscula// deve conter ao menos um caractere especial // deve conter ao menos 8 dos caracteres mencionados'], 
    //     // minlength: 8,
    //     // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    // },

    // token:{
    //     type: String
    // },

    // group:{
    //     type: String, 
    //     required: true,
    //     enum:['user','admin'],
    //     default: 'user'
    // },
});
//criptografia de senha
usuarioSchema.pre('save', function(next){
    const user = this;

    //user.generateAuthToken()
    //.then(sucesso =>{
        if(user.isModified('password') || user.isNew){
            //Criptografar a senha
            bcrypt.hash(user.password, 8)
            .then(hash =>{
                user.password = hash;
                next();
            })
            .catch(error =>{
                next(error);
            })
        }else{
            return next();
        }
    //}).catch(error => {
    //    next(error);
    //})
    
});

//comparação da senha com o que está gravado na senha
usuarioSchema.methods.comparePassword = function(password, user, cb){
    bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) return cb(err);
        else cb(null, isMatch);
    });
}
//acesso ao token
usuarioSchema.methods.generateAuthToken = function(){
    return new Promise ((success, reject)=>{
        const user = this;
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

    module.exports = mongoose.model('usuario', usuarioSchema);
