
const factory = require('./factory');
const { MSH } = require('./../databaseModels/AllModels')
exports.getAll = factory.getAll(MSH)