import { prisma } from "../config";
import { IUser } from "../types";

const userService = {
  createUser: async (userData: IUser) => {
    try {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: userData.password,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
