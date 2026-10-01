const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CredVault Backend API is running"
    });
});

// Application routes
app.use("/api/applications", applicationRoutes);

// Certificate routes
app.use("/api/certificates", certificateRoutes);
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});