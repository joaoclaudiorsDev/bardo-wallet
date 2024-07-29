import { PrismaClient } from '@prisma/client';

interface TransactionRequest {
  userId: string;
  amount: number;
  type: string;
  date: Date;
}

interface UpdateTransactionRequest {
  transactionId: string;
  userId: string;
  amount?: number;
  type?: string;
  date?: Date;
}

class TransactionService {
  private prisma = new PrismaClient();

  async createTransaction({ userId, amount, type, date }: TransactionRequest) {
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        amount,
        type,
        date,
      },
    });

    return transaction;
  }

  async getTransactions(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
    });

    return transactions;
  }

  async updateTransaction({ transactionId, userId, amount, type, date }: UpdateTransactionRequest) {
    const transaction = await this.prisma.transaction.updateMany({
      where: { id: transactionId, userId },
      data: {
        amount,
        type,
        date,
      },
    });

    return transaction;
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const transaction = await this.prisma.transaction.deleteMany({
      where: { id: transactionId, userId },
    });

    return transaction;
  }
}

export { TransactionService };
