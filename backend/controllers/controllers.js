import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from "url";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import posts from "../model/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (error) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
}

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send("An error occured while creating user");
    console.log(error);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token);

    const { password: _, ...userData } = user._doc;
    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while logging in");
  }
}

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
}

export const updateUser =  async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const profilePic = req.file ? req.file.filename : user.profilePic;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,        
        profilePic,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while updating user" });
  }
}

export const createBlog = async (req, res) => {
  const { blogTitle, blogContent, blogCategory, email } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newBlog = await posts.create({
      title: blogTitle,
      coverImage: req.file.filename,
      category: blogCategory,
      content: blogContent,
      author: user.username,
    });

    user.posts.push(newBlog._id);
    await user.save();

    res.status(200).send("Blog created successfully!");
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).send("An error occurred while creating the blog");
  }
}

export const getUserBlogs = async (req, res) =>{
  try {
    const user = await User.findById(req.user.id).select("-password").populate("posts");
    if (!user) return res.status(404).send("User not found");

    res.status(200).send(user.posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured while getting user blogs")
  }
}

export const getAllBlogs =  async (req, res) => {
  try {
    const allBlogs = await posts.find().sort({ createdAt: -1 });
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).send("An error occurred while fetching all blogs");
  }
}

export const deleteBlog = async (req, res) =>{
  const id = req.params.id;

  try {
    const user = await User.findById(req.user.id);

    if(!user){
      return res.status(404).send("User not found")
    }

    const blogToDelete = await posts.findById(id);
    if (!blogToDelete) return res.status(404).send("Blog not found");

    const imagePath = path.join(__dirname, "uploads", blogToDelete.coverImage);

    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.warn("Image file could not be deleted:", err.message);
    }

    await posts.findByIdAndDelete(id);

    user.posts = user.posts.filter(blogId => blogId.toString() !== id)

    await user.save();

    res.status(200).send("User deleted successfully!")
  } catch (error) {
    res.status(500).send("An error occured while deleting the blog");
    console.log(error);
  }
}

export const updateBlog = async (req, res) => {
  const { blogTitle, blogContent, blogCategory } = req.body;
  const blogId = req.params.blogId;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    const existingBlog = await posts.findById(blogId);
    if (!existingBlog) return res.status(404).send("Blog not found");

    const updatedData = {
      title: blogTitle,
      content: blogContent,
      category: blogCategory,
      coverImage: req.file ? req.file.filename : existingBlog.coverImage,
    };

    await posts.findByIdAndUpdate(blogId, updatedData);
    res.status(200).send("Blog updated successfully!");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while updating the blog");
  }
}

export const contactUs = async (req, res) =>{

  const {name, email, message} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: {name},
      to: process.env.EMAIL_USER,
      subject:"New contact message from BlogNest",
      html:`
      <h3>Message from ${name}</h3>
      <p><strong>Email:</strong>${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      `
    })

    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
}

export const adminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await posts.countDocuments(); 

    res.status(200).send({totalUsers,totalBlogs});
  } catch (error) {
    res.status(500).json({
      message: "Error fetching statistics",
      error: error.message,
    });
  }
}

export const adminAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "An error occurred while fetching users", error: error.message });
  }
}

export const adminDeleteUser = async (req, res) =>{
  const id = req.params.id;
  try {

    await User.findByIdAndDelete(id);

    res.status(200).send("User deleted successfully");
    
  } catch (error) {
    res.status(500).send("An error occured while deleting user")
    console.log(error)
  }
}

