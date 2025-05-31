import React, { useState } from 'react';
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();   // addTodo({id:Date.now(), todo: todo, completed: false})

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ todo, completed: false });
        setTodo("");
    };

    return (
        <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-6" onSubmit={add}>
            <div className="relative flex-1 w-full">
                <input
                    type="text"
                    placeholder="What should the monkey remember?..."
                    className="w-full border-2 border-amber-700 rounded-xl px-4 py-3 pr-12 
                    outline-none bg-amber-50 text-amber-900 placeholder-amber-600
                    focus:ring-4 focus:ring-amber-200 focus:border-amber-500
                    shadow-lg shadow-amber-200/50 text-base sm:text-lg"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <span className="absolute right-3 top-3 text-2xl">🐵</span>
            </div>
            <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold
                rounded-xl shadow-lg shadow-green-200/50 hover:shadow-green-300/50
                transition-all duration-300 transform hover:scale-105
                flex items-center justify-center gap-2 text-base sm:text-lg"
            >
                <span>Add Task</span>
                <span className="text-xl">🐘</span>
            </button>
        </form>
    );
}

export default TodoForm;