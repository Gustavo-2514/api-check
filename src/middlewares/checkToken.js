const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token");

const jtiArray = [];

function checkToken(req, res, next) {
  const headers = req.headers;
  if (!headers) {
    return res.status(401).json({ unauthorized: "Acesso negado!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ unauthorized: "Acesso negado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (jtiArray.includes(decoded.jti)) {
      console.log("Token Antigo Invalido!");
      return res.status(401).json({ unauthorized: "Token Antigo Invalido!" });
    }

    if (decoded.id !== req.params.userId) {
      return res.status(403).json({ unauthorized: "Acesso negado!" });
    }

    next();
  } catch (error) {
    res.status(401).json({ unauthorized: error.message });
  }
}

module.exports = checkToken;
