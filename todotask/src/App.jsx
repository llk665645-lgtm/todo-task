import { useState, useEffect } from 'react';


export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(() => {
      const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const[seconds, setSeconds] = useState(0);
  useEffect(()=> {
    setInterval(() => {
      setSeconds(totalSeconds => totalSeconds + 1);
    }, 1000);
    return () => clearInterval();
  }, []);

//       import { useState, useEffect } from 'react';

// export default function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCount(c => c + 1); // ✅ Pass a state updater
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, []); // ✅ Now count is not a dependency

//   return <h1>{count}</h1>;
// }


  useEffect(()=> {localStorage.setItem('todos', JSON.stringify(todos))
}, [todos]);

  const total = todos.length;
  const done = todos.filter(todo => todo.completed).length;
  const addTodo = (e) => {
    e.preventDefault();

    const value = text.trim();
    if (!value) return; 

    const newTodo = {
      id: Date.now(),
      title: value, 
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const completeTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="app">
      <h1>Todo Task</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => completeTodo(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}></span>
            </label>

            <button type='button' onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className='stats'>
        <p>Total Tasks: {total}</p>
        <p>Completed Tasks: {done}</p>
        <p>Completed percents:{total > 0 ? Math.round((done*100/total)): 0}%</p>
        <p>Time: {Math.floor(seconds/60)}min {seconds % 60}s </p>
      </div>
    </div>
  );
}

            