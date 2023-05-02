let express = require('express');
let router = express.Router();
let controller = require('../controllers/formOpenHouse');



router.get('/getAllformOpenHouse', controller.getAllformOpenHouse);
router.get('/getformOpenHouseByID/:id', controller.getformOpenHouseByID);
router.post('/addformOpenHouse', controller.addformOpenHouse);
router.put('/updateformOpenHouse/:id', controller.updateformOpenHouse);
router.delete('/deleteformOpenHouse/:id', controller.deleteformOpenHouse);

module.exports = router;