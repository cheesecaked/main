const User = require("../models/Tasks.js");

exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getUsersById = async (req, res) => {
  const _id = req.params.id;
  try {
    const users = await User.findById({ _id });
    res.send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.createUser = async (req, res) => {
  const user = req.body;
  try {
    const userData = await User.create(user);
    res.send(userData);
  } catch (error) {
    res.status(500).send({ message: "failed to add" + error.messsage });
  }
};
exports.updateUser = async (req, res) => {
  const _id = req.params.id;
  const user = req.body;
  try {
    const updatedData = await User.findByIdAndUpdate({ _id }, user);
    res.send(updatedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedData = await User.findByIdAndDelete({ _id });
    res.send(deletedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// exports.getPost = async (req, res) => {
//   const data = await User.create({
//     title: "amongus",
//     detail: ["1", "2"],
//   });
//   res.send(data);
// };

// exports.getUpdate = async (req, res) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id: req.body.id,
//     },
//     {
//       title: req.body.title,
//     }
//   );
//   res.send(data);
// };
// exports.getDelete = async (req, res) => {
//   const data = await User.findByIdAndDelete({
//     _id: req.body.id,
//   });
//   res.send(data);
// };
