import Modal from './components/Modal';
import TodoItem from './components/TodoItem';
import { useGlobalContext } from './context';

function App() {
  const {
    showModal,
    openModal,
    selectedStatus,
    setSelectedStatus,
    setTodoList,
  } = useGlobalContext();

  const handleSelectedStatus = (status) => {
    setSelectedStatus(status);
    const storedData = JSON.parse(localStorage.getItem('todos'));

    const filteredTodoList = storedData.filter((todo) => {
      if (status === 'All') return true;
      if (status === 'Completed') return todo.status === 'Completed';
      if (status === 'Incomplete') return todo.status === 'Incomplete';
      return false;
    });

    setTodoList(filteredTodoList);
  };

  const handleClearTasks = () => {
    localStorage.clear();
    setTodoList([]);
  };

  return (
    <div className="container">
      <header className="header">Todo List</header>
      <div className="task-dropdown-container">
        <div className="button-container">
          <button className="btn-addtask" onClick={() => openModal()}>
            Add Task
          </button>
          <button className="btn-clear" onClick={() => handleClearTasks()}>
            Clear
          </button>
        </div>

        <select
          id="status"
          className="btn-select"
          value={selectedStatus}
          onChange={(e) => handleSelectedStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="todo-container">
        <TodoItem />
      </div>
      {showModal && <Modal />}
    </div>
  );
}

export default App;
