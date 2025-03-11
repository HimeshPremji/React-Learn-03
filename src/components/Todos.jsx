import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../app/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(""); // Store new text input

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text); // Set current text in input
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: editId, text: editText }));
      setEditId(null);
    }
  };

  return (
    <ul className="p-4 space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="p-2 border rounded flex justify-between items-center"
        >
          {editId === todo.id ? (
            <input
              type="text"
              className="p-1 border rounded w-full"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleUpdate} // Save when clicking outside
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              autoFocus
            />
          ) : (
            // Show text when not editing
            <span>{todo.text}</span>
          )}

          <div>
            {editId === todo.id ? (
              <button
                className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                onClick={handleUpdate}
              >
                ✅
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => handleEdit(todo)}
              >
                ✏️
              </button>
            )}

            <button
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
