export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
    | { type: 'LOAD_TODOS'; payload: Todo[] };

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: Date.now(), text: action.payload, completed: false }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'UPDATE_TODO':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            );
        case 'LOAD_TODOS':
            return action.payload;
        default:
            return state;
    }
};