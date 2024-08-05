import { api } from "./api";

export async function register(username:string, password: string) {
    const response = await api.post('/users', { username, password });
    return response.data;
}

export async function login(username: string, password: string) {
    const response = await api.post('/login', { username, password });
    return response.data;
}