import { useEffect } from 'react';
import { useGlobalContext } from '../context';
import { v4 as uuidv4 } from 'uuid';

const Modal = () => {
  const {
    closeModal,
    showModal,
    setNewTodo,
    newTodo,
    todoList,
    setTodoList,
    setEditedTask,
    editedTask,
    editTodo,
  } = useGlobalContext();

  const handleTitleChange = (e) => {
    const updatedTitle = {
      ...newTodo,
      title: e.target.value,
    };
    setNewTodo(updatedTitle);
    localStorage.setItem('todos', JSON.stringify([updatedTitle]));
  };

  const handleStatusChange = (e) => {
    const updateStatus = {
      ...newTodo,
      status: e.target.value,
    };
    setNewTodo(updateStatus);
    localStorage.setItem('todos', JSON.stringify([updateStatus]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTask) {
      editTodo(editedTask.id, newTodo.title, newTodo.status);
      setEditedTask(null);
    } else {
      const newTodoData = { ...newTodo, id: uuidv4(), date: Date.now() };
      setTodoList((prevList) => [...prevList, newTodoData]);
      localStorage.setItem('todos', JSON.stringify([...todoList, newTodoData]));
    }
    closeModal();
  };

  useEffect(() => {
    if (editedTask) {
      setNewTodo({
        title: editedTask.title,
        status: editedTask.status,
      });
    } else {
      setNewTodo({
        title: '',
        status: 'Incomplete',
      });
    }
  }, [editedTask]);

  return (
    <aside className="modal-overlay">
      <div className={`modal-container ${showModal ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h1>Add TODO</h1>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={newTodo.title}
              onChange={handleTitleChange}
            />
          </label>
          <label htmlFor="type">
            Status
            <select
              id="type"
              value={newTodo.status}
              onChange={handleStatusChange}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <div className="modal-button-container">
            <button className="btn-addtask">
              {editedTask ? 'Update Task' : 'Add Task'}
            </button>
            <button className="btn-cancel" onClick={() => closeModal()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Modal;
