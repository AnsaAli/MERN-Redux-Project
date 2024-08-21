import User from "../models/userModel.js";

export const getUserData = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json({ message: "User data retrieved", data: users });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export const getUserDataById = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
      } catch (error) {
        next(error);
      }
}

export const updateAdminUser = async (req,res,next) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    // console.log(userId)
    // console.log('updatedData',updatedData)
    const updateUser = await User.findByIdAndUpdate(userId, updatedData,{
        new: true,
    })
    res.json({ message: "User updated successfully", data: updateUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async( req,res,next)=>{
  try {
    const userId= req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if(!deleteUser) return res.status(404).json('User not found');

    res.status(200).json('User deleted succefully')
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    next(error);
  }
}


