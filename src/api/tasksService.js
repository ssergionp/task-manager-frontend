import api from './axiosConfig';

export async function listarTarefas(page = 0, size = 10) {
  const response = await api.get(`/tasks?page=${page}&size=${size}`);
  return response.data;
}

export async function criarTarefa(tarefa) {
  const response = await api.post('/tasks', tarefa);
  return response.data;
}

export async function atualizarTarefa(id, tarefa) {
  const response = await api.put(`/tasks/${id}`, tarefa);
  return response.data;
}

export async function deletarTarefa(id) {
  await api.delete(`/tasks/${id}`);
}
