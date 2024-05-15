const { stock } = require('../models/stock.model');
const  BranchDetails  = require('../models/branchDetails.model');

exports.addProduct = async (req, res) => {
    try {
        const { username } = req.query;
        const managerBranch = await BranchDetails.findOne({
            where: { managerUsername: username }
        });

        // Check if managerBranch is undefined
        if (!managerBranch) {
            return res.status(404).json({ success: false, error: 'No branch details found for the provided username' });
        }

        const { productName, category, dosage, price, brandName, quantity, manufactureDate, expiryDate, description,barcode } = req.body;

        // Check if product already exists in stock
        let existingProduct = await stock.findOne({
            where: {
                productName,
                category,
                dosage,
                branchId: managerBranch.branchId,
                status:'valid'
            }
        });

        if (existingProduct) {
            const updatedQuantity = existingProduct.quantity + quantity;
            existingProduct = await existingProduct.update({
                quantity: updatedQuantity,
                unitPrice: price,
                manufactureDate,
                expiryDate,
                description
            });

            res.status(200).json({ success: true, message: 'Product quantity updated', data: existingProduct });
        } else {
            // Product doesn't exist, create new record
            const newProduct = await stock.create({
                productName,
                brandName,
                category,
                dosage,
                unitPrice: price,
                quantity,
                manufactureDate,
                expiryDate,
                description,
                branchId: managerBranch.branchId,
                status: 'valid',
                barcode,
            });

            res.status(201).json({ success: true, message: 'Product added', data: newProduct });
        }
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
