import { cloudinaryUpload } from "../../lib/cloudinary";
import prisma from "../../lib/prisma";

interface CreateBlogBody {
  title: string;
  description: string;
  content: string;
  category: string;
}

export const createBlogService = async (
  body: CreateBlogBody,
  thumbnail: Express.Multer.File,
  userId: number
) => {
  try {
    const { title } = body;

    const blog = await prisma.blog.findFirst({
      where: { title, deletedAt: null },
    });

    if (blog) {
      throw new Error("Title already in use");
    }

    const { secure_url } = await cloudinaryUpload(thumbnail);

    return await prisma.blog.create({
      data: {
        ...body,
        thumbnail: secure_url,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
