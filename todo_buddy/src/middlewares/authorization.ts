import { NextFunction, Request, Response } from "express";
import { PostgresDataSource } from "../config/data-source";
import { User } from "../models/user";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = PostgresDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req.user.id },
    });
    console.log(user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
