import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";





const App = () => {
  return (
    <Router>
      <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
              </ProtectedRoute>
             } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App