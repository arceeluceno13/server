const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const itemController = require('../controllers/itemController');

router.use(protect);

router.route('/')
  .get(itemController.getItems)
  .post(itemController.createItem);

router.route('/:id')
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;