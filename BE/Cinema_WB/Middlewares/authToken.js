const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const token = req.headers['authorization']
    
    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
}

module.exports = authToken