const app = require('../bin/www')

//Importar a bibliotecas
let chai = require ("chai"); 
let chaiHttp = require('chai-http')
let expect = chai.expect
const base_url = 'http://localhost:3000';

//Usar biblioteca chaiHTTP para simular requisições na API

chai.use(chaiHttp);

let userTest = {
    nome: "Usuário Teste", 
    cpf :'112.141.111-11',
    email :'teste@teste.com.br',
    senha :'Admin5@0'

}



describe ("Teste de Usuários na API", () =>{

    it("Deve buscar todos usuários", (done) =>{
        chai.request(base_url)
        .get('/users')
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array')
            done();
        });

    });

    it("Deve apresentar erro 404", (done) =>{
        chai.request(base_url)
        .get('/qualquercoisa')
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error')
            done();
        });

    });

    it ("Deve adicionar um novo usuário",  (done) =>{
        chai.request(base_url)
        .post('/users/')
        .send(userTest)
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('user')
            userTest._id = res.body.user._id;
            done();
        });

    });

    it ("Não Deve adicionar um novo usuário (falta CPF)",  (done) =>{
        chai.request(base_url)
        .post('/users/')
        .send({nome: "Usuário", email: "teste@teste.com.br"})
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error')
            done();
        });

    });

    it ("Deve editar um usuário existente",  (done) =>{
        let userEdit = {
            nome: "Usuário Editado"
        }
        chai.request(base_url)
        .put('/users/' +userTest._id)
        .send(userEdit)
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('msg')
            done();
        });

    });

    it ("Não Deve retornar um usuário (ID não existe)",  (done) =>{
        chai.request(base_url)
        .get('/users/' +1213131326464)
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error')
            done();
        });

    });

    it ("Deve retornar um usuário existente e específico",  (done) =>{
        chai.request(base_url)
        .get('/users/' +userTest._id)
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body.nome).to.equal("Usuário Editado")
            done();
        });

    });


    it ("Deve remover um usuário exisitente",  (done) =>{
        chai.request(base_url)
        .delete('/users/' +userTest._id)
        .end((err, res) => {
            //expect = espero
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.not.have.property('error')
            userTest._id = res.body.user._id;
            done();
        });

    });


    
    
});