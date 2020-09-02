const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  console.log(decodedToken);

  req.isAuth = true;
  req.id = decodedToken.id;
  next();
};
