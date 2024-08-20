import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Successful response",
  });
};

//update user
export const updateUser = async (req, res, next) => {
  // req.params.id is from the route /update/:id'
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You can only update your own profile!")
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUSer = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    const {password, ...rest} = updatedUSer._doc; //need to remove the password
    res.status(200).json(rest)
  } catch (error) {
    next(error);
  }
};
