const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETTOKEN);
    req.userId = decoded.id;
    req.userMail = decoded.mail
    next();
  } catch (e) {
    res.status(402).send(e);
  }
}

module.exports = verifyToken;
