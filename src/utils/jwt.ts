import jwt, { JwtPayload } from "jsonwebtoken";
import { constants } from "../config";
import { IUser } from "../types";

const jwtSecret = constants.JWT_SECRET;

const signAccessToken = (userData: IUser) => {
  const payload = {
    sub: userData.id,
    email: userData.email,
  };
  const token = jwt.sign(payload, "hello", {
    expiresIn: "15m",
  });
  return token;
};
const signRefreshToken = (token: string) => {
  try {
    const accessTokenDecoded = verifyToken(token);
    if (accessTokenDecoded) {
      const refreshedToken = jwt.sign(accessTokenDecoded, "hello", {
        expiresIn: "7d",
      });
      if (refreshedToken) {
        return refreshedToken;
      } else throw new Error();
    } else throw new Error();
  } catch (error) {
    if (error) throw new Error();
  }
  return null;
};

const verifyToken = (token: string) => {
  let decodedToken: string | JwtPayload | undefined;
  jwt.verify(token, "hello", (error, decoded) => {
    if (error) {
      throw error;
    } else {
      decodedToken = decoded;
    }
  });
  return decodedToken;
};

export { signAccessToken, signRefreshToken, verifyToken };
