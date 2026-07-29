import { HashRouter, Routes, Route } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <CryptoProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/:slug" element={<CaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </CryptoProvider>
  );
}

export default App;
