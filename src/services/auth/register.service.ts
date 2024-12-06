import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { error } from "console";
import { hasSubscribers } from "diagnostics_channel";
import { hashPassword } from "../../lib/argon";

export const registerService = async (body: User) => {
  try {
    const { name, email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw error;
  }
};
