import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  console.log("Inside middleware---->>>",req.body);
  try {
    let bearerToken = req.header('Authorization');
    console.log("Bearer token---->>>>",bearerToken);

    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: `Authorization token is required`
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.UserID = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `UnAuthorised token`
    });
  }
};