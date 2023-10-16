import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DetailProduct,
  JualProduk,
  LandingPage,
  LoginPage,
  Profile,
  RegisterPage,
} from "./pages";

function Routing() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/jual" element={<JualProduk />} />
        <Route path="/product/:uuid" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
