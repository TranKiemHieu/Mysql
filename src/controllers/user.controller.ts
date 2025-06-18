import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import User from "../database/models/user.model";
import config from "../database/config/database";

export default class UserController {
    // Lấy một user theo ID
    async findOneUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Tìm user theo ID từ repository
            const user = await UserRepository.getUser(Number(id));

            if (!user) {
                return res.status(404).json({
                    message: `User with ID ${id} not found!`
                });
            }

            res.status(200).json({
                message: "User retrieved successfully",
                user
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}