
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "cookie";  

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        
        if (!req.headers.cookie) return res.status(401).send("Unauthorized access");

        const cookies = cookie.parse(req.headers.cookie);
        const token = cookies.authToken;
        console.log(token);
        

        if (!token) return res.status(401).send("Unauthorized access");

        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified.email;
        req.role = verified.userRole;

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).send("Unauthorized access");
    }
};

export default authenticate;
