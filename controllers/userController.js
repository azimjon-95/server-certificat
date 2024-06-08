const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username, password });
    console.log(user);
    const token = createToken(user._id);
    res.status(200).json({ username, token, role: user.role, id: user._id, subject: user.subject });
  } catch (error) {
    handleError(res, error);
  }
}

const signupUser = async (req, res) => {
  const { username, password, name, lastname, number, subject } = req.body;

  try {
    const user = await Users.signup(username, password, name, lastname, number, subject);
    const token = createToken(user._id);
    res.status(200).json({ username, token, role: user.role, id: user._id, name, lastname, subject });
  } catch (error) {
    handleError(res, error);
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
}

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("Invalid user ID");

    const user = await Users.findById(id);
    if (!user) throw new Error("User not found");

    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, lastname, number } = req.body;

  try {
    if (!id) throw new Error("Invalid user ID");

    const user = await Users.findById(id);
    if (!user) throw new Error("User not found");

    Object.assign(user, { username, name, lastname, number });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("Invalid user ID");

    const user = await Users.findById(id);
    if (!user) throw new Error("User not found");

    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: `${user.username} has been deleted` });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = { signupUser, loginUser, getUsers, getSingleUser, updateUser, deleteUser };

