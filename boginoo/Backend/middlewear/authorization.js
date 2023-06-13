const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization
  console.log(process.env.ACCESS_TOKEN_KEY, 'CONSOLED PIZDUm')
  console.log(token);
  if (!token) return res.sendStatus(401)
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "vsduyr25y493hfskjl4y327964gfksdlhdQYRs8dg^Di7fewugfihSIYFata69wefyGOci7wr9tsefguvldg745e=rtfwuqydtew87GIY%@4", async (err, result) => {
      if(err) return res.send(err)
      else {
        next(result)
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
