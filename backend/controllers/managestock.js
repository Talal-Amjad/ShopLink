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

module.exports = { deleteProduct };