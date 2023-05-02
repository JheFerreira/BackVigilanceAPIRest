const jwt = require('jsonwebtoken');
const segredo = require('../config/chaveToken');
const login = require('../models/login');


module.exports = {

    jwtVerify: (req, res, next)=>{
        let authorizationHeader = req.headers['authorization'];
        if(authorizationHeader){
            var token = authorizationHeader.replace('Bearer ', '');
        }else{
            return res.status (401).json({
                success: false, 
                mes: "O envio do token é obrigatório!"
            });
        }
    
        
        //verificação do token
        if(token){   
            jwt.verify(token, segredo.segredoToken, function(err, tokenDecoded){
                if(err){
                   return res.status(500).json({
                    success: false,
                    msg: "Falha ao verificar o token. Tente novamente!"
                   });
                }else{
                    let userId = tokenDecoded._id;
                   
                   //verificação no banco de dados
                    login.findOne({
                        _id:userId,
                        token: token
                    }, {username: 1, group: 1, _id: 1})
                    .then(user =>{
                        if(user){
                           req.user = user;
                           next(); 
                        }else{
                            return res.status(401).json({
                                success:false,
                                msg: "Token não encontrado. Faça o login novamente!",
                            })
                        }
                    })
                    .catch(error =>{
                        return res.status(401).json({
                            success:false,
                            msg: "Token inválido!",
                            error: error.message
                        })
                    });
                }
            });
        }else{
            return res.status(401).json({
                success: false,
                msg: "O envio do token é obrigatório!"
            });

         }
    },
    //verificação de grupo
    groupVerify: (role)=>{
        return function (req, res, next){
            if(role !=null && role.includes(req.user.group)){
                next();
            }else{
                res.status(403).json({
                    success: false,
                    msg: "O usuário não tem acesso a esta rota!"
                })
            }
        }
    }
}