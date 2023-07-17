import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newTodo, completed: false })
        }
      );
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ completed })
        }
      );
      if (response.ok) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        console.error("Error updating todo:", response.status);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE"
        }
      );
      if (response.ok) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      } else {
        console.error("Error deleting todo:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1 style={styles.heading}>Todo App</h1>
      <div style={styles.inputContainer}>
        <textarea
          style={styles.inputBox}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} style={styles.addTodo}>
          Add Todo
        </button>
      </div>
      <div style={styles.todoList}>
        {todos.map((todo) => (
          <div key={todo.id} style={styles.todoCard}>
            <div style={styles.todoCardContent}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  marginRight: "10px"
                }}
              >
                {todo.title}
              </span>
              <button
                style={styles.actionButton}
                onClick={() => updateTodo(todo.id, !todo.completed)}
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button style={styles.delete} onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  heading: {
    fontFamily: "Helvetica, Arial, sans-serif",
    textAlign: "center",
    marginBottom: "20px"
  },
  todoList: {
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
  },
  todoCard: {
    backgroundColor: "#134491",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px"
  },
  todoCardContent: {
    display: "flex",
    alignItems: "center",
    // padding: "8px", 
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "1.2rem",
    color:'#c9e1f0   '
  },
  actionButton: {
    backgroundColor: "#b0f736",
    height: "30px",
    width: "150px",
    border: "2px solid grey",
    borderRadius: "5px",
    marginBottom: "7px",
    cursor: "pointer",
    fontSize: "12px",
    color: "black",
    padding:'2px'
  },
  delete: {
    backgroundColor: "red",
    height: "30px",
    width: "80px",
    border: "2px solid grey",
    borderRadius: "5px",
    marginLeft: "5px",
    marginBottom: "7px",
    cursor: "pointer",
    fontSize: "16px",
    color: "yellow"
  },
  addTodo: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "7px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "48px",
    padding: "0 30px",
    fontSize: "20px",
    // color: "blue",
    resize: "none",
    marginBottom: "7px",
    marginLeft: "10px"
  },
  inputBox: {
    background: "lightgrey",
    borderRadius: "7px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: "6rem",
    padding: "10px 30px",
    fontSize: "20px",
    color: "blue",
    resize: "none",
    margin: "15px",
    width:'30rem'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  }
};

export default App;
