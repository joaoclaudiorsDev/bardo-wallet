import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserService } from '../services/CreateUsersService';

interface CreateUserRequestBody {
  username: string;
  password: string;
}

class CreateUserController {
  async handle(req: FastifyRequest<{ Body: CreateUserRequestBody }>, rep: FastifyReply) {
    const { username, password } = req.body;

    const userService = new CreateUserService();

    try {
      const user = await userService.execute({ username, password });
      rep.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }
}

export { CreateUserController };
