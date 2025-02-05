import mongoose from "mongoose";
export default async function connectDb(URL) {
  try {
    console.log("Database is connected");
    return await mongoose.connect(URL);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}
