import asyncHandler from 'express-async-handler';
import User from '../models/model.js';
import generateToken from '../generateToken.js';

// Authorizes the User while logging In
const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      console.log(user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        gender: user.gender,
      });
    } else {
      res.status(401);
      throw new Error('Invalid name or password');
    }
  });

// Register New User
const registerUser = asyncHandler(async(req, res) => {
    const { name, password, gender } = req.body;
  
    const userExists = await User.findOne({ name });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      password,
      gender
    });
  
    if (user) {
      generateToken(res, user._id);
      console.log(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        password: user.password,
        gender: user.gender
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  
    res.status(200).json({message: "Register user"})
  });

// logout current User
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Successfully logout' });
  };

// Update People Details, PUT Request
const updatePeople = asyncHandler(async (req, res) => {
  console.log(req);
  const user = await User.findById(req.user.name);

  if (user) {
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      gender: updatedUser.gender,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get People Statistics, GET Request
const getStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.map(stat => ({
      gender: stat._id,
      count: stat.count
    }));

    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



export { loginUser, registerUser, logoutUser, updatePeople, getStats};
