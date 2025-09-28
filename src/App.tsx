import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen transition-colors">
      <Routes>
        {/* If user has token → go to Home */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={token === null ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={token === null ? <Register /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
