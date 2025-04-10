import { useState, useEffect } from "react";
import moment from 'moment';

function AddEditTodo({ todo, onAddTodo, onSaveTodo, onCancel }) {
  const [todoDetails, setTodoDetails] = useState({
    title: "",
    alarmTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (todo) {
      setTodoDetails({
        title: todo.title,
        alarmTime: todo.alarmTime,
      });
    } else {
      setTodoDetails({
        title: "",
        alarmTime: "",
      });
    }
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if ((name === "title" && errors.title) || (name === "alarmTime" && errors.alarmTime)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateTodo = () => {
    const errors = {};
    const { title, alarmTime } = todoDetails;

    if (!title.trim()) {
      errors.title = "Todo title is required.";
    }

    if (!alarmTime) {
      errors.alarmTime = "Alarm time is required.";
    } else {
      const currentDateTime = moment();
      const selectedTime = moment(alarmTime);
      if (selectedTime.isBefore(currentDateTime)) {
        errors.alarmTime = "Alarm time cannot be in the past.";
      }
    }
    return errors;
  };

  const handleTodoAction = () => {
    setIsSubmitted(true);
    const validationErrors = validateTodo();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (todo) {
      onSaveTodo(todo.id, todoDetails.title, todoDetails.alarmTime);
    } else {
      onAddTodo(todoDetails.title, todoDetails.alarmTime);
    }
    setTodoDetails({ title: "", alarmTime: "" });
    setIsSubmitted(false);
  };

  const currentDateTime = moment().startOf('minute').format("YYYY-MM-DDTHH:mm");
  const maxDateTime = moment().add(1, 'year').format("YYYY-MM-DDTHH:mm");

  return (
    <div className="w-[340.62px] absolute bg-white top-32 left-[17.13px] rounded-lg border px-3 pt-2">
      <h2 className="text-lg font-semibold">{todo ? "Edit Todo" : "Add Todo"}</h2>
      <textarea
        name="title"
        className={`w-[298px] h-[148px] border rounded-lg mt-3 px-2 py-1 text-left resize-none 
          ${isSubmitted && errors.title ? "border-red-500" : "border-gray-300"
          }`}
        value={todoDetails.title}
        onChange={handleInputChange}
      />
      {isSubmitted && errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
      )}
      <div className="mt-3">
        <label className="text-sm">Set Alarm Time:</label>
        <input
          type="datetime-local"
          name="alarmTime"
          value={todoDetails.alarmTime}
          onChange={handleInputChange}
          min={currentDateTime}
          max={maxDateTime}
          className={`w-full border rounded-lg mt-1 px-2 py-1 ${isSubmitted && errors.alarmTime ? "border-red-500" : "border-gray-300"
            }`}
        />
        {isSubmitted && errors.alarmTime && (
          <p className="text-red-500 text-sm mt-1">{errors.alarmTime}</p>
        )}
      </div>

      <div className="flex my-4 text-[#006CFF] justify-between w-[298px] px-1 text-[18px]">
        <button onClick={onCancel}>Cancel</button>
        <button className="font-semibold" onClick={handleTodoAction}>
          {todo ? "Save" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default AddEditTodo;
