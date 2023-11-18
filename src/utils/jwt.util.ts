import jwt, { JwtPayload } from "jsonwebtoken";
import { constants } from "../config";
import { IUser } from "../types";

const jwtSecret = constants.JWT_SECRET;

const signToken = (userData: IUser) => {
  const payload = {
    sub: userData.id,
    email: userData.email,
  };
  const token = jwt.sign(payload, jwtSecret!, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = (token: string) => {
  let decodedToken: string | JwtPayload | undefined;
  jwt.verify(token, jwtSecret!, (error, decoded) => {
    if (error) {
      throw error;
    } else {
      decodedToken = decoded;
    }
  });
  return decodedToken;
};

export { signToken, verifyToken };
