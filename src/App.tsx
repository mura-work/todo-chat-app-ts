import { Routes, Route } from "react-router-dom";
import { TodoListPage } from "pages/TodoListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoListPage />} />
      </Routes>
    </div>
  );
}

export default App;
