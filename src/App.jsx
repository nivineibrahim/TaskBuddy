import "./App.scss";
import Authenticate from "./pages/authenticate";
import { Route, Routes } from "react-router-dom";
import { MainContext } from "./utils/context";
import { auth } from "./utils/firebaseConfig";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./component/navbar/navbar";
import AddTask from "./pages/addTasks";
import Home from "./pages/home";
import React from "react";
function App() {
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const storeUsername = (user) => {
    setUsername(user);
  };
  return (
    <MainContext.Provider value={{ username, storeUsername, user, loading }}>
      <Navbar />
      <Routes>
        <Route path="/authenticate" element={<Authenticate />}></Route>
        <Route path="/addTask" element={<AddTask />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </MainContext.Provider>
  );
}

export default App;