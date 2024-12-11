import { useState, useEffect } from "react";

function AddTodo({ addTodo, hideAddTodo }) {
  const [todoInput, setTodoInput] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [submitted, setSubmitted] = useState(false); 

  useEffect(() => {
    if (todoInput) {
      setSubmitted(false); 
    }
  }, [todoInput]);

  const handleDone = () => {
    setSubmitted(true); 
    if (!todoInput) {
      return; 
    }

    addTodo(todoInput, alarmTime);
    setTodoInput("");
    setAlarmTime("");
    setSubmitted(false);
  };

  return (
    <div className="w-[340.62px] absolute bg-white top-[58.76px] left-[17.13px] rounded-lg border px-3 pt-2">
      <h2 className="text-lg font-semibold">Add Todo</h2>
      <textarea
        className={`w-[298px] h-[148px] border rounded-lg mt-3 px-2 py-1 text-left resize-none ${
          submitted && !todoInput ? "border-red-500" : "border-gray-300"
        }`}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <div className="mt-3">
        <label className="text-sm">Set Alarm Time:</label>
        <input
          type="datetime-local"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="w-full border rounded-lg mt-1 px-2 py-1"
        />
      </div>

      <div className="flex my-4 text-[#006CFF] justify-between w-[298px] px-1 text-[18px]">
        <button onClick={hideAddTodo}>Cancel</button>
        <button className="font-semibold" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
}

export default AddTodo;
