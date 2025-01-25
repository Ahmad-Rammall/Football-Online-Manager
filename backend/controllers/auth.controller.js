const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const topUsedPasswords = require("../topUsedPasswords");
const teamQueue = require("../queue");

const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W)(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};

const checkPassword = (password) => {
  if (
    topUsedPasswords.includes(password.toLowerCase()) ||
    !validatePassword(password)
  ) {
    return "Weak Password. Please Change It!";
  }
  return 1;
};

const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
  });

  const createdUser = await User.create(user);

  await teamQueue.add({ userId: createdUser._id });
  return createdUser;
};

const login = async (id, email, password, hashedPassword) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword) {
    return { error: "Invalid username or password" };
  }

  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};

const userAuth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and Password Required!" });

  if (!validateEmailFormat(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const checkedPassword = checkPassword(password);

      if (checkedPassword !== 1) {
        return res.status(400).json({ message: checkedPassword });
      }

      const newUser = await createUser(email, password);
      return res.status(200).json({ user: newUser });
    } else {
      const authResult = await login(user.id, email, password, user.password);
      if (authResult.error) {
        return res.status(400).json({ message: authResult.error });
      }

      const { password: _, ...userDetails } = user.toJSON();
      return res.status(200).json({
        user: userDetails,
        token: authResult.token,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userAuth,
};
