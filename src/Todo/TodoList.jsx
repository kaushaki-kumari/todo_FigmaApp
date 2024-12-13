import React, { useState } from "react";
import TodoItem from "./TodoItem";
import AddEditTodo from "../Components/AddEditTodo";

function TodoList({ todos, setTodos, deleteTodo }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const isTodoListEmpty = todos.length === 0;

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleSaveTodo = (id, title, alarmTime) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, alarmTime } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const handleAddTodo = (title, alarmTime) => {
    const newTodo = { id: Date.now(), title, alarmTime };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      {isTodoListEmpty && (
        <div className="text-2xl text-gray-500 flex justify-center pt-6">
          Add a task........
        </div>
      )}

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            todos={todos}
            deleteTodo={deleteTodo}
            editTask={handleEdit}
          />
        ))}
      </ul>

      {editingTodo && (
        <AddEditTodo
          todo={editingTodo}
          onSaveTodo={handleSaveTodo}
          onAddTodo={handleAddTodo}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default TodoList;
