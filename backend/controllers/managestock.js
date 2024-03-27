const { stock } = require('../models/stock.model');

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Delete the product from the database
    const deletedProduct = await stock.destroy({
      where: { proID: productId } // Use proID to delete the product
    });

    if (deletedProduct === 0) {
      // If no rows were deleted, it means the product doesn't exist
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ message: 'Product Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getProductById = async (req, res) => {
    try {
        const { proID } = req.params;
        const product = await stock.findOne({ where: { proID } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { proID } = req.params;
        const updatedProduct = await stock.update(req.body, { where: { proID } });
        if (updatedProduct[0] === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { deleteProduct , getProductById, updateProduct};