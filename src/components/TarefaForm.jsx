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
    <form onSubmit={handleSubmit}>
      <h3>{tarefaExistente ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Data de vencimento</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}

export default TarefaForm;
