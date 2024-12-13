import { useEffect, useState } from "react";
import TodoToday from "./TodoToday";
import AddEditTodo from "../Components/AddEditTodo";
import TodoList from "./TodoList";
import DeleteTodo from "../Components/DeleteTodo";
import TodoHead from "./TodoHead";

function TodoApp() {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

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

  const addTodo = (title, alarmTime) => {
    if (title.trim()) {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        alarmTime,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setIsAddTodoVisible(false);
    }
  };

  const hideAddTodo = () => {
    setIsAddTodoVisible(false);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setIsDeleteModalOpen(true);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete.id);
      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 overflow-hidden">
      <div className="h-[860px] relative bg-white shadow-lg">
        <TodoHead />
        <TodoToday toggleAddTodo={toggleAddTodo} />
        {isAddTodoVisible && <AddEditTodo onAddTodo={addTodo} onCancel={hideAddTodo} />}
        <TodoList todos={todos} setTodos={setTodos} deleteTodo={handleDeleteClick} />
      </div>
      <DeleteTodo
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default TodoApp;
