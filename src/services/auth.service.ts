import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../config";
import { IUser } from "../types";

const authService = {
  login: async (userData: IUser) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (user && (await argon2.verify(user.password, userData.password)))
        return user;
      else return null;
    } catch (error) {
      throw error;
    }
  },
  signToken: (userData: IUser) => {
    const payload = {
      sub: userData.id,
      email: userData.email,
    };
    const token = jwt.sign(payload, "hello", {
      expiresIn: "24h",
    });
    return token;
  },
  verifyToken: (token: string) => {
    jwt.verify(token, "hello", (error, decoded) => {
      if (error) {
        return null;
      } else {
        return decoded;
      }
    });
  },
};
