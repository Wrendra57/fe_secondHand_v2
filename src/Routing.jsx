import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DaftarJual,
  DetailProduct,
  JualProduk,
  LandingPage,
  LoginPage,
  Preview,
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
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/product/jual/preview" element={<Preview />} />
        <Route path="/dashboard/daftar-jual" element={<DaftarJual />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
