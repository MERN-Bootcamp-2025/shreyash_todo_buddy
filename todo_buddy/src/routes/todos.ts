import { Router } from 'express';
// import { TodosController } from '../controllers/todos.controller';
// import { authentification } from "../middlewares/auth.middleware";
// import { authorization } from "../middlewares/authorization";


const router = Router();

// router.post('/todos', TodosController.createTodoTask);
// router.get('/todos',);
// router.get('/todos/:id',);
// router.put('/todos/:id',);
// router.patch('/todos/:id',);
router.delete('/todos:id',);


export { router as todosRouter };
