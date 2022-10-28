const User = require("../model/user");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.data._id });
    if (user.role === "user")
      return res.status(403).send("User is not authorized");
    next();
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};
