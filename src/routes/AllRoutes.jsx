import React from "react";
import { Route, Routes } from "react-router-dom";

import Menu from "../pages/menu/Menu";
import Offer from "../pages/offers/Offer";
import Landing from "../pages/landingPage/Landing";
import Cart from "../pages/cart/Cart";
import Login from "../pages/login/Login";
import Checkout from "../pages/checkout/Checkout";
import NotFound from "../pages/404/NotFound";
import Services from "../pages/services/Services";
import Stores from "../pages/stores/Stores";
import Contact from "../pages/contact/Contact";
import AccountDetails from "../pages/account/AccountDetails";
import DeleteAccount from "../pages/delete_account/DeleteAccount";
import ResetPassword from "../pages/reset_password/ResetPassword";
const AllRoutes = ({ purchase, setPurchase }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/menu"
          element={<Menu setPurchase={setPurchase} purchase={purchase} />}
        />
        <Route path="/offers" element={<Offer />} />
        <Route
          path="/cart"
          element={<Cart purchase={purchase} setPurchase={setPurchase} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={<Checkout purchase={purchase} setPurchase={setPurchase} />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </div>
  );
};

export default AllRoutes;
