const authAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ error: 'User is not authenticated' });
    }

    if (req.user.role != 'Admin') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next(); 
};

module.exports = authAdmin;