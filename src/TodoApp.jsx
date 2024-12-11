import { useEffect, useState } from "react";
import TodoToday from "./TodoToday";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function TodoApp() {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleAddTodo = () => {
    setIsAddTodoVisible(!isAddTodoVisible);
  };

  const addTodo = (todo, alarmTime) => {
    if (todo.trim()) {
      const newTodo = {
        id: Date.now(),
        title: todo,
        completed: false,
        alarmTime: alarmTime, 
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setIsAddTodoVisible(false);
    }
  };

  const hideAddTodo = () => {
    setIsAddTodoVisible(false); 
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 overflow-hidden">
      <div className="h-[860px] relative bg-white shadow-lg">
        <TodoToday toggleAddTodo={toggleAddTodo} />
        {isAddTodoVisible && <AddTodo addTodo={addTodo} hideAddTodo={hideAddTodo} />}
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default TodoApp;
