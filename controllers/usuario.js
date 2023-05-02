const usuario = require('../models/usuario');

module.exports ={
    //criar novo usuário
        signup: (req, res, next)=>{
        const{nomeCompleto, cpf, telefone, email, password} = req.body;
        const user = new usuario ({nomeCompleto, cpf, telefone, email, password});
    
        user.save()
        .then(userSaved =>{
            return res.status(201).json(userSaved);
        })
        .catch(error =>{
            return res.status(500).json(error.message);
        }) }, 
    
    // //Buscar todos elementos (Usuarios)
        getAllUsers : (req, res, next) =>{
            usuario.find()
            .then(users => {
                return res.status(200).json(users);
                })   
            .catch(error =>{
                return res.status(500).json({msg: "Erro ao buscar usuários!", error: error.message})  
                });
        },
    
       getUserByID: async (req, res, next)=>{
            let idusuario = req.params.id;
            try{
                    let user = await usuario.findById(idusuario) 
                if(user != null)
                    return res.status(200).json(user)
                else
                return res.status(500).json({msg: "Erro ao buscar usuário!", error: "Usuário não existe!"})
            } catch(error){
                return res.status(500).json({msg: "Erro ao buscar usuário!", error: error.message})
            }
        },
    
        updateUser: async (req, res, next)=>{
            let idusuario = req.params.id;
    
            let usuarioUpdate = {} ;
            if(req.body.nome) usuarioUpdate.nome = req.body.nome;
            if(req.body.cpf) usuarioUpdate.cpf = req.body.cpf;
            if(req.body.telefone) usuarioUpdate.telefone = req.body.telefone;
            if(req.body.email) usuarioUpdate.email = req.body.email;
            if(req.body.senha) usuarioUpdate.senha = req.body.senha;
    
           try{
                await usuario.updateOne ({_id: idusuario}, usuarioUpdate)
    
                return res.status(200).json({msg: "Usuário atualizado com sucesso"});
    
           }catch(error){
            res.status(500).json({msg: "Erro ao atualizar usuário ! ", error: error.message}) 
    
           }
           
        }, 
    
    
        deleteUser: (req, res, next)=>{
            let idusuario = req.params.id;
            
            usuario.findByIdAndDelete(idusuario)
            .then(usuarioDeleted =>{
                res.status(200).json({msg: "Usuário removido com sucesso" , usuario: usuarioDeleted});
            })
            .catch(error =>{
                res.status(500).json({msg: "Erro ao remover usuário ! ", error: error.message})   
    
            })
        },
    };