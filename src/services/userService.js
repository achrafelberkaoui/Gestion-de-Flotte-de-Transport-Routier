const user = require("../models/User");
const bcrypt = require("bcryptjs");
const getAllUsers = async(req,res)=>{
    const users = await user.find().select('-password');
    return users;
}

const createUser = async (userData)=>{
    const {nom, email, password, role, statut} = userData;
    if(!email){
      throw new Error("enter the Email");
    }
    if(!password){
      throw new Error("enter the password");
    }
    if(!nom){
      throw new Error("enter the name");
    }
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
        nom, 
        password : hashedPassword,
        email,
        role,
        statut
    })

    return newUser;
}

module.exports = {
    getAllUsers,
    createUser
};