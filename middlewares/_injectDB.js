module.exports = (db) => (req, res, next) => {
  req.models = db.models;
  next();
};
