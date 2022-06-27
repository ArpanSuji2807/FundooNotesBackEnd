import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user(USER REGISTRATION)
export const UserRegistration = async (body) => {
  const saltRounds = 10
  const hashpassword = await bcrypt.hash(body.password,saltRounds);
  body.password = hashpassword;
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user(LOGIN)
export const userLogin = async (body) => {
  const data = await User.findOne({email:body.email});
  console.log(data);
  if(data != null){
    const comparePassword = await bcrypt.compare(body.password,data.password);
    if(comparePassword){
       const token = jwt.sign({"Id": data._id,"firstName":data.firstName,"lastName": data.lastName,"email": data.email},process.env.SECRET_KEY);
       return token;
    }
    else{
      throw new Error("Password is incorrect");
    }
  }
  else{
    throw new Error("Email Id does not exist");
  }
};