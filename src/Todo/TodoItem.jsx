import { IoIosAlarm, IoMdCreate, IoIosTrash } from "react-icons/io";
import { useState, useEffect } from "react";
import moment from "moment";

function TodoItem({ todo, deleteTodo, editTask }) {
  const [isChecked, setIsChecked] = useState(false);
  const [circleColor, setCircleColor] = useState(todo.alarmColor || "");

  const formatTime = (time) => {
    if (!time) return "";
    return moment(time).format("HH:mm");
  };

  const handleTaskCompleted = () => {
    setIsChecked((prevIsChecked) => {
      const newIsChecked = !prevIsChecked;
      const currentTime = new Date().getTime();
      const alarmTime = new Date(todo.alarmTime).getTime();
      if (newIsChecked) {
        setCircleColor("green");
      } else {
        const newCircleColor = currentTime > alarmTime ? "red" : todo.alarmColor || "";
        setCircleColor(newCircleColor);
      }
      return newIsChecked;
    });
  };
  const handleEditTask = () => editTask(todo);

  const handleDeleteTask = () => {
    deleteTodo(todo);
  };

  useEffect(() => {
    const checkAlarmTime = () => {
      const currentTime = new Date().getTime();
      const alarmTime = new Date(todo.alarmTime).getTime();
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
  }, [todo.alarmTime, todo.alarmColor, isChecked]);

  return (
    <li className="d-flex justify-content-between align-items-center">
      <div className="flex items-center w-full ml-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleTaskCompleted}
          className="w-5 h-5 mr-2 cursor-pointer rounded-full border-2 checked:bg-blue-400 appearance-none"
        />
        <div className="list-group-item w-80 my-1 py-2">
          <div className="flex justify-between items-center">
            <span className="break-all w-10/12">{todo.title}</span>
            <div
              className={`w-3 h-3 rounded-full mr-2 ${circleColor === "green" ? "bg-green-500" : circleColor === "red" ? "bg-red-500" : "bg-[#B678FF]"}`}
            ></div>
            <button onClick={handleEditTask}>
              <IoMdCreate className="text-black w-5 h-5 hover:text-blue-700" />
            </button>
            <button onClick={handleDeleteTask}>
              <IoIosTrash className="text-black w-5 h-5 hover:text-red-600" />
            </button>
          </div>
          {todo.alarmTime && (
            <div className="flex items-center">
              <IoIosAlarm className="text-gray-400 mr-1 " />
              <span className="text-xs text-gray-400">{formatTime(todo.alarmTime)}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
