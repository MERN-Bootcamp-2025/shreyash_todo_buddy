import express, { Application } from 'express';
import { adminRouter } from './routes/admin'
import { todosRouter } from './routes/todos'

export class App {

    private app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares()
    }


    public initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use('/api', adminRouter)
        // this.app.use('/api', todosRouter)
    }


    public getApp(): Application {
        return this.app;
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }
}