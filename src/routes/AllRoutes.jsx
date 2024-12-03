import React from "react";
import { Route, Routes } from "react-router-dom";

import Menu from "../pages/menu/Menu";
import Offer from "../pages/offers/Offer";
import Landing from "../pages/landingPage/Landing";
import Cart from "../pages/cart/Cart";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Checkout from "../pages/checkout/Checkout";
import NotFound from "../pages/404/NotFound";
import Services from "../pages/services/Services";
import Stores from "../pages/stores/Stores";
import Contact from "../pages/contact/Contact";
import AccountDetails from "../pages/account/AccountDetails";
import DeleteAccount from "../pages/delete_account/DeleteAccount";
import ResetPassword from "../pages/reset_password/ResetPassword";
import HomeAdmin from "../pages/admin/home/HomeAdmin";
import AdminList from "../pages/admin/Lists/Lists";
import AdminAddNew from "../pages/admin/AddNew/AddNew";
import AdminEdit from "../pages/admin/Edit/Edit";
import ProductDetail from "../pages/productdetail/ProductDetail";

import OrderDetails from "../pages/order_details/OrderDetails";
import OrderList from "../pages/orderlist/OrderList";

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
        <Route path="/register" element={<Register />} />
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
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/order-list" element={<OrderList/>} />
 


    

        <Route path="/admin" element={<HomeAdmin />} />
        {/* <Route path="/admin/user" element={<AdminList type={'user'} />} /> */}
        <Route path="/admin/user" element={<AdminList type={'user'} />} />
        <Route path="/admin/product" element={<AdminList type={'product'} />} />
        <Route path="/admin/type" element={<AdminList type={'type'} />} />
        {/* <Route path="/admin/order" element={<AdminList type={'order'} />} /> */}
        <Route path="/admin/order" element={<NotFound />} />
        <Route path="/admin/product/addnew" element={<AdminAddNew type={'product'} titlee={'Thêm sản phẩm mới'} />} />
        <Route path="/admin/type/addnew" element={<AdminAddNew type={'type'} titlee={'Thêm loại sản phẩm mới'} />} />
        <Route path="/admin/product/edit/:id" element={<AdminEdit type={'product'} titlee={'Sửa sản phẩm'} />} />
        <Route path="/admin/type/edit/:id" element={<AdminEdit type={'type'} titlee={'Sửa loại sản phẩm'} />} />


      </Routes>
    </div>
  );
};

export default AllRoutes;
