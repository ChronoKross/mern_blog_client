import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import NavBar from "./components/navbar/Navbar";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import Write from "./components/pages/write/Write";
import Settings from "./components/pages/settings/Settings";
import Single from "./components/pages/single/Single";
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <BrowserRouter>
        {/* Routes == Switch */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/post/:postid" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
