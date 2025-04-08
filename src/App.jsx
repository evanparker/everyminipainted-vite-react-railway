import { initThemeMode, ThemeModeScript } from "flowbite-react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify/unstyled";
import "./App.css";
import ForgotPasswordForm from "./components/auth/forgotPasswordForm";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import PasswordForm from "./components/auth/passwordForm";
import ResetPasswordForm from "./components/auth/resetPasswordForm";
import Signup from "./components/auth/signup";
import Figure from "./components/figures/figure";
import FigureEdit from "./components/figures/figureEdit";
import FigureNew from "./components/figures/figureNew";
import Figures from "./components/figures/figures";
import Manufacturer from "./components/manufacturers/manufacturer";
import ManufacturerEdit from "./components/manufacturers/manufacturerEdit";
import ManufacturerNew from "./components/manufacturers/manufacturerNew";
import Manufacturers from "./components/manufacturers/manufacturers";
import Mini from "./components/minis/mini";
import MiniEdit from "./components/minis/miniEdit";
import MiniNew from "./components/minis/miniNew";
import Minis from "./components/minis/minis";
import Navigation from "./components/navigation";
import User from "./components/users/user";
import UserEdit from "./components/users/userEdit";
import { getUserByMe } from "./services/user";
import useUserData from "./useUserData";
import PageFooter from "./components/pageFooter";
import AboutPage from "./components/aboutPage";
import ContactPage from "./components/contactPage";

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
      <ToastContainer
        position="bottom-right"
        closeButton={false}
        closeOnClick={true}
        hideProgressBar={true}
        pauseOnHover={true}
      />

      <div className="mb-5">
        <Navigation user={user} />
      </div>

      <Routes>
        <Route path="/" element={<Minis />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/logout"
          element={<Logout resetUserData={resetUserData} />}
        />
        <Route path="/password" element={<PasswordForm />} />
        <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
        <Route path="/passwordreset" element={<ResetPasswordForm />} />

        <Route path="/minis" element={<Minis />} />
        <Route path="/minis/:id" element={<Mini />} />
        <Route path="/minis/:id/edit" element={<MiniEdit />} />
        <Route path="/minis/new" element={<MiniNew />} />

        <Route path="/figures" element={<Figures />} />
        <Route path="/figures/:id" element={<Figure />} />
        <Route path="/figures/:id/edit" element={<FigureEdit />} />
        <Route path="/figures/new" element={<FigureNew />} />

        <Route path="/manufacturers" element={<Manufacturers />} />
        <Route path="/manufacturers/:id" element={<Manufacturer />} />
        <Route path="/manufacturers/:id/edit" element={<ManufacturerEdit />} />
        <Route path="/manufacturers/new" element={<ManufacturerNew />} />

        <Route path="/users/:username" element={<User />} />
        <Route path="/users/edit" element={<UserEdit />} />
      </Routes>

      <div className="mt-5">
        <PageFooter />
      </div>
    </>
  );
}

export default App;
