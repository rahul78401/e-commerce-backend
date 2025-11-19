//Import Packages
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

//Import Files

/**
 * @function <b>hashPasswordUsingBcrypt</b><br>
 * Hash Password
 * @param {String} plainTextPassword Unsecured Password
 * @return {String} Secured Password
 */
const hashPasswordUsingBcrypt = (plainTextPassword: string): string => {
  const saltRounds = process.env.SALT_ROUNDS;

  try {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
  } catch (error) {
    throw error;
  }
};

/**
 * @function <b>comparePasswordUsingBcrypt</b><br> Verify Password
 * @param {String} plainTextPassword Password to be checked
 * @param {String} passwordhash Hashed Password
 * @return {Boolean} True if match else False
 */
const comparePasswordUsingBcrypt = (
  plainTextPassword: string,
  passwordhash: any,
) => bcrypt.compare(plainTextPassword, passwordhash);

/**
 * @function <b>generateAuthToken</b><br> Generate Token
 * @param {Object} criteriaForJwt keys for jwt to generate tokens
 * @return {String} Auth Token
 */

const generateAuthToken = async (criteriaForJwt: any): Promise<string> => {
  const token = jwt.sign(criteriaForJwt, process.env.JWT_SECRET);
  if (token) {
    try {
      return token;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * @function <b>findByToken</b><br> decrypt Token
 * @param {String} token token to be decrypt
 * @return {Object} if match returns user object
 */
const findByToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);

export {
  hashPasswordUsingBcrypt,
  comparePasswordUsingBcrypt,
  generateAuthToken,
  findByToken,
};
