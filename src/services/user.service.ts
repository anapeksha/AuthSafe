import argon2 from "argon2";
import { prisma } from "../config";
import { IUser } from "../types";

const userService = {
  createUser: async (userData: IUser) => {
    try {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email!,
          password: await argon2.hash(userData.password!),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userId: string, userData: IUser) => {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          name: userData.name,
          email: userData.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (userId: string) => {
    try {
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
