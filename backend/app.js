import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import appRouter from "./routes/routes.js";

dotenv.config();
connectdb();
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"))
app.use(
  cors({
    origin: "https://blogsnest.netlify.app",
    credentials: true,
  })
);
app.use(appRouter)

app.get("/", (req, res) =>{
  res.send("App is working...")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
