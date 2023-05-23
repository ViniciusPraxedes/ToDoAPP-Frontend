import { apiClient } from './ApiClient'

export const getTodos = () => apiClient.get(`/todos`)

export const deleteTodo = (id) => apiClient.delete(`/todos/${id}`)

export const getTodo = (id) => apiClient.get(`/todos/${id}`)

export const updateTodo = (id, todo) => apiClient.put(`/todos/${id}`, todo)

export const createTodo = (todo) => apiClient.post(`/todos`, todo)
