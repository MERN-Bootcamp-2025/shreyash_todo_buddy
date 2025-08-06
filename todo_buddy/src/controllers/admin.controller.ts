
import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AdminDtoInviteUser, AdminLoginDTO } from '../dtos/admin.dto';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export class AdminController {
    static async invitUser(req: Request, res: Response) {
        try {
            const dto = plainToClass(AdminDtoInviteUser, req.body);

            const validationErrors: ValidationError[] = await validate(dto);
            if (validationErrors.length > 0) {
                const errors = validationErrors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints || {},
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    error: 'Invalid input data',
                    validationErrors: errors
                });
            }

            const { email, role } = dto;

            if (!email || !role) {
                return res.status(400).json({ message: "Email and role are required Validation error" });
            }

            const invitedUser = await AdminService.inviteUser(dto);
            if (!invitedUser) {
                return res.status(201).json({
                    success: false,
                    message: "User already invited with this email"
                });
            }

            return res.status(200).json({ message: "User invited successfully", invitedUser });
        } catch (error) {
            console.error('Error in invitUser', error);
            return res.status(500).json({ message: "Failed to invite user" });
        }
    }


    static async login(req: Request, res: Response) {
        try {

            const dto = plainToClass(AdminLoginDTO, req.body);
            const validationErrors: ValidationError[] = await validate(dto);
            if (validationErrors.length > 0) {
                const errors: ValidationError[] = validationErrors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints || {},
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    error: 'Invalid input data',
                    validationErrors: errors
                });
            }

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }

            const { userId, accessToken , role } = await AdminService.login(email, password);
            return res.status(200).json({ message: "Login successful", userId, accessToken , role });

        } catch (error) {
            console.error(error);

            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await AdminService.getAllUsers();
            return res.status(200).json({ UsersList: allUsers })
        } catch (error) {
            console.log('error while getting all users');
            res.status(500).json({ message: "error while getting all users", error })
        }
    }
}