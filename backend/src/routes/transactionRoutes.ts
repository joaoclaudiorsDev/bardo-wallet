import { FastifyInstance } from 'fastify';
import { TransactionController } from '../controllers/TransactionController';

const transactionController = new TransactionController();

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions', transactionController.create.bind(transactionController));
  fastify.get('/transactions', transactionController.list.bind(transactionController));
  fastify.put('/transactions/:id', transactionController.update.bind(transactionController));
  fastify.delete('/transactions/:id', transactionController.delete.bind(transactionController));
}

export { transactionRoutes };
 