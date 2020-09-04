const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");
const db = require("../config/db");
const User = db.users;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    let user = await User.findOne({ where: { email } });
    if (user) throw Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      throw Error("Someting went wrong with hashing the password");

    user = await User.create({
      email,
      password: hashedPassword,
    });
    if (!user) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    console.log(`TOKEN:\t${token}`);
    console.log(`USER:\t${user}`);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) throw Error("User does not exist");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw Error("Invalid creadentials");

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    if (!token) throw Error("Could not sign the token");

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  if (!req.id) return res.status(400).json({ msg: "No user was logged in" });
  try {
    const user = await User.findOne({ where: { id: req.id } });
    if (!user) throw Error("User Does not exist");
    return res.status(200).json({
      id: user.id,
      email: user.email,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
};
