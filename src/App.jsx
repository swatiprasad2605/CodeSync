import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Repositories from "./pages/Repositories";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateRepository from "./pages/CreateRepository";
import RepositoryDetails from "./pages/RepositoryDetails";
import Versions from "./pages/Versions";
import Comments from "./pages/Comments";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/repositories"
          element={
            <ProtectedRoute>
              <Repositories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-repository"
          element={
            <ProtectedRoute>
              <CreateRepository />
            </ProtectedRoute>
          }
        />
        <Route
          path="/repositories/:id"
          element={
            <ProtectedRoute>
              <RepositoryDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/repositories/:id/versions"
          element={
            <ProtectedRoute>
              <Versions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/repositories/:id/comments"
          element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
