import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos ,deleteTodo }) {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setTodos={setTodos} 
          todos={todos}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
