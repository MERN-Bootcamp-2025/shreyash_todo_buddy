import { Router } from 'express';
import { TodosController } from '../controllers/todos.controller';
import { authentification } from "../middlewares/auth.middleware";
import { authorization } from "../middlewares/authorization";


const router = Router();

router.post('/todos', authentification, authorization(['user', 'admin']), TodosController.createTodoTask);
router.get('/todos', authentification, authorization(['user', 'admin']), TodosController.getTodo);
router.get('/todos/:id', authentification, authorization(['user', 'admin']), TodosController.getTodoById);
router.put('/todos/:id', authentification, authorization(['user', 'admin']), TodosController.updateTodoById);
router.patch('/todos/:id', authentification, authorization(['user', 'admin']), TodosController.patchUpdateTodoByID);
router.delete('/todos/:id', authentification, authorization(['user', 'admin']), TodosController.softDeleteById);


export { router as todosRouter };
