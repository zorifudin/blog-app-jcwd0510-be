import { NextFunction, Request, Response } from "express";
import { getSamplesService } from "../services/sample/get-samples.service";
import { getBlogsService } from "../services/blog/get-blogs.service";
import { createBlogService } from "../services/blog/create-blog.service";

export const getBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      take: parseInt(req.query.take as string) || 3,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
    };
    const result = await getBlogsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const createBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const result = await createBlogService(
      req.body,
      files.thumbnail?.[0],
      res.locals.user.id
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
