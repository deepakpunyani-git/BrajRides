const Client = require('../models/User');
const { validationResult } = require('express-validator');

exports.listClients = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const query = { usertype: 'client' };


    const sortField = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    const clients = await Client.find(query)
      .select('name email block_user status dateCreated dateUpdated gender')
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


