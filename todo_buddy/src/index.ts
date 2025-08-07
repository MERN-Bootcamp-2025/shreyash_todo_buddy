import 'reflect-metadata';
import { initializeDatabase } from './config/data-source';
import {initializeDatabaseWithSuperAdmin} from './helpers/initialize_database_with_super_admin'
import dotenv from 'dotenv'
import { App } from './app';

dotenv.config();

async function bootstrap(): Promise<void> {
    try {

        console.log(`Initializing database connection...`)
        await initializeDatabase();
        await initializeDatabaseWithSuperAdmin();
        const app = new App();
        const port = parseInt(process.env.PORT || '8080')

        app.listen(port);

    } catch (error) {
        console.log('Failed to start the application', error);
        process.exit(1);

    }
}
bootstrap();