import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./pages/navbar/Navbar";
import CustomDrawer from "./components/drawer/Drawer";
import Footer from "./pages/footer/Footer";
import AllRoutes from "./routes/AllRoutes";
import { ToastContainer } from "react-toastify";

import ChatWidget from "./components/chatbox/ChatWidget";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const initialPurchase = JSON.parse(localStorage.getItem("userPurchase")) || {
    quantity: 0,
    subTotal: 0,
    hopePrice: 0,
    totalAmount: 0,
  };

  const [burger, setBurger] = useState(false);
  const [purchase, setPurchase] = useState(initialPurchase);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const toggleDrawer = () => {
    setBurger(!burger);
  };

  return (
    <div className="App">
      {!isAdminPage &&
        (burger ? (
          <CustomDrawer
            isOpen={burger}
            onClose={toggleDrawer}
            purchase={purchase}
          />
        ) : (
          <Navbar setBurger={setBurger} burger={burger} purchase={purchase} />
        ))}

      <AllRoutes purchase={purchase} setPurchase={setPurchase} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Sử dụng ChatWidget */}
      <ChatWidget />

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
