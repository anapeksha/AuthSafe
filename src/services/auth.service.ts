import argon2 from "argon2";
import { constants, prisma } from "../config";
import { IUser } from "../types";
import { signToken } from "../utils/jwt.util";

const authService = {
  login: async (userData: IUser) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (user && (await argon2.verify(user.password, userData.password!))) {
        const token = signToken(user);
        if (token) {
          const session = await prisma.session.create({
            data: {
              userId: user.id,
              token: token,
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
          if (session) {
            return { id: session.id, token: token };
          } else throw new Error(constants.errors.SessionCreationError);
        } else throw new Error(constants.errors.TokenGenerationError);
      } else throw new Error(constants.errors.UnauthorizedError);
    } catch (error) {
      throw new Error("any");
    }
  },
  logout: async (sessionId: number) => {
    try {
      await prisma.session.delete({
        where: {
          id: sessionId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
