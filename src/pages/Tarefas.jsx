import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa } from '../api/tasksService';
import TarefaForm from '../components/TarefaForm';

function Tarefas() {
  const { logout } = useAuth();
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  async function carregarTarefas() {
    setCarregando(true);
    try {
      const dados = await listarTarefas();
      setTarefas(dados.content);
      setErro('');
    } catch (error) {
      setErro('Erro ao carregar tarefas');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function handleSalvar(dadosFormulario) {
    try {
      if (tarefaEmEdicao) {
        await atualizarTarefa(tarefaEmEdicao.id, dadosFormulario);
      } else {
        await criarTarefa(dadosFormulario);
      }
      setMostrarFormulario(false);
      setTarefaEmEdicao(null);
      await carregarTarefas();
    } catch (error) {
      setErro('Erro ao salvar tarefa');
      console.error(error);
    }
  }

  function handleEditar(tarefa) {
    setTarefaEmEdicao(tarefa);
    setMostrarFormulario(true);
  }

  async function handleDeletar(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (!confirmar) return;

    try {
      await deletarTarefa(id);
      await carregarTarefas();
    } catch (error) {
      setErro('Erro ao deletar tarefa');
      console.error(error);
    }
  }

  function handleNovaTarefa() {
    setTarefaEmEdicao(null);
    setMostrarFormulario(true);
  }

  function handleCancelar() {
    setMostrarFormulario(false);
    setTarefaEmEdicao(null);
  }

  if (carregando) {
    return <p>Carregando tarefas...</p>;
  }

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <button onClick={logout}>Sair</button>
      <button onClick={handleNovaTarefa}>+ Nova Tarefa</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {mostrarFormulario && (
        <TarefaForm
          tarefaExistente={tarefaEmEdicao}
          onSalvar={handleSalvar}
          onCancelar={handleCancelar}
        />
      )}

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
              <br />
              <button onClick={() => handleEditar(tarefa)}>Editar</button>
              <button onClick={() => handleDeletar(tarefa.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tarefas;
