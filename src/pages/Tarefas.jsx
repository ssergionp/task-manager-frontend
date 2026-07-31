import { useAuth } from '../context/AuthContext';

function Tarefas() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <p>Em breve: lista de tarefas aqui.</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Tarefas;
