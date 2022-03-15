const jwt = require("jsonwebtoken");

exports.getUserToken = (user) => {
    return jwt.verify(user, process.env.JWT_SECRET_KEY);
};
