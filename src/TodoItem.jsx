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
    if (!isChecked) {
      if (currentTime <= alarmTime) {
        setCircleColor("green");
      } else { 
        setCircleColor("red");
      }
    } else {
      setCircleColor(todo.alarmColor || "");
    }
  };

  return (
    <li className="d-flex justify-content-between align-items-center">
      <div className="flex items-center w-full ml-4">
        <input
          type="radio"
          checked={isChecked}
          onClick={handleRadioClick} 
          className="w-4 h-4 mr-2 cursor-pointer"
          style={{
            border: "2px solid #DADADA",
          }}
        />
        <div className="list-group-item w-80 my-1 py-2">
          <span className="flex justify-between items-center break-all">
            {todo.title}
            {todo.alarmTime && (
              <div
                className={`w-3 h-3 rounded-full ml-2 ${
                  circleColor === "green" ? "bg-green-500" : circleColor === "red" ? "bg-red-500" : "bg-[#B678FF]"
                }`}></div> 
            )}
          </span>
          {todo.alarmTime && (
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
