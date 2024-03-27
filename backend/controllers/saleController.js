// controller:
const { sale } = require('../models/sales.model');
const { stock } = require('../models/stock.model');
const BranchDetails = require('../models/branchDetails.model');

async function addSale(req, res) {
    const { username } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });
  
    const { customerName, customerPhone, additionalProducts } = req.body;
  
    try {
      for (const product of additionalProducts) {
        const { productName, productCategory, unitPrice, quantity } = product;
  
        // Calculate total price
        const totalPrice = unitPrice * quantity;
  
        // Find product in stock
        const foundProduct = await stock.findOne({
          where: {
            productName: productName,
            category: productCategory,
            branchId: managerBranch.branchId,
          }
        });
  
        if (!foundProduct) {
          return res.status(400).json({ error: 'Product not found in stock' });
        }
  
        if (foundProduct.quantity < quantity) {
          // If added sales quantity is more than available stock quantity
          return res.status(400).json({ error: `Insufficient stock. Only ${foundProduct.quantity} items are in stock for ${productName} (${productCategory})` });
        }
  
        // Create new sale
        await sale.create({
          productId: foundProduct.proID,
          quantity,
          unitPrice,
          totalPrice,
          customerName,
          productName,
          productCategory,
          customerPhone,
          branchId: managerBranch.branchId,
        });
      }
  
      return res.status(201).json({ message: 'Sales added successfully' });
    } catch (error) {
      console.error('Error adding sale: ', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


async function getallbranchsales(req, res) {
  try {
    const { username } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });

    // Check if managerBranch is undefined
    if (!managerBranch) {
      return res.status(404).json({ success: false, error: 'No branch details found for the provided username' });
    }

    let allSales;
    // Fetch all sales for the manager's branch
    allSales = await sale.findAll({
      where: {
        branchId: managerBranch.branchId,
      }
    });

    res.status(200).json(allSales);
  } catch (error) {
    console.error('Error fetching Sales Data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSale = async (req, res) => {
    try {
      const { saleId } = req.params;
  
      // Delete the product from the database
      const deletedSale = await sale.destroy({
        where: { saleId: saleId } // Use proID to delete the product
      });
  
      if (deletedSale === 0) {
        // If no rows were deleted, it means the product doesn't exist
        return res.status(404).json({ error: 'Sale not found' });
      }
  
      return res.json({ message: 'Sale Deleted Successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const checkStock = async (req, res) => {
    try {
      const { productName, productCategory } = req.query;
  
      // Find the product in stock
      const existingProduct = await stock.findOne({ 
        where: { 
          productName: productName,
          category: productCategory 
        } 
      });
  
      // If the product doesn't exist in stock
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found in stock.' });
      }
  
      // Send back the product information
      res.status(200).json(existingProduct);
    } catch (error) {
      console.error('Error checking stock:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  


const addSale2 = async (req, res) => {
  try {
    const { username } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });
    const { customerId, customerName, customerPhone, products } = req.body;

    // Loop through each product and validate against stock
    for (const product of products) {
      const { productName, productCategory, quantity } = product;

      // Find the product in the stock based on productName and productCategory
      const existingProduct = await stock.findOne({ 
        where: { 
          productName: productName,
          category: productCategory
        } 
      });

      if (!existingProduct) {
        return res.status(404).json({ message: `Product ${productName} in category ${productCategory} not found in stock.` });
      }

      if (existingProduct.quantity < quantity) {
        return res.status(400).json({ message: `Not enough quantity available for product ${productName} in category ${productCategory}.` });
      }

      // Calculate total price
      const totalPrice = existingProduct.unitPrice * quantity;

      // Update stock quantity
      const updatedQuantity = existingProduct.quantity - quantity;
      console.log("updated",updatedQuantity)
      await stock.update({ quantity: updatedQuantity }, { where: { proID: existingProduct.proID } });

      // Create sale record for each product
      await sale.create({
        customerId,
        customerName,
        customerPhone,
        productId: existingProduct.proID, // Use the proID of the existing product
        quantity,
        unitPrice: existingProduct.unitPrice,
        totalPrice,
        productName,
        productCategory,
        salesDate: new Date(),
        branchId: managerBranch.branchId
      });
    }

    return res.status(201).json({ message: 'Sale added successfully.' });
  } catch (error) {
    console.error('Error adding sale:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//for owner
async function getallbranchessales(req, res) {
  try {
    const { branchId } = req.query;
    let Sales
    if ((req.query.branchId && req.query.branchId !== 'All')) {
       Sales = await sale.findAll({
      where: { branchId: branchId}
    });
  }
  else{
    Sales = await sale.findAll();
  }
    


    res.json(Sales);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
    addSale,
    getallbranchsales,
    deleteSale,
    checkStock,
    addSale2,
    getallbranchessales
};
