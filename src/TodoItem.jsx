import { IoIosAlarm } from "react-icons/io";  
import { useState } from "react"; 

function TodoItem({ todo }) {
  const [isChecked, setIsChecked] = useState(false);  
  const [circleColor, setCircleColor] = useState(todo.alarmColor || "");  

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleRadioClick = () => {
    const currentTime = new Date().getTime(); 
    const alarmTime = new Date(todo.alarmTime).getTime();  

    setIsChecked(!isChecked);  

    if (alarmTime && currentTime <= alarmTime) {
      setCircleColor("green");
    } else if (alarmTime && currentTime > alarmTime) {
      setCircleColor("red");
    } else {
      setCircleColor(todo.alarmColor || "");
    }
  };

  const alarmTime = todo.alarmTime ? new Date(todo.alarmTime).getTime() : null;
  const currentTime = new Date().getTime();

  return (
    <li className="d-flex justify-content-between align-items-center">
      <div className="flex items-center w-full ml-4">
        <input
          type="radio"
          checked={isChecked}
          onChange={handleRadioClick} 
          className="w-4 h-4 mr-2 cursor-pointer"
          style={{
            border: "2px solid #DADADA",
          }}
        />
        <div className="list-group-item w-80 my-1 py-2">
          <div className="flex justify-between items-center">
            <span className="break-all w-full pr-8">{todo.title}</span>
            {todo.alarmTime && currentTime <= alarmTime && (
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  circleColor === "green" ? "bg-green-500" : circleColor === "red" ? "bg-red-500" : "bg-[#B678FF]"
                }`}></div>
            )}
          </div>
          {todo.alarmTime && currentTime <= alarmTime && (
            <div className="flex items-center">
              <IoIosAlarm className="text-gray-300 mr-1 " />
              <span className="text-xs text-gray-300">
                {formatTime(todo.alarmTime)}
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
