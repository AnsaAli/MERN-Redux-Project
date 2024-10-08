import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a hashed password
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  console.log("sign in");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Invalid email or password"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_Secret,
      { expiresIn: "1h" }
    );
    //no need to send the password, for safty purpose
    const { password: hashPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ ...rest, isAdmin: validUser.isAdmin });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  console.log("Received request body:", req.body);

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("Google controller: existing user");
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_Secret
      );
      const { password: hashPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ ...rest, isAdmin: user.isAdmin });
    } else {
      console.log("Google controller: no user found, creating new user");

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_Secret
      );
      const { password: hashPassword, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ ...rest, isAdmin: newUser.isAdmin });
    }
  } catch (error) {
    console.log("Error in Google controller:", error);
    next(error);
  }
};

export const signOut = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};
