import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa } from '../api/tasksService';
import TarefaForm from '../components/TarefaForm';

const CORES_STATUS = {
  TODO: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  DONE: 'bg-green-100 text-green-800',
};

const TEXTO_STATUS = {
  TODO: 'A fazer',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluída',
};

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
          <div className="flex gap-3">
            <button
              onClick={handleNovaTarefa}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              + Nova Tarefa
            </button>
            <button
              onClick={logout}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition"
            >
              Sair
            </button>
          </div>
        </div>

        {erro && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            {erro}
          </p>
        )}

        {mostrarFormulario && (
          <TarefaForm
            tarefaExistente={tarefaEmEdicao}
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
          />
        )}

        {tarefas.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhuma tarefa encontrada.</p>
        ) : (
          <ul className="space-y-3">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <strong className="text-gray-800">{tarefa.title}</strong>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${CORES_STATUS[tarefa.status]}`}
                    >
                      {TEXTO_STATUS[tarefa.status]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{tarefa.description}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Vencimento: {tarefa.dueDate}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEditar(tarefa)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(tarefa.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tarefas;
