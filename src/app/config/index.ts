import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  port: process.env.PORT,
  database_uri: process.env.DBMS_URI,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDES,
};
