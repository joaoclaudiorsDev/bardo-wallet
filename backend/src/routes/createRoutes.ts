import { FastifyInstance } from 'fastify';
import { CreateUserController } from '../controllers/CreateUsersController';

const createUserController = new CreateUserController();

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUserController.handle.bind(createUserController));
}

export { userRoutes };
