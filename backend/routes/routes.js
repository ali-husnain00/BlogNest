import express from "express";
const router = express.Router();
import upload from "../middlewares/multer.js"
import verifyToken from "../middlewares/verifyToken.js";
import { adminAllUsers, adminDeleteUser, adminStats, contactUs, createBlog, deleteBlog, getAllBlogs, getProfile, getUserBlogs, login, logout, register, updateBlog, updateUser } from "../controllers/controllers.js";

router.get("/profile", verifyToken, getProfile)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.put("/updateUser", upload.single("image"), verifyToken, updateUser)
router.post("/createBlog", upload.single("image"), createBlog)
router.get("/getUserBlogs", verifyToken, getUserBlogs)
router.get("/getAllBlogs", getAllBlogs)
router.delete("/deleteBlog/:id", verifyToken, deleteBlog)
router.put("/updateBlog/:blogId", upload.single("image"), verifyToken, updateBlog)
router.post("/contactus", contactUs)
router.get('/admin/stats', adminStats)
router.get("/admin/allUsers", adminAllUsers)
router.delete("/admin/deleteUser/:id", adminDeleteUser)

const appRouter = router;
export default appRouter