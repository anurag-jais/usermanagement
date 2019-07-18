const express = require('express');
const router = express.Router();
const apiController = require('../Controller/Api');



router.post('/api/users/create', apiController.createUser);
router.get('/api/users/getuser/:id',apiController.getUser);
router.post('/api/users/edituser/:id',apiController.updateUser);
router.post('/api/users/deleteuser/:id',apiController.deleteUser);
router.get('/api/users/filterage/:age',apiController.filterAge);
router.get('/api/users/filtername/:value',apiController.filterName);
router.get('/api/users/filtercity/:value',apiController.filterAddress);
router.get('/api/users/filterprofession/:value',apiController.filterProfession);
router.get('/api/users/compoundfilter',apiController.compoundFilter);

module.exports = router;