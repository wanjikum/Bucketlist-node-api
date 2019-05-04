import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  console.log('Token', token);

  if (token) {
    jwt.verify(token, process.env.MY_SECRET, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      console.log('user', user);
      req.userId = user.id;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

export default checkToken;
