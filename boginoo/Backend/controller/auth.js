const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Data = require("../model/Task");
require("dotenv").config();
exports.getUsers = async (req, res) => {
  const token = req.header("x-auth-token");
  const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  console.log(verified);
  const data = await User.find();
  res.send(data);
};
exports.register = async (request, response) => {
  const { email, password } = request.body;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hash });

    response.status(200).json({
      message: "successfully created user",
      data: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign(
      { email: user.email, password: user.password, id: user._id },
      process.env.ACCESS_TOKEN_KEY
    );
    console.log("token", token);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        history: user.history,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.tokenValidate = async (req, res) => {
  try {
    const token = req.header["x-auth-token"];
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getHistory = async (req, res) => {
  const id = req.params.id;
  const result = await User.findById({ _id: id }).populate("history");
  res.send(result);
};

exports.addLinkToUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const linkId = req.body.id;

    const user = await User.findById(userId);
    console.log(user);
    user.history.push(linkId);
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
exports.historyPagination = async (req, res) => {
  const id = req.params.id;
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const result = await User.findById({ _id: id})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE * page)
  .populate("history")
  console.log(result)
  const total = await User.countDocuments(result.history);

  console.log(total);
  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    history: result.history
  })
  // res.json({ totalPages: Math.ceil(total / PAGE_SIZE), posts });
  // const posts = await Data.find({})
  //   .limit(PAGE_SIZE)
  //   .skip(PAGE_SIZE * page);

  // res.json({
  //   totalPages: Math.ceil(total / PAGE_SIZE),
  //   posts,
  // });
};
