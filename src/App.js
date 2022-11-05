import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./layout/NavBar";
import MenuRow from "./layout/MenuRow";
import MyDay from "./component/MyDay/MyDay";
import Planned from "./component/Planned/Planned";
import Tasks from "./component/Tasks/Tasks";
import Important from "./component/Important/Important";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <MenuRow>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks/myday" />} />
            <Route path="/tasks/myday" element={<MyDay />} />
            <Route path="/tasks/important" element={<Important />} />
            <Route path="/tasks/planned" element={<Planned />} />
            <Route path="/tasks/inbox" element={<Tasks />} />
          </Routes>
        </main>
      </MenuRow>
    </div>
  );
}

export default App;
