const logger = (req, res, next) => {
  console.log("-------- Cookies: ".cyan, ` ${req.cookies[process.env.CookieName]}`.green);
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`.green
  );
  next();
};

module.exports = logger;