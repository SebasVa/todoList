import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import{v4 as uuid} from "uuid";

const KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([{id: 1, task: 'tarea 1', completed: false}])
  
  const todoTaskRef = useRef();

  useEffect(() =>{
      const storedTodos = JSON.parse(localStorage.getItem(KEY));
      if(storedTodos){
          setTodos(storedTodos);
      }
  }, []);

  useEffect(() => {
      localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos]);

  const toggleTodo = (id) =>{
      const newTodos = [...todos];
      const todo = newTodos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      setTodos(newTodos);
  }
  
  const handleTodoAdd=()=>{
      const task = todoTaskRef.current.value;
      if(task === '')return;

      setTodos((prevTodos) => {
          return[...prevTodos, {id: uuid(), task, completed: false}]
      });
      todoTaskRef.current.value = null;


  };

  const handleClearAll = () =>{
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);
  };
  
  return (
      <>
       <TodoList todos={todos} toggleTodo={toggleTodo}/>
       <input ref={todoTaskRef} type="text" placeholder="Nueva tarea"></input>
       <button onClick={handleTodoAdd}>añadir tarea</button>
       <button onClick={handleClearAll}>eliminar tarea</button>
       <div>Te quedan {todos.filter((todo) => !todo.completed).length} por terminar</div>
      </>
 
 );
}

export default App;