import { FastifyInstance } from 'fastify';
import { LoginController } from '../controllers/LoginUserController';

const loginController = new LoginController();

async function loginRoutes(fastify: FastifyInstance) {
  fastify.post('/login', loginController.login.bind(loginController));
}

export { loginRoutes };
