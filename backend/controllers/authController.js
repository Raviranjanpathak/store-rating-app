const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      address,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("REQ BODY:", req.body);

    const user = await User.findOne({ where: { email } });

    console.log("DB USER:", user?.email);

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.update(
    { password: hashed },
    { where: { id: req.user.id } }
  );

  res.json({ msg: "Password updated" });
};