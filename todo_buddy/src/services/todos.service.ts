import { PostgresDataSource } from "../config/data-source"
import { Todo } from "../models/todo"


const todosRepo = PostgresDataSource.getRepository(Todo);

export class TodosService {

    // static async createTodos(dto) {
    //     try {

    //         const title = dto.title;
    //         const discription = dto.discription;
    //         const title = dto.title;
    //         const title = dto.title;
    //         const title = dto.title;
    //         const title = dto.title;
    //         const createdTodo = await todosRepo.create({
    //         } catch (err) {
    //             console.error('Error while creating Todo', err);
    //         }

    //     }

}