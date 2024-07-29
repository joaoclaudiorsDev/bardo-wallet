import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/createRoutes';
import { loginRoutes } from './routes/loginRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors);
  await app.register(userRoutes);
  await app.register(loginRoutes);
  await app.register(transactionRoutes);

  try {
    await app.listen({ port: Number(process.env.PORT) || 3333 });
    console.log(`Server is running on port ${process.env.PORT || 3333}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
