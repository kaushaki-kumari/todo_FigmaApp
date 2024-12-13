import { useState, useEffect } from "react";
import { FaBatteryFull, FaWifi, FaSignal } from 'react-icons/fa'; 

function TodoHead() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
      setCurrentTime(time);
    });
  

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <h1 className="text-lg font-bold">{currentTime}</h1>
      <div className="flex items-center space-x-1">
      <FaSignal className="text-black w-4 h-4" />
      <FaWifi className="text-black w-4 h-4" />
        <FaBatteryFull className="text-black w-4 h-4" />       
      </div>
    </div>
  );
}

export default TodoHead;
