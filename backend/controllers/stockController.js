const Stock = require('../models/stock.model');

const addStockItem = async (req, res) => {
    try {
        const newStockItem = await Stock.create(req.body);
        res.status(201).json(newStockItem);
    } catch (error) {
        console.error('Error adding stock item:', error);
        res.status(500).json({ error: 'Failed to add stock item' });
    }
};

const getAllStockItems = async (req, res) => {
    try {
        const allStockItems = await Stock.findAll();
        res.status(200).json(allStockItems);
    } catch (error) {
        console.error('Error fetching stock items:', error);
        res.status(500).json({ error: 'Failed to fetch stock items' });
    }
};

module.exports = { addStockItem, getAllStockItems };