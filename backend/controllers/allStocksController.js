const { stock } = require('../models/stock.model');
const BranchDetails = require('../models/branchDetails.model');

exports.getallstocks = async (req, res) => {
  try {
    const { username, status } = req.query;
    const managerBranch = await BranchDetails.findOne({
      where: { managerUsername: username }
    });

    // Check if managerBranch is undefined
    if (!managerBranch) {
      return res.status(404).json({ success: false, error: 'No branch details found for the provided username' });
    }

    let allStocks;
    // Fetch all stocks for the manager's branch
    if (status && status !== 'All') {
     allStocks = await stock.findAll({
      where: {
        branchId: managerBranch.branchId,
        status:status
      }
    });
  }else{
    allStocks = await stock.findAll({
        where: {
          branchId: managerBranch.branchId,
        }
      });
  }

    // Update status of products with expired expiry date
    const currentDate = new Date();
    for (const stockItem of allStocks) {
      if (new Date(stockItem.expiryDate) < currentDate) {
        await stock.update(
          { status: 'expired' },
          { where: { proID: stockItem.proID } }
        );
      }
    }

    // Fetch updated stock data

    if (status && status !== 'All') {
     allStocks = await stock.findAll({
      where: {
        branchId: managerBranch.branchId,
        status:status
      }
    });
  }else{
    allStocks = await stock.findAll({
        where: {
          branchId: managerBranch.branchId,
        }
      });
  }

    res.status(200).json(allStocks);
  } catch (error) {
    console.error('Error fetching Stocks Data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
