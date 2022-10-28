const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  console.log(req.query);
  const user = await User.findOne({ email: req.query.email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }
  bcrypt.compare(req.query.password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { _id: user._id },
        },
        process.env.SECRET_KEY
      );
      return res.header("auth-token", token).json({
        token,
        message: "login successful",
      });
    } else {
      return res.status(403).json({ message: "Email or password incorrect" });
    }
  });
};

exports.postUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (user) {
    return res.status(409).json({ message: "email already exist" });
  }
  try {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    await User.create(newUser);
    res.json({
      message: "Signup Successful",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
