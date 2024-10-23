import dotenv from 'dotenv';
import { startServer } from './app';

dotenv.config();
const port = process.env.PORT || '8080';

startServer(Number.parseInt(port));
