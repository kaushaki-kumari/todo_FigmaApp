import { IoIosAlarm, IoMdCreate, IoIosTrash } from "react-icons/io";
import { useState, useEffect } from "react";
import EditTodo from "../Components/EditTodo";

function TodoItem({ todo, setTodos, todos ,deleteTodo}) {
  const [isChecked, setIsChecked] = useState(false);
  const [circleColor, setCircleColor] = useState(todo.alarmColor || "");
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlarmTime, setCurrentAlarmTime] = useState(todo.alarmTime);

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleCheckboxClick = () => {
    setIsChecked((prevIsChecked) => {
      const newIsChecked = !prevIsChecked;
      const currentTime = new Date().getTime();
      const alarmTime = new Date(currentAlarmTime).getTime();
      if (newIsChecked) {
        setCircleColor("green");
      } else {
        const newCircleColor = currentTime > alarmTime ? "red" : todo.alarmColor || "";
        setCircleColor(newCircleColor);
      }
      return newIsChecked;
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  }

  const saveEditedTodo = (id, newTitle, newAlarmTime) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle, alarmTime: newAlarmTime } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentAlarmTime(newAlarmTime);

    const currentTime = new Date().getTime();
    const newAlarmTimestamp = new Date(newAlarmTime).getTime();

    if (currentTime > newAlarmTimestamp) {
      setCircleColor("red");
    } else {
      setCircleColor(todo.alarmColor || "");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo);
  };

  useEffect(() => {
    const checkAlarmTime = () => {
      const currentTime = new Date().getTime();
      const alarmTime = new Date(currentAlarmTime).getTime();
      if (!isChecked && currentTime > alarmTime) {
        setCircleColor("red");
      } else if (!isChecked) {
        setCircleColor(todo.alarmColor || "");
      }
    };
    checkAlarmTime();
    const intervalId = setInterval(() => {
      checkAlarmTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentAlarmTime, todo.alarmColor, isChecked]);
  return (
    <>
      {isEditing ? (
        <EditTodo todo={todo} saveEditedTodo={saveEditedTodo} cancelEdit={cancelEdit} />
      ) : (
        <li className="d-flex justify-content-between align-items-center">
          <div className="flex items-center w-full ml-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxClick}
              className="w-5 h-5 mr-2 cursor-pointer rounded-full border-2 checked:bg-blue-400  appearance-none"
            />
            <div className="list-group-item w-80 my-1 py-2">
              <div className="flex justify-between items-center">
                <span className="break-all w-10/12">{todo.title}</span>
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${circleColor === "green" ? "bg-green-500" : circleColor === "red" ? "bg-red-500" : "bg-[#B678FF]"
                    }`}></div>
                <button onClick={handleEdit}>
                  <IoMdCreate className="text-black w-5 h-5 hover:text-blue-700"/>
                </button>
                <button  onClick={handleDelete}>
                  <IoIosTrash className="text-black w-5 h-5 hover:text-red-600" />
                </button>
              </div>
              {todo.alarmTime && (
                <div className="flex items-center">
                  <IoIosAlarm className="text-gray-400 mr-1 " />
                  <span className="text-xs text-gray-400">
                    {formatTime(todo.alarmTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default TodoItem;
