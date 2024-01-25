const User = require('../models/User')
const bcrypt = require('bcrypt')
const cors = require('cors');
const router = require("express").Router();

// Apply CORS middleware for the entire router
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);


const registerUser=async(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
    try {
        
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        
        const newUser=await User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
        });
        const savedUser=await newUser.save();
        // req.session.user = savedUser;
        return res.status(200).json(savedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginUser=async(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
    const user=await User.findOne({email:req.body.email});

    if(user){
        try {
            const isValid=await bcrypt.compare(req.body.password,user.password);
            
            if(isValid) {
                req.session.user = user;

                const {password,...others}=user._doc;
                // console.log(req.session.user);
                return res.status(200).json(others);
            }else{
                return res.status(500).json("Wrong credentials!");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }else{
        return res.status(404).json({message:'User not found'});
    }
}

const logoutUser = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
    // Clear the user session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error destroying session' });
      }
  
      return res.status(200).json({ message: 'Logout successful' });
    });
  };

module.exports={registerUser,loginUser,logoutUser};