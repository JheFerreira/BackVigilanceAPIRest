const login_model = require('../models/login');
const users = require('../models/usuario');
const util = require('util');
module.exports ={

login: async (req, res, next)=>{
 const{email, password}= req.body;

     let user = await users.findOne({'email': email});

    if(user != null){
        user.comparePassword(password, user, (err, isMatch) =>{
            if(isMatch && !err){
        user.generateAuthToken(user)
        .then(sucesso =>{
            return res.status(200).json(sucesso);
        })
        .catch(error =>{
            //Erro 500 trata-se de erros internos, conexao com o banco, erro do servidor ou biblioteca, etc.
            return res.status(500).json(error);
        })
            }else{
                return  res.status(401).json({success: false, token: null, msg: "Senha incorreta!" }); 
                } 
        });
    }else{
        //Erro 401 falha referente a autenticação
        return res.status(401).json({success: false, token: null, msg: "Usuário não encontrado!" });
    }
},
logout: (req, res, next)=>{
        
    const userId = req.user._id;

   login.updateOne(
        {_id: userId},
        {
            $set: {
                token: null
            }
        }
    )
    .then(user =>{
        return res.status(200).json({
            success: true, 
            token: null,
            msg: "Logout realizado com sucesso!"
        })
    })
    .catch (error =>{
        return res.status(500).json({
            success: false,
            token: null, 
            msg: "Erro ao realizar logout. Tente novamente!"
        })
    })
}
};
    
