const jwt = require('jsonwebtoken');

export const createJWT = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
  return token;
};

export const isTokenValid = ( token: String ) => jwt.verify(token, process.env.JWT_SECRET);

export const decodeToken = (token: String) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
