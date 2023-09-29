import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [newTodo, setNewTodo] = useState({ title: '', status: 'Incomplete' });
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const editTodo = (id, newText, newStatus) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newText, status: newStatus } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem('todos', JSON.stringify(updatedTodoList));

    setShowModal(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setEditedTask(null);
    setShowModal(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('todos'));
    if (storedData) {
      setTodoList(storedData);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        newTodo,
        setNewTodo,
        openModal,
        closeModal,
        showModal,
        setTodoList,
        todoList,
        editTodo,
        setEditedTask,
        editedTask,
        setSelectedStatus,
        selectedStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
