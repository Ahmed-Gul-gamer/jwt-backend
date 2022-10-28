const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers);
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) return res.status(401).send("Access Denied");
    if (verified.exp <= Math.floor(Date.now() / 1000))
      return res.status(200).send("Token Expired");
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};
