const mongoose = require('mongoose')
let formClosedHouse = require('../models/formClosedHouse')

module.exports ={

//Buscar todos  dados formes  - ClosedHouse
getAllformClosedHouse : (req, res, next) =>{
    formClosedHouse.find()
    .then(form => {
        return res.status(200).json(form);
        })   
    .catch(error =>{
        return res.status(500).json({msg: "Erro ao buscar formulário!", error: error.message})  
        });
},

getformClosedHouseByID: async (req, res, next)=>{
    let idformClosedHouse = req.params.id;
    try{
        let form = await formClosedHouse.findById(idformClosedHouse) 
    if(form != null)
        return res.status(200).json(form)
    else
return res.status(500).json({msg: "Erro ao buscar formulário!", error: "Formulário não existe!"})
    } catch(error){
return res.status(500).json({msg: "Erro ao buscar formulário!", error: error.message})
    }
},

addformClosedHouse : async (req, res, next) =>{
    let newformClosedHouse = new formClosedHouse();
    newformClosedHouse.data =  req.body.data;
    newformClosedHouse.cep =  req.body.cep;
    newformClosedHouse.logradouro =  req.body.logradouro;
    newformClosedHouse.complemento =  req.body.complemento;
    newformClosedHouse.bairro =  req.body.bairro;
    newformClosedHouse.cidade =  req.body.cidade;
    newformClosedHouse.estado =  req.body.estado;
    newformClosedHouse.retorno =  req.body.retorno;
    

   try{
        let savedformClosedHouse = await newformClosedHouse.save();
        return res.status(201).json({msg: "Formulário adicionado com sucesso !" , form: savedformClosedHouse})
    }catch (error){
        return res.status (500).json({msg: "Erro ao salvar formulário" , error: error.message})
    }
},

  
updateformClosedHouse: async (req, res, next)=>{
         let idformClosedHouse = req.params.id;

         let formUpdate = {} ;
                if(req.body.data) formUpdate.data = req.body.data;
                if(req.body.cep) formUpdate.cep = req.body.cep;
                if(req.body.logradouro) formUpdate.logradouro = req.body.logradouro;
                if(req.body.complemento) formUpdate.complemento = req.body.complemento;
                if(req.body.bairro) formUpdate.bairro = req.body.bairro;
                if(req.body.cidade) formUpdate.cidade =  req.body.cidade;
                if(req.body.estado) formUpdate.estado =  req.body.estado;
                if(req.body.retorno) formUpdate.retorno =  req.body.retorno;

    
            try{
                    await formClosedHouse.updateOne ({_id: idformClosedHouse}, formUpdate)

                    return res.status(200).json({msg: "Formulário atualizado com sucesso"});

            }catch(error){
                res.status(500).json({msg: "Erro ao atualizar formulário ! ", error: error.message}) 

            }
            
        },

    deleteformClosedHouse: (req, res, next)=>{
        let idformClosedHouse = req.params.id;

        formClosedHouse.findByIdAndDelete(idformClosedHouse)
        .then(formDeleted =>{
            res.status(200).json({msg: "Formulário removido com sucesso" , form: formDeleted});
        })
        .catch(error =>{
            res.status(500).json({msg: "Erro ao remover formulário! ", error: error.message})   

        })
    },
}

