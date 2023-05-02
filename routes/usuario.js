let express = require('express');
let router = express.Router();
let controller = require('../controllers/usuario');



router.post('/signup', controller.signup);
router.get('/getAllUsers', controller.getAllUsers);
router.get('/getUserByID/:id', controller.getUserByID);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);


module.exports = router;