
import { Request, Response } from 'express';
import { TodosService } from '../services/todo.service';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateTodoDTO } from '../dtos/todos.dto';

export class TodosController {
    static async createTodoTask(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateTodoDTO, req.body);

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

            const response = await TodosService.createTodos(dto);
            return res.status(200).json({ status: true, message: "Todo created successfully", response });
        } catch (error) {
            console.error('Error in invitUser', error);
            return res.status(500).json({ message: "Failed to create to" });
        }
    }


    static async getTodoById(req: Request, res: Response) {
        try {
            const userId = req.user.userId;
            const todoId = req.params.id;
            const todo = await TodosService.getTodoById(userId, todoId);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            return res.status(200).json({ message: "get todo successfully", todo: todo })
        } catch (error) {
            console.error('Error getting single todo by id', error);
            return res.status(500).json({ message: "Failed to get todo" });
        }
    }


    static async softDeleteById(req: Request, res: Response) {
        try {
            const todoId = req.params.id;
            const todo = await TodosService.softDeleteById(todoId);
            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            return res.status(200).json({ message: "todo deleted successfully", todo: todo })
        } catch (error) {
            console.error('Error while deleting todo', error);
            return res.status(500).json({ message: "Failed delete todo" });
        }
    }
}