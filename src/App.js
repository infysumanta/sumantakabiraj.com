import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
