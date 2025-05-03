import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { error, success } from "../utils/responseWrapper.js";


const logincontroller = async (req,res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    // Check status
    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'Your account is not active.' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user._doc;
    const sendUser = userData;
    console.log(sendUser)
    // res.json({ token, user: userData });
    return res.send(success(200,{token,sendUser }));

  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: 'Server error during login.' });
    return res.send(error(500,"Server error during login"))
  }
};

const registerAdmin = async (req, res) => {
  console.log(req.body);
    const { name, email, password } = req.body;
  
    try {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) return res.status(400).json({ message: 'Admin already exists.' });
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create admin user
      const admin = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        status: 'Active'
      });
  
      await admin.save();
  
      // res.status(201).json({ message: 'Admin registered successfully.' });
      return res.send(success(201,
        admin))
    } catch (err) {
      console.error(err);
      // res.status(500).json({ message: 'Server error during admin registration.' });
      return res.send(error(500,"Something went wrong"))
    }
  };
  

export {logincontroller,registerAdmin}