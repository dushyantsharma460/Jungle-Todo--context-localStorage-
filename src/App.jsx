import { useEffect, useState } from 'react';
import { TodoProvider } from './context';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen py-8 bg-gradient-to-b from-green-900 to-amber-900">
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Jungle Todo</h1>
            <p className="text-amber-200 flex items-center justify-center gap-2">
              <span>🐘</span>
              <span>🐵</span>
              <span>🦁</span>
              <span>🐯</span>
              <span>🦒</span>
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/20 shadow-xl">
            <TodoForm/>
            <div className="mt-6 space-y-3">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center text-amber-200 text-sm">
            {todos.length === 0 ? (
              <div className="py-8">
                <p className="text-xl mb-2">🦁 No tasks in the jungle yet!</p>
                <p>Add your first task above</p>
              </div>
            ) : (
              <p>🐵 {todos.filter(t => !t.completed).length} tasks left in the wild</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;