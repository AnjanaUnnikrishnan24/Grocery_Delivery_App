const userCheck = (req, res, next) => {
    if (!req.user || req.user.userRole !== "user") {
        return res.status(403).json({ message: "Only users can access." });
    }
    next();
};

export default userCheck;