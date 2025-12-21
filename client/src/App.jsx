import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/User/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cars from "./pages/Car/Cars";
import CarDetail from "./pages/Car/CarDetail";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header";
function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
