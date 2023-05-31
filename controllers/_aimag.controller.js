const factory = require('./factory');
const { Aimag } = require('../databaseModels/AllModels');
exports.getAll = factory.getAll(Aimag);
exports.createAimag = factory.createOne(Aimag)
exports.getAimag = factory.getOne(Aimag)
exports.updateAimag = factory.updateOne(Aimag)
exports.deleteAimag = factory.deleteOne(Aimag)
