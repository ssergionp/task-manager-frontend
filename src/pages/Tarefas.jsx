import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { listarTarefas } from '../api/tasksService';

function Tarefas() {
  const { logout } = useAuth();
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const dados = await listarTarefas();
        setTarefas(dados.content);
      } catch (error) {
        setErro('Erro ao carregar tarefas');
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  if (carregando) {
    return <p>Carregando tarefas...</p>;
  }

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <button onClick={logout}>Sair</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <strong>{tarefa.title}</strong> — {tarefa.status}
              <br />
              {tarefa.description}
              <br />
              Vencimento: {tarefa.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tarefas;
