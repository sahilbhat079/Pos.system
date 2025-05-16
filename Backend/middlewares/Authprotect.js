const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const handleError = require("../middlewares/Error_Handler.util");

exports.protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Check for Access Token
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        console.log("Access Token:", token);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return next(handleError(401, "User not found"));
            }

            req.user = user;
            return next(); // Authorized
        } catch (err) {
            if (err.name !== "TokenExpiredError") {
                return next(handleError(401, "Invalid access token"));
            }
            // If expired, check refresh token next
        }
    }

    // 2. Fallback: Check Refresh Token
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return next(handleError(401, "Unauthorized - No access token or refresh token"));
    }

    try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decodedRefresh.id).select("-password");

        if (!user) {
            return next(handleError(401, "Invalid refresh token"));
        }

        // Issue new access token
        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        req.user = user;

        return next();
    } catch (err) {
        return next(handleError(403, "Refresh token expired or invalid"));
    }
};
