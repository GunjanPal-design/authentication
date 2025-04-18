const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const sendEmail = require("../config/mailer");
const jwt = require("jsonwebtoken");

// const SECRET_KEY = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const secretKey = "56tdn7kqh1isyfu6rn3u8b";
// console.log(SECRET_KEY)
const generateToken = (user) => {
  const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, {
    expiresIn: "24h",
  });
  return token;
  1;
};
//Register
const register = async (req, res) => {
  const { f_name, l_name, email, password, role } = req.body;
  console.log("req.body", req.body);

  try {
    //Check user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      f_name,
      l_name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);

    await sendEmail(user.email, token);

    res.status(201).json({
      status: "success",
      message:
        "Registered successfully! Email sent, please check your inbox for verification.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
    console.error(err);
  }
};
//Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email and password" });
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "invalid password" });
    }

    //Generate a token
    const token = await jwt.sign({ _id: user._id }, secretKey);
    if (!token) {
      return res.json({ message: "invalid credentials" });
    }
    res.status(200).json({
      status: "200",
      message: "user logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
//Forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //Check for the user with this email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    //Generate a token
    const token = generateToken(user);

    await sendEmail(user.email, token);

    res.status(200).json({ message: "Reset email sent" });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err.message });
  }
};

//Reset Your Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);

    const { password } = req.body;

    if (!password) {
      res.status(400).send({ message: "password is required" });
    }

    //Decode the password
    const decode = jwt.verify(token, secretKey);

    //Find the user
    const user = await userModel.findById(decode._id);

    //Secure the password
    user.password = await bcrypt.hash(password, 10);

    await user.save();
    return res.status(200).send({ message: "password reset successfully" });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err.message });
  }
};

//Verification
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, secretKey);
    const user = await userModel.findById(decoded._id);
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "User already verified" });
    }

    user.isVerified = true;
    await user.save();
    console.log("User verified:", user);

    res.redirect("http://localhost:4000/login");
  } catch (err) {
    res
      .status(500)
      .json({ error: "Verification failed", details: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const [token] = authHeader.split(" ");

    //Decode the token
    const decoded = jwt.verify(token, secretKey);

    //Find the user by id
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(400).json("user not found");
    } else {
      return res.status(200).json({ status: "200", data: user });
    }
  } catch (err) {
    res.status(500).json({ error: "invalid token", details: err.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  Login,
  forgetPassword,
  resetPassword,
  getUser,
};
