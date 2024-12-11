function TodoToday({ toggleAddTodo }) {
    return (
      <div className="w-[375px] h-[73px] relative overflow-hidden">
        <h1 className="w-16 h-10 absolute top-[16px] left-[16px] text-2xl leading-10 tracking-normal text-black font-bold font-sans">
          Today
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-plus-circle absolute top-[25px] right-2 text-blue-500 cursor-pointer"
          viewBox="0 0 16 16"
          onClick={toggleAddTodo}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg> 
      </div>
    );
  }
  
  export default TodoToday;
  