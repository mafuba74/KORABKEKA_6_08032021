const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getSauces);
router.get('/:id', auth, sauceCtrl.findSauce);
router.post('/', auth, multer, sauceCtrl.postSauce);
router.post('/:id/like', auth, sauceCtrl.sauceLikes);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;