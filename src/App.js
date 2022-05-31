import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Converter from "./pages/Converter/Converter";
import CurrencyList from "./pages/CurrencyList/CurrencyList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CurrencyList />} />
          <Route path="/converter" element={<Converter />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
