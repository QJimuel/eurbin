const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const adminAuthMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret' );
        const admin = await Admin.findById(decoded.id);
        
        // Only allow if the ID matches the desired user ID
        if (decoded.id !== '6718b90d13acd2f5fe10ebb6') {
            return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        console.error("Token Verification Error:", err.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = adminAuthMiddleware;
