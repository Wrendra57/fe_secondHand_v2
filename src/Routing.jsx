import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "./pages";

function Routing() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
