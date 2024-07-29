import { FastifyRequest, FastifyReply } from 'fastify';
import { LoginService } from '../services/LoginUserService';

interface LoginRequestBody {
  username: string;
  password: string;
}

class LoginController {
  async login(req: FastifyRequest<{ Body: LoginRequestBody }>, rep: FastifyReply) {
    const { username, password } = req.body;

    const loginService = new LoginService();

    try {
      const { token } = await loginService.login({ username, password });
      rep.status(200).send({ token });
    } catch (error) {
      if (error instanceof Error) {
        rep.status(401).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }
}

export { LoginController };
