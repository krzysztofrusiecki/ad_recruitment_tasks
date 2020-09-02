const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const User = db.users;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ where: { email } });
  if (user)
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    user = User.create({
      email,
      password: hashedPassword,
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) return res.json({ message: "User does not exist" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  return res.json({ token });
};

module.exports = {
  signUp,
  signIn,
};
