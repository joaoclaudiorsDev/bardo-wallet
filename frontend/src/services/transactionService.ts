import { api } from './api';

export async function createTransaction(token: string, transactionData: { amount: number, type: string, date: string }) {
  const response = await api.post('/transactions', transactionData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function getTransactions(token: string) {
  const response = await api.get('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function updateTransaction(token: string, id: string, transactionData: { amount: number, type: string, date: string }) {
  const response = await api.put(`/transactions/${id}`, transactionData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function deleteTransaction(token: string, id: string) {
  const response = await api.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
