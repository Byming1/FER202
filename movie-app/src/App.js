import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieList from "./pages/MovieList";
import FavouritePage from "./pages/FavouritePage";
import MovieManage from "./adminpages/MovieManage";
import UserManage from "./adminpages/UserManage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
        <Route path="/favourites" element={<FavouritePage />}></Route>
        <Route path="/admin/movies" element={<MovieManage />}></Route>
        <Route path="/admin/users" element={<UserManage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
