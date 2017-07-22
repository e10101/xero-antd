const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/people');

router.get('/', ctrl.getAll);
router.post('/fetch', ctrl.getAll);
router.post('/', ctrl.addOne);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.updateOne);
router.delete('/:id', ctrl.deleteOne);

module.exports = router;
