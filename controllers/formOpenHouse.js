const mongoose = require('mongoose')
let formOpenHouse = require('../models/formOpenHouse')

module.exports ={


    //Buscar todos formulário OpenHouse
        getAllformOpenHouse : (req, res, next) =>{
            formOpenHouse.find()
            .then(form => {
                return res.status(200).json(form);
                })   
            .catch(error =>{
                return res.status(500).json({msg: "Erro ao buscar formulário!", error: error.message})  
                });
        },
    
       getformOpenHouseByID: async (req, res, next)=>{
                let idformOpenHouse = req.params.id;
            try{
                let form = await formOpenHouse.findById(idformOpenHouse) 
                
            if(form != null)
                return res.status(200).json(form)
            else
            return res.status(500).json({msg: "Erro ao buscar formulário!", error: "formulário não existe!"})
            } catch(error){
                return res.status(500).json({msg: "Erro ao buscar formulário!", error: error.message})
            }
        },
    
            
        addformOpenHouse : async (req, res, next) =>{
            let newformOpenHouse = new formOpenHouse();
            newformOpenHouse.nomeCompleto =  req.body.nomeCompleto;
            newformOpenHouse.telefone = req.body.telefone? req.body.telefone: '';
            newformOpenHouse.email = req.body.email;
            newformOpenHouse.cep = req.body.cep;
            newformOpenHouse.logradouro = req.body.logradouro;
            newformOpenHouse.complemento = req.body.complemento;
            newformOpenHouse.bairro = req.body.bairro;
            newformOpenHouse.cidade = req.body.cidade;
            newformOpenHouse.estado = req.body.estado;
            newformOpenHouse.larva =  req.body.larva;
            newformOpenHouse.pupa =  req.body.pupa;
            newformOpenHouse.quantidadeLarva =  req.body.quantidadeLarva;
            newformOpenHouse.codigoDeposito =  req.body.codigoDeposito;
            newformOpenHouse.deposito =  req.body.deposito;
            newformOpenHouse.especie =  req.body.especie;
            
           try{
                let savedformOpenHouse = await newformOpenHouse.save();
                return res.status(201).json({msg: "formulário adicionado com sucesso !" , form: savedformOpenHouse})
            }catch (error){
                console.log("ERROR ", error)
                return res.status (500).json({msg: "Erro ao salvar formulário" , error: error.message})
            }
        },
    
        updateformOpenHouse: async (req, res, next)=>{
            let idformOpenHouse = req.params.id;
    
            let formUpdate = {} ;
            if(req.body.nomeCompleto) formUpdate.nomeCompleto = req.body.nomeCompleto;
            if(req.body.telefone) formUpdate.telefone = req.body.telefone;
            if(req.body.email) formUpdate.email = req.body.email;
            if(req.body.cep) formUpdate.cep = req.body.cep;
            if(req.body.logradouro) formUpdate.logradouro = req.body.logradouro;
            if(req.body.complemento) formUpdate.complemento = req.body.complemento;
            if(req.body.bairro) formUpdate.bairro = req.body.bairro;
            if(req.body.cidade) formUpdate.cidade = req.body.cidade;
            if(req.body.estado) formUpdate.estado = req.body.estado;
            if(req.body.larva) formUpdate.larva = req.body.larva;
            if(req.body.pupa) formUpdate.pupa = req.body.pupa;
            if(req.body.quantidadeLarva) formUpdate.quantidadeLarva = req.body.quantidadeLarva;
            if(req.body.codigoDeposito) formUpdate.codigoDeposito = req.body.codigoDeposito;
            if(req.body.deposito) formUpdate.deposito = req.body.deposito;
            if(req.body.especie) formUpdate.especie =  req.body.especie;
            
           try{
                await formOpenHouse.updateOne ({_id: idformOpenHouse}, formUpdate)
    
                return res.status(200).json({msg: "Formulário atualizado com sucesso"});
    
           }catch(error){
            res.status(500).json({msg: "Erro ao atualizar formulário! ", error: error.message}) 
    
           }
           
        }, 
    
    
        deleteformOpenHouse: (req, res, next)=>{
            let idformOpenHouse = req.params.id;
            
            formOpenHouse.findByIdAndDelete(idformOpenHouse)
            .then(formDeleted =>{
                res.status(200).json({msg: "Formulário removido com sucesso" , form: formDeleted});
            })
            .catch(error =>{
                res.status(500).json({msg: "Erro ao remover forme ! ", error: error.message})   
        
            })
        }
    }