import argon2 from "argon2";
import { constants, prisma } from "../config";
import { IUser } from "../types";
import { signAccessToken } from "../utils/jwt";

const authService = {
  login: async (userData: IUser) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (user && (await argon2.verify(user.password, userData.password))) {
        const token = signAccessToken(user);
        if (token) {
          const session = await prisma.session.create({
            data: {
              token: token,
              userId: user.id,
            },
          });
          if (session) {
            return token;
          } else throw new Error(constants.errors.SessionCreationError);
        } else throw new Error(constants.errors.TokenGenerationError);
      } else throw new Error(constants.errors.UnauthorizedError);
    } catch (error) {
      throw new Error("any");
    }
  },
};

export default authService;
