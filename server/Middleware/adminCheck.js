const adminCheck = (req, res, next) => {
    if (!req.user || req.user.userRole !== "admin") {
        return res.status(403).json({ message: "Only Admins can access." });
    }
    next();
};

export default adminCheck