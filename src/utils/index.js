import { hashSync, compareSync, genSaltSync } from "bcrypt";
import config from "../config/env.js"
import jwt from "jsonwebtoken";
 const JWT_SECRET = config.jwt_secret

export const createHash = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const isValidPassword = (password, hash) => compareSync(password, hash);

export const createToken = (user) => {
  return jwt.sign( {user}, JWT_SECRET, { expiresIn: "10m" });
};

export const verifyToken=(token)=>{
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}