import { useState, useEffect } from "react";

function EditTodo({ todo, saveEditedTodo, cancelEdit }) {
    const [todoInput, setTodoInput] = useState(todo.title);
    const [alarmTime, setAlarmTime] = useState(todo.alarmTime);
    const [submitted, setSubmitted] = useState(false);
    const [alarmTimeError, setAlarmTimeError] = useState("");

    useEffect(() => {
        setTodoInput(todo.title);
        setAlarmTime(todo.alarmTime);
    }, [todo]);

    const handleSave = () => {
        setSubmitted(true);
        if (!todoInput.trim() || !alarmTime) {
            return;
        }

        const currentTime = new Date();
        const selectedAlarmTime = new Date(alarmTime);

        if (selectedAlarmTime < currentTime) {
            setAlarmTimeError("Alarm time cannot be in the past.");
            return;
        }

        saveEditedTodo(todo.id, todoInput, alarmTime);
    };

    return (
        <div className="w-[340.62px] absolute bg-white top-[58.76px] left-[17.13px] rounded-lg border px-3 pt-2">
            <h2 className="text-lg font-semibold">Edit Todo</h2>
            <textarea
                className={`w-[298px] h-[148px] border rounded-lg mt-3 px-2 py-1 text-left resize-none 
          ${submitted && !todoInput.trim() ? "border-red-500" : "border-gray-300"}`}
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            {submitted && !todoInput.trim() && (
                <p className="text-red-500 text-sm mt-1">Todo text is required.</p>
            )}
            <div className="mt-3">
                <label className="text-sm">Set Alarm Time:</label>
                <input
                    type="datetime-local"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className={`w-full border rounded-lg mt-1 px-2 py-1 ${submitted && !alarmTime ? "border-red-500" : "border-gray-300"}`}
                />
                {submitted && !alarmTime && (
                    <p className="text-red-500 text-sm mt-1">Alarm time is required.</p>
                )}
                {alarmTimeError && (
                    <p className="text-red-500 text-sm mt-1">{alarmTimeError}</p>
                )}
            </div>

            <div className="flex my-4 text-[#006CFF] justify-between w-[298px] px-1 text-[18px]">
                <button onClick={cancelEdit}>Cancel</button>
                <button className="font-semibold" onClick={handleSave}>Edit</button>
            </div>
        </div>
    );
}

export default EditTodo;
