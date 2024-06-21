// src/App.tsx
import React, { useReducer, useEffect, useState } from 'react';
import { todoReducer, Todo } from './reducers/todoReducer';
import TodoList from './components/TodoList';
import './App.css';


const initialTodos: Todo[] = [
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
    { id: 4, text: 'Read for 1 hour', completed: false },
    { id: 5, text: 'Pick up groceries', completed: false },
    { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false },
];

const App: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, [], () => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : initialTodos;
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);

    const [text, setText] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch({ type: 'ADD_TODO', payload: text });
            setText('');
        }
    };

    const filteredTodos = state.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const itemsLeft = state.filter(todo => !todo.completed).length;

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-background">
                    <h1>TODO</h1>
                    <div className="input-container">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Currently typing"
                        />
                        <button onClick={handleAddTodo}>Add</button>
                    </div>
                </div>
            </header>
            <TodoList
                todos={filteredTodos}
                onToggle={(id) => dispatch({ type: 'TOGGLE_TODO', payload: id })}
                onDelete={(id) => dispatch({ type: 'DELETE_TODO', payload: id })}
                onUpdate={(id, text) => dispatch({ type: 'UPDATE_TODO', payload: { id, text } })}
            />
            <footer className="app-footer">
                <span>{itemsLeft} items left</span>
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>All</button>
                <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>Active</button>
                <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>Completed</button>
                <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear Completed</button>
            </footer>
        </div>
    );
};

export default App;
