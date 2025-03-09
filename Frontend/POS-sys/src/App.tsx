import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Shared/Header";

import BottomNav from "./components/Shared/BottomNav";
import { Home,Orders,Table,Menu,Dashboard } from "./pages";



const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders></Orders>} />
        <Route path="/table" element={<Table></Table>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/dashboard" element={<Dashboard/>} />


      </Routes>
     <BottomNav/>
    </Router>
  );
};

export default App;
