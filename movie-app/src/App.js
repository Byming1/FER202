import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieList from "./pages/MovieList";
import FavouritePage from "./pages/FavouritePage";
import MovieManage from "./adminpages/MovieManage";
import UserManage from "./adminpages/UserManage";
import MovieDetail from "./pages/MovieDetail";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import { UserProvider } from "./context/UserContext";
import ProtectRoutes from "./protectRoutes/ProtectRoutes";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MovieList />}></Route>
          <Route
            path="/favourites"
            element={
              <ProtectRoutes allowedRoles={["user", "admin"]}>
                <FavouritePage />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/admin/movies"
            element={
              <ProtectRoutes allowedRoles={["admin"]}>
                <MovieManage />
              </ProtectRoutes>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <ProtectRoutes allowedRoles={["admin"]}>
                <UserManage />
              </ProtectRoutes>
            }
          ></Route>
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
