import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LookbookPage from "./pages/LookbookPage";
import CollectionsPage from "./pages/CollectionsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import BrandsPage from "./pages/BrandsPage";
import SalePage from "./pages/SalePage";

// Google Fonts — add to index.html <head> or import here
const fontsLink = document.createElement("link");
fontsLink.rel = "stylesheet";
fontsLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@400;500;600;700&display=swap";
document.head.appendChild(fontsLink);

// Reset global styles
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0b; color: #f0ece0; }
  ::placeholder { color: rgba(240,236,224,0.2); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0b; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 3px; }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #111114 inset !important;
    -webkit-text-fill-color: #f0ece0 !important;
  }
`;
document.head.appendChild(globalStyle);

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSidebar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}