const jwt = require('jsonwebtoken');
const revokedTokens = [];

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format.' });
    }

    const token = authHeader.split(' ')[1];

    // Check if the token is revoked
    if (revokedTokens.includes(token)) {
        return res.status(401).json({ error: 'Token has been revoked.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};


module.exports = verifyToken;