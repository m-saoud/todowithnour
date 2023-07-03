import { useState } from "react";

const Item = ({ index, todo, onEdit, onDelete, onToggle }) => {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleEdit = () => {
    setShowInput((prevState) => !prevState);
    setText(todo.title);

    onEdit(index, { title: text, completed: todo.completed });
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        onClick={() => {
          onToggle(index);
        }}
      >
        {todo.title}
      </span>

      {showInput && <input value={text} onChange={handleChange} />}
      <button onClick={() => onDelete(index)}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Item;
