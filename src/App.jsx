import { useState, useEffect } from "react";
import Item from "./Item";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  // const [filterTOdos, setFilterTodos] = useState("");
  const [searchText, setSearchText] = useState("");


  // useEffect(() => {
  //   // Filter the todos based on the searchText
  //   arr = todos.filter((todo) => {
  //     todo.title.toLowerCase().includes(searchText.toLowerCase())
  //   });
  // setFilterTodos(...arr)

  //   // Set the filtered todos state
  //   setTodos(filterTodos);
  // }, [searchText]);

  const add = () => {
    setTodos([{ title: text, completed: false }, ...todos]);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDelete = (index) => {
    const arr = [...todos];
    arr.splice(index, 1);
    setTodos(arr);
  };

  const handleEdit = useCallback((index, todo) => {
    const arr = [...todos];
    arr[index] = todo;
    setTodos(arr);
  }, []);

  const handleToggle = useCallback((index) => {
    const arr = [...todos];
    arr[index].completed = !arr[index].completed;
    setTodos(arr);
  }, [todos]);

  // Search functionality
  const handleSearch = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const filterTodos = useMemo(() => todos.filter((todo) => {
    return todo.title.toLowerCase().includes(searchText.toLowerCase()) 
  }), [searchText]);   

  return (
    <>
      <input type="text" placeholder="Add Todos" value={text} onChange={handleChange} />
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search Todos"
      />
      <button onClick={add}>Add Todo</button>

      {filterTodos.map((to, index) => {
        return (
          <Item
            key={"filtered-" + index}
            index={index}
            todo={to}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        );       
      })}

      {/* {todos.map((todo, index) => {
        return (
          <Item
            key={"key-" + index}
            index={index}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        );
      })} */}
    </>
  );
}

export default App;
