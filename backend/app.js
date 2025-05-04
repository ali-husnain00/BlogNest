import express from "express";
const app = express();
import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import User from "./model/user.js";
import posts from "./model/posts.js";
import upload from "./middlewares/multer.js"

dotenv.config();
connectdb();
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("App is working...");
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (error) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
});

app.put("/updateUser", upload.single("image"), verifyToken, async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const profilePic = req.file ? req.file.filename : user.profilePic;

    const updatedUser = await User.findOneAndUpdate(
      { email },  
      {
        username: username,
        email: email,
        profilePic: profilePic,  
      },
      { new: true }  
    );

   
    res.status(200).json({ user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating user");
  }
});

app.post("/createBlog", upload.single("image"), async (req, res) => {
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
});

app.get("/getUserBlogs", verifyToken, async (req, res) =>{
  try {
    const user = await User.findById(req.user.id).select("-password").populate("posts");
    if (!user) return res.status(404).send("User not found");

    res.status(200).send(user.posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured while getting user blogs")
  }
})

app.get("/getAllBlogs", async (req, res) => {
  try {
    const allBlogs = await posts.find().sort({ createdAt: -1 });
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).send("An error occurred while fetching all blogs");
  }
});

app.delete("/deleteBlog/:id", verifyToken, async (req, res) =>{
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
})

app.put("/updateBlog/:blogId", upload.single("image"), verifyToken, async (req, res) => {
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
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
