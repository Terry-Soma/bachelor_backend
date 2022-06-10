exports.face = (req, res, next) => {
  let email = req.user.email;
  let fbid = req.user.facebookid;
  res.status(200).json({
    email,
    fbid,
  });
};
