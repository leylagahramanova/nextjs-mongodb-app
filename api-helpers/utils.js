// /api-helpers/utils

import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://leyla:TO4xuv9sh04Z2gxV@cluster0.qpxcyjh.mongodb.net/retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err; // Rethrow the error to indicate connection failure
  }
};

export default connectToDatabase;

