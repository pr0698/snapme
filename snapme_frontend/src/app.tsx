import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./container/home";
import Login from "./components/login";
import { ENV } from "./utils/Env";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, []);

  return (
    <GoogleOAuthProvider clientId="1050171478995-s1euqcml7o08o62ad2gi54ljve2ppsev.apps.googleusercontent.com">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
