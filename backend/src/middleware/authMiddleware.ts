import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserPayload;
  }
}

export async function authMiddleware(req: FastifyRequest, rep: FastifyReply, next: () => void) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    rep.status(401).send({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    rep.status(401).send({ error: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    rep.status(401).send({ error: 'Invalid token' });
  }
}