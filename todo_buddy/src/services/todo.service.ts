import { error } from "console";
import { PostgresDataSource } from "../config/data-source"
import { Todo } from "../models/todo"
import { User } from "../models/user";
import { CreateTodoDTO } from "../dtos/todos.dto";


const todosRepo = PostgresDataSource.getRepository(Todo);
const usersRepo = PostgresDataSource.getRepository(User);

export class TodosService {

    static async createTodos(dto: CreateTodoDTO) {
        try {
            const title = dto.title;
            const description = dto.description;
            const priority = dto.priority;
            const status = dto.status;
            const expected_completion_at = dto.expected_completion_at;
            const user_id = dto.user_id;

            const user = await usersRepo.findOne({ where: { id: user_id } });

            if (!user) {
                throw new error("User not found");
            }

            const createdTodo = todosRepo.create({
                title,
                description,
                priority,
                status,
                expected_completion_at,
                user: user
            })

            return await todosRepo.save(createdTodo);
        } catch (err) {
            console.error('Error while creating Todo', err);
        }

    }

    static async getTodoById(userId, id) {
        try {
            return await todosRepo.findOne({ where: { id: id, user: { id: userId } } })
        } catch (err) {
            console.error('Error while getting Todo', err);
        }
    }


    static async softDeleteById(id) {
        try {
            const todo = await todosRepo.findOne({ where: { id: id } });
            if (!todo) {
                throw new error('Todo not found');
            }
            todo.is_deleted = true;
            return await todosRepo.save(todo);
        } catch (err) {
            console.error('Error while deleting Todo', err);
        }
    }



}