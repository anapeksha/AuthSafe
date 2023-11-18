import { prisma } from "../config";
import { IUser } from "../types";

const profileService = {
  changePassword: async (userId: string, password: IUser["password"]) => {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          password: password,
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

export default profileService;
