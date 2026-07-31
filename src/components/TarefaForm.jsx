import { useState, useEffect } from 'react';

function TarefaForm({ tarefaExistente, onSalvar, onCancelar }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (tarefaExistente) {
      setTitle(tarefaExistente.title || '');
      setDescription(tarefaExistente.description || '');
      setDueDate(tarefaExistente.dueDate || '');
    }
  }, [tarefaExistente]);

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar({ title, description, dueDate });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {tarefaExistente ? 'Editar Tarefa' : 'Nova Tarefa'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de vencimento
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TarefaForm;
