const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors");

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
