import api from './axiosConfig';

export async function listarTarefas(page = 0, size = 10) {
  const response = await api.get(`/tasks?page=${page}&size=${size}`);
  return response.data;
}
