import React, { useState } from 'react';
import { Todo } from '../reducers/todoReducer';

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
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
            <input type="checkbox" checked={todo.completed} onChange={onToggle} />
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate();
                    }}
                />
            ) : (
                <span className={todo.completed ? 'completed' : ''} onDoubleClick={() => setIsEditing(true)}>
                    {todo.text}
                </span>
            )}
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default TodoItem;
