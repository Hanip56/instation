import LazyPage from "./components/UI/LazyPage";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="pt-20 p-2 max-w-4xl mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </main>
      {/* <LazyPage /> */}
    </div>
  );
}

export default App;
