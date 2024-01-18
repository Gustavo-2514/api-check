const jwt = require("jsonwebtoken");

function createToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = createToken;
