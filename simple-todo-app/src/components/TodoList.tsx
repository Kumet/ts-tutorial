import React from "react";

import './TodoList.css'

interface TodoListProps {
    items: {id: string; text: string}[],
    onRemoveTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = props => {
    return (
        <ul>
            {props.items.map(todo =>
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={props.onRemoveTodo.bind(null, todo.id)}>{"remove"}</button>
                </li>
            )}
        </ul>
    )
}

export default TodoList

