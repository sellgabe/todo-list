import React, { useState } from 'react';
import { useGlobalContext } from '../context';

const TodoItem = () => {
  const { todoList, setTodoList, setEditedTask, openModal, selectedStatus } =
    useGlobalContext();

  const handleCheckbox = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === 'Incomplete' ? 'Completed' : 'Incomplete',
          }
        : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem('todos', JSON.stringify(updatedTodoList));
  };

  const handleEdit = (id) => {
    const taskToEdit = todoList.find((todo) => todo.id === id);
    setEditedTask(taskToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${formattedHours}:${formattedMinutes} ${AMPM}, ${date.toLocaleDateString()}`;
    return formattedDate;
  };

  return (
    <>
      {todoList.length <= 0 ? (
        <p>No tasks</p>
      ) : (
        todoList.map((todo) => (
          <div className="todo-item " key={todo.id}>
            <div className="todo-details">
              <input
                type="checkbox"
                className="todo-details-checkbox"
                checked={todo.status === 'Completed'}
                onChange={() => handleCheckbox(todo.id)}
              />
              <div className="todo-details-info">
                <p
                  className={`todo-details-task ${
                    todo.status === 'Completed' ? 'task-done' : ''
                  }`}
                >
                  {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
                </p>
                <p className="todo-details-date">{formatDate(todo.date)}</p>
              </div>
            </div>
            <div className="todo-actions">
              <span
                className="todo-actions-delete"
                onClick={() => handleDelete(todo.id)}
              >
                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: '#696c72' }}
                />
              </span>
              <span
                className="todo-actions-edit"
                onClick={() => handleEdit(todo.id)}
              >
                <i className="fa-solid fa-pen" style={{ color: '#696c72' }} />
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default TodoItem;
