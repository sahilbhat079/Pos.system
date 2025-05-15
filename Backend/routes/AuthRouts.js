const { protect } = require("../middlewares/Authprotect");
const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
} = require("../Controllers/UserControler");
const { body } = require("express-validator");

const router = express.Router();

// Register route with all required fields validated
router.post(
    "/register",
    [
        body("name", "Name is required").notEmpty(),
        body("email", "Invalid email").isEmail(),
        body("phone", "Phone must be a 10-digit number").matches(/^\d{10}$/),
        body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        body("role", "Role is required").notEmpty()
    ],
    registerUser
);

// Login route
router.post(
    "/login",
    [
        body("email", "Invalid email").isEmail(),
        body("password", "Password is required").notEmpty(),
    ],
    loginUser
);

// Logout route
router.post("/logout", logoutUser);

// Protected profile route
router.get("/profile", protect, getUserProfile);

module.exports = router;
