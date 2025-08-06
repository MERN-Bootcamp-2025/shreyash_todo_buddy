
import { Request, Response } from 'express';
import { TodosService } from '../services/todos.service';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateTodosDTO } from '../dtos/todos.dto';

export class TodosController {
    static async createTodoTask(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateTodosDTO, req.body);

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

            // const response = await TodosService.createTodos(dto);

            return res.status(200).json({ message: "User invited successfully", });
        } catch (error) {
            console.error('Error in invitUser', error);
            return res.status(500).json({ message: "Failed to invite user" });
        }
    }
}