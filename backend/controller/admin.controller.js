import User from "../models/userModel.js";

export const getUserData =async (req, res) => {
   try {
        console.log('getUserData===============');
        const users = await User.find({});
      
        res.json({ message: 'User data retrieved', data: users });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
