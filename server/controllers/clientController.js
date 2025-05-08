const Client = require('../models/User');
const { validationResult } = require('express-validator');

exports.listClients = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = { userType: 'user' };


    const sortField = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    const clients = await Client.find(query)
      .select(' phone block_user dateCreated dateUpdated')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Client.countDocuments(query);

    res.json({
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};


