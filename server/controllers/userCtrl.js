const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")

const userCtrl = {
    registerUser: async(req, res) => {
        const { name, email, password, image } = req.body;
        
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "The email already exists."
            })
        }

        const newUser = await User.create({
            name,
            email,
            password,
            image,
        });
            if(newUser) {
                return res.status(201).json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    image: newUser.image,
                });
            } else {
                return res.status(400).json({
                    error: "Unable to add user!"
                })
            }
    },
    authUser: async(req, res) => {
        const { email, password} = req.body;

        const user= await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                image: user.image,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({
                error: "Invalid user or password!"
            })
        }
    }
}

module.exports = userCtrl;