import React, { useState } from 'react';
import { Todo } from '../reducers/todoReducer';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleUpdate = () => {
        onUpdate(todo.id, text);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleUpdate}
                />
            ) : (
                <span onClick={() => onToggle(todo.id)} className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                </span>
            )}
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;