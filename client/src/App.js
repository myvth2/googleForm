import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async() => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      console.log(data.user._json)
    } catch (err) {
      console.log(err);
    }
  };
  
  const getUserLocal = () => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    setUser(items)
	};


  useEffect(() => {
    getUser();
    getUserLocal();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user}/> : <Navigate to="/login"/>}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/"/> : <Login/>}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/"/> : <Signup/>}
        />
      </Routes>
    </div>
  );
}

export default App;
