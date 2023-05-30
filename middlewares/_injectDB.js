module.exports = (db) => (req, res, next) => {
  req.models = db.models;
  req.sequelize = db;
  next();
};
