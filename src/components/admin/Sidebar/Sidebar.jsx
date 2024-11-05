/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FaUserCircle, FaChartBar, FaShoppingCart  , FaTachometerAlt, FaSignOutAlt, FaUser, FaTag  } from 'react-icons/fa';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import './Sidebar.scss';
import logo from "../../../assets/headerLogo.jpg";

function Sidebar() {
    // color state management using react context
    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                    <img src={logo} alt="Logo" className="logoImage" />
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Trang quản trị</p>
                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaTachometerAlt className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">Danh sách</p>
                    <Link to="/admin/user" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaUser className="icon" /> Người dùng
                        </li>
                    </Link>

                    <Link to="/admin/product" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaChartBar className="icon" /> Sản phẩm
                        </li>
                    </Link>
                    <Link to="/admin/type" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaTag   className="icon" /> Loại sản phẩm
                        </li>
                    </Link>
                    <Link to="/admin/order" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaShoppingCart className="icon" /> Đơn hàng
                        </li>
                    </Link>
                    {/* <li>
                        <FaChartBar className="icon" /> Status
                    </li> */}

                    <p className="spann">Cài đặt</p>
                    <Link to="/account-details" style={{ textDecoration: 'none' }}>
                        <li>
                            <FaUserCircle className="icon" /> Thông tin
                        </li>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li onClick={() => {
                            toast.info("Đã đăng xuất tài khoản quản trị.", {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: "colored",
                                });
                            }}>
                            <FaSignOutAlt className="icon" /> Đăng xuất
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
