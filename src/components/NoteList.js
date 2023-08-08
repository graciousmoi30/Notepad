import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TodoList = ({ todos, completeTodo, removeTodo, editTodo }) => {
  return (
    <section className="todo-list">
      {todos.map((todo) => {
        const { id, title, completed } = todo;
        return (
          <article
            key={id}
            className={`${completed ? "complete" : ""} todo-item`}
          >
            <div onClick={() => completeTodo(id)} className="title">
              {title}
            </div>

            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editTodo(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeTodo(id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};
