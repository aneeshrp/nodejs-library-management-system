import express, {Application} from 'express';
import { APP_PORT } from './config';
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from './utils/connectDb';


const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes)

app.listen(APP_PORT, () => {
    console.log(`Auth service is runnin at ${APP_PORT}`);
})