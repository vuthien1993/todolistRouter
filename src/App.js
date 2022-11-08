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
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks/myday" />} />
          <Route path="/tasks/*" element={<MenuRow />}>
            <Route path="myday/*" element={<MyDay />}>
              <Route path="id/AQMkADAwATNiZmYAZC00MzY1LTNjYmUtMDACLT=/details" />
            </Route>
            <Route path="important" element={<Important />}>
              <Route path="id/AQMkADAwATNiZmYAZC00MzY1LTNjYmUtMDACLT=/details" />
            </Route>
            <Route path="planned" element={<Planned />}>
              <Route path="id/AQMkADAwATNiZmYAZC00MzY1LTNjYmUtMDACLT=/details" />
            </Route>
            <Route path="inbox" element={<Tasks />}>
              <Route path="id/AQMkADAwATNiZmYAZC00MzY1LTNjYmUtMDACLT=/details" />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
