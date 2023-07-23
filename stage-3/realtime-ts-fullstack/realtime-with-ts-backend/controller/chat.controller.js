const Message = require("../model/chat.model");
const { mongoose } = require("mongoose");

exports.getMessages = async (req, res) => {
  const result = await Message.find({});
  res.status(200).json(result);
};
exports.createMessages = async (req, res) => {
  try {
    const result = await Message.create({
      text: req.body.text
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(405).json(error)
  }
};