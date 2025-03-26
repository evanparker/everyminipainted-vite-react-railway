import { Route, Routes } from "react-router-dom";
import useUserData from "./useUserData";
import "./App.css";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Minis from "./components/minis/minis";
import Mini from "./components/minis/mini";
import MiniEdit from "./components/minis/miniEdit";
import MiniNew from "./components/minis/miniNew";
import Figures from "./components/figures/figures";
import FigureNew from "./components/figures/figureNew";
import Figure from "./components/figures/figure";
import FigureEdit from "./components/figures/figureEdit";
import User from "./components/users/user";
import UserEdit from "./components/users/userEdit";
import Navigation from "./components/navigation";
import Signup from "./components/auth/signup";
import { initThemeMode, ThemeModeScript } from "flowbite-react";
import { useEffect, useState } from "react";
import { getUserByMe } from "./services/user";

function App() {
  const { token, setUserData, resetUserData } = useUserData();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserByMe();
      setUser(userData);
    };
    if (token) {
      fetchUserData();
    } else {
      setUser(undefined);
    }
  }, [token]);

  initThemeMode();

  return (
    <>
      <ThemeModeScript />
      <Navigation user={user} />
      <Routes>
        <Route path="/" element={<Minis />} />

        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/logout"
          element={<Logout resetUserData={resetUserData} />}
        />

        <Route path="/minis" element={<Minis />} />
        <Route path="/minis/:id" element={<Mini />} />
        <Route path="/minis/:id/edit" element={<MiniEdit />} />
        <Route path="/minis/new" element={<MiniNew />} />

        <Route path="/figures" element={<Figures />} />
        <Route path="/figures/:id" element={<Figure />} />
        <Route path="/figures/:id/edit" element={<FigureEdit />} />
        <Route path="/figures/new" element={<FigureNew />} />

        <Route path="/users/:username" element={<User />} />
        <Route path="/users/edit" element={<UserEdit />} />
      </Routes>
    </>
  );
}

export default App;
