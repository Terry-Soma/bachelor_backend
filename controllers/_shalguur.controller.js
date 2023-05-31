
const factory = require('./factory');
const { Shalguur } = require('../databaseModels/AllModels');
exports.getAll = factory.getAll(Shalguur)
exports.createShalguur = factory.createOne(Shalguur)
exports.getShalguur = factory.getOne(Shalguur)
exports.updateShalguur = factory.updateOne(Shalguur)
exports.deleteShalguur = factory.deleteOne(Shalguur)
