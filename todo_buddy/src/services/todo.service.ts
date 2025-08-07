import { error } from "console";
import { PostgresDataSource } from "../config/data-source"
import { Todo } from "../models/todo"
import { User } from "../models/user";
import { CreateTodoDTO, UpdateTodoDTO } from "../dtos/todos.dto";
import { Between , MoreThanOrEqual , LessThanOrEqual } from "typeorm";


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


    static async updateTodoById(todoId, userId, dto) {
        try {
            const user = await usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new error("User not found");
            }

            const todo = await todosRepo.findOne({
                where: { id: todoId, user: { id: userId } },
            });

            if (!todo) {
                throw new error("Todo not found and other user cant update it");
            }

            todo.title = dto.title;
            todo.description = dto.description;
            todo.status = dto.status;
            todo.priority = dto.priority;
            todo.expected_completion_at = dto.expected_completion_at;

            return await todosRepo.save(todo);
        } catch (err) {
            console.error('Error while updating Todo', err);
        }
    }

    static async patchUpdateTodoByID(todoId, userId, dto) {
        try {
            const user = await usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new error("User not found");
            }

            const todo = await todosRepo.findOne({
                where: { id: todoId, user: { id: userId } },
            });
            if (!todo) {
                throw new error("Todo not found and other user cant update it");
            }

            if (dto.title) todo.title = dto.title;
            if (dto.description) todo.description = dto.description;
            if (dto.status) todo.status = dto.status;
            if (dto.priority) todo.priority = dto.priority;
            if (dto.expected_completion_at) todo.expected_completion_at = dto.expected_completion_at;

            return await todosRepo.save(todo);
        } catch (err) {
            console.error('Error while partially updating Todo', err);
        }
    }


    static  async getAllTodos(userId, query){
    try{

        const {page=1,limit=10,status,priority,title,fromDate,toDate} = query;

        const where:any = {user_id: userId, is_deleted: false}

        if(status) where.status = status;

        if(priority) where.priority = priority; 

        if(title) where.title = title;

        if(fromDate && toDate){
            where.expected_completion = Between(
                new Date(fromDate),
                new Date(toDate)
            );
        }
        if(fromDate){
            where.expected_completion = MoreThanOrEqual(new Date(fromDate));
        }
        if(toDate){
            where.expected_completion = LessThanOrEqual(new Date(toDate));
        }

        const [todos, total] = await todosRepo.findAndCount({
            where,
            order: {created_at:"DESC"},
            skip: (page -1 )*limit,
            take:limit
        });

        return {
            page: page,
            limit: limit,
            todos
        };

    }catch(error){
        throw {status: 401, message:"Deleted or Unauthorized"}
    }
  }

}