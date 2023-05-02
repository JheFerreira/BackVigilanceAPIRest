let express = require('express');
let router = express.Router();
let controller = require('../controllers/formClosedHouse');

/* GET users listing. */

router.get('/getAllformClosedHouse', controller.getAllformClosedHouse);
router.get('/getformClosedHouseByID/:id', controller.getformClosedHouseByID);
router.post('/addformClosedHouse', controller.addformClosedHouse);
router.put('/updateformClosedHouse/:id', controller.updateformClosedHouse);
router.delete('/deleteformClosedHouse/:id', controller.deleteformClosedHouse);

module.exports = router;