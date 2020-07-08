const userModel = require('../models/userModel');
const debug = console.log.bind(console);
let createUser = (email,username,password)=>{
  return new Promise( async(resolve,reject)=>{
    debug('create user');
    let userByEmail = await userModel.findOne({email});
    if(userByEmail){
      return reject({message: "email da ton tai"});
    }
    let userItem = {
      username: username,
      email: email,
      password: hashPassword(password),
    }
    
    const newUser = await new userModel(userItem);
    await newUser.save();
    return resolve({message:" send thanh cong"});
  });
}

module.exports = {createUser:createUser};
