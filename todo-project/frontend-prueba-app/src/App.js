import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  axios
    .post("http://localhost:4000/api/v1/todos", {
      id: 4,
      content: "Enviado desde react archivo de prueba",
    })
    .then()
    .catch((err) => console.log(err));

  return (
    <div className="App">
      <h1>hola mundo</h1>
      {console.log(todos)}

      {todos.data?.ToDos.map(({id, content}) => (
        <ul key={id}>
          <li>{content}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
