const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Private
exports.getItems = async (req, res) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Private
exports.getItem = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id, req.user.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create item
// @route   POST /api/items
// @access  Private
exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = {
      name,
      description,
      user_id: req.user.id
    };

    const itemId = await Item.create(newItem);
    const item = await Item.getById(itemId, req.user.id);
    
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
exports.updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    await Item.update(req.params.id, { name, description }, req.user.id);
    const updatedItem = await Item.getById(req.params.id, req.user.id);
    
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
exports.deleteItem = async (req, res) => {
  try {
    await Item.delete(req.params.id, req.user.id);
    res.json({ message: 'Item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};