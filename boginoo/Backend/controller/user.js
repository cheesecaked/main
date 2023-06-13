const Data = require("../model/Task");
const User = require("../model/user");

exports.getUser = async (req, res) => {
  try {
    const user = await Data.find();
    console.log(Data);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.getPost = (req, res) => {
  try {
    const user = Data.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

exports.createShort = async (req, res) => {
  try {
    let stringId = (Math.random() + 1).toString(36).substring(7);

    const createdShort = await Data.create({
      orignalLink: req.body.orignalLink,
      shortLink: stringId,
    });
    res.send(createdShort);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteShort = async (req, res) => {
  try {
    const id = req.params.id;
    const delete_short = await Data.findByIdAndDelete(id);
    res.status(200).json(delete_short);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
