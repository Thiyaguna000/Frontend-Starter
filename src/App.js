import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Cart from "./screens/Cart/Cart";
import './App.css';
import Login from "./screens/Login/Login";

function App() {
  return (
      <div className="App">
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
   
  );
}

export default App;
