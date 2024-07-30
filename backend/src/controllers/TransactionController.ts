import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionService } from '../services/TransactionService';

interface TransactionRequestBody {
  amount: number;
  type: string;
  date: Date;
}

interface UpdateTransactionRequestBody {
  amount?: number;
  type?: string;
  date?: Date;
}

interface TransactionParams {
  id: string;
}

class TransactionController {
  async create(req: FastifyRequest<{ Body: TransactionRequestBody }>, rep: FastifyReply) {
    const { amount, type, date } = req.body;
    const userId = req.user.id;

    const transactionService = new TransactionService();

    try {
      const transaction = await transactionService.createTransaction({ userId, amount, type, date });
      rep.status(201).send(transaction);
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }

  async list(req: FastifyRequest, rep: FastifyReply) {
    const userId = req.user.id;

    const transactionService = new TransactionService();

    try {
      const transactions = await transactionService.getTransactions(userId);
      rep.status(200).send(transactions);
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }

  async update(req: FastifyRequest<{ Params: TransactionParams; Body: UpdateTransactionRequestBody }>, rep: FastifyReply) {
    const { id } = req.params;
    const { amount, type, date } = req.body;
    const userId = req.user.id;

    const transactionService = new TransactionService();

    try {
      const transaction = await transactionService.updateTransaction({ transactionId: id, userId, amount, type, date });
      if (transaction.count === 0) {
        rep.status(404).send({ error: 'Transaction not found or not authorized' });
      } else {
        rep.status(200).send(transaction);
      }
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }

  async delete(req: FastifyRequest<{ Params: TransactionParams }>, rep: FastifyReply) {
    const { id } = req.params;
    const userId = req.user.id;

    const transactionService = new TransactionService();

    try {
      const transaction = await transactionService.deleteTransaction(id, userId);
      if (transaction.count === 0) {
        rep.status(404).send({ error: 'Transaction not found or not authorized' });
      } else {
        rep.status(204).send();
      }
    } catch (error) {
      if (error instanceof Error) {
        rep.status(400).send({ error: error.message });
      } else {
        rep.status(500).send({ error: 'Unexpected error' });
      }
    }
  }
}

export { TransactionController };