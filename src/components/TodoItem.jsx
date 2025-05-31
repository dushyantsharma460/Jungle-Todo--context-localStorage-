import React, { useState } from 'react';
import { useTodo } from '../context';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center p-4 mb-3 rounded-2xl border-2 transition-all duration-300
            ${todo.completed 
                ? "bg-green-100 border-green-300 shadow-green-200/30" 
                : "bg-amber-100 border-amber-300 shadow-amber-200/30"
            }
            shadow-lg hover:shadow-xl`}
        >
            <div className="flex items-center mb-3 sm:mb-0 sm:mr-3">
                <button
                    onClick={toggleCompleted}
                    className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center
                    ${todo.completed 
                        ? "bg-green-500 text-white" 
                        : "bg-amber-500 text-white"
                    }`}
                    aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                >
                    {todo.completed ? "✓" : "○"}
                </button>
            </div>

            <input
                type="text"
                className={`flex-1 px-3 py-2 rounded-lg outline-none font-medium mb-3 sm:mb-0
                ${isTodoEditable 
                    ? "bg-white border-2 border-amber-400" 
                    : "bg-transparent border-transparent"
                }
                ${todo.completed ? "line-through text-gray-600" : "text-amber-900"}
                text-base sm:text-lg`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            <div className="flex gap-2 sm:ml-3 justify-end">
                <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${todo.completed 
                        ? "bg-gray-200 text-gray-400" 
                        : isTodoEditable 
                            ? "bg-blue-500 text-white" 
                            : "bg-amber-500 text-white"
                    }
                    transition-colors hover:scale-110`}
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) editTodo();
                        else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                    aria-label={isTodoEditable ? "Save changes" : "Edit task"}
                >
                    {isTodoEditable ? "💾" : "✏️"}
                </button>

                <button
                    className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center
                    hover:bg-red-600 transition-colors hover:scale-110"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete task"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
