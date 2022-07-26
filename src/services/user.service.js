import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSender } from '../utils/helper';
import { producer } from '../utils/rabbitmq';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user(USER REGISTRATION)
export const UserRegistration = async (body) => {
  const mail = await User.findOne({email:body.email})
  if(mail){
    throw new Error("Email Id already exists");
  }else{
    const saltRounds = 10
    const hashpassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    producer(data);
    return data;
  }
};

//get single user(LOGIN)
export const userLogin = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  if (data != null) {
    const comparePassword = await bcrypt.compare(body.password, data.password);
    if (comparePassword) {
      const token = jwt.sign({ "Id": data._id, "firstName": data.firstName, "lastName": data.lastName, "email": data.email }, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Password is incorrect");
    }
  }
  else {
    throw new Error("Email Id doesn't exist");
  }
};

export const forgetPassword = async (body) => {
  const data = await User.findOne({ "email": body.email });
  console.log("Inside service--->>>",data);
  if (data != null) {
    const token = await jwt.sign({ email: data.email,_id:data._id }, process.env.FORGET_PASS_KEY);
    console.log("Inside service token---->>>>",token);
    const result = await mailSender(data.email, token);
    console.log("Result inside service--->>>",result);
    return result;
  } else {
    throw new Error("Mail Id not present");
  }
}

export const resetPassword = async (token, body) => {
  //const tokenData = await jwt.verify(token, process.env.FORGET_PASS_KEY);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password,saltRounds);
  body.password = passwordHash; 
  const data = User.findOneAndUpdate(
    {
      email: body.email
    },
    {
      password: body.password
    },
    {
      new: true
    })
  return data;
};