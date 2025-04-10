import { useState } from "react";
import TodoItem from "./TodoItem";
import AddEditTodo from "../Components/AddEditTodo";

function TodoList({ todos, setTodos, deleteTodo }) {
  const isTodoListEmpty = todos.length === 0;
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
  };
  const handleSaveTodo = (id, title, alarmTime) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, alarmTime } : todo
      )
    );
    setCurrentTodo(null);
  };

  const handleCancelEdit = () => {
    setCurrentTodo(null);
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
            deleteTodo={deleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>

      {currentTodo && (
        <AddEditTodo
          todo={currentTodo}
          onSaveTodo={handleSaveTodo}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default TodoList;