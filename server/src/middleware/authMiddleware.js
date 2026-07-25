const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {

        let token;

        // Check if token exists in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, No Token",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user id inside request
        req.user = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

module.exports = protect;