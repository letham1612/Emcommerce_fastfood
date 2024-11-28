import React, { useEffect, useState } from "react";
import "./Style.css";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/Account_Icon.svg";
import cartBucketIcon from "../../assets/bucket_cart_icon.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { CARTS_API } from "../../config/ApiConfig"; // API endpoint

const Navbar = ({ setBurger, burger }) => {
  const navigate = useNavigate();

  const [className, setClassName] = useState("");
  const [cartData, setCartData] = useState({ quantity: 0, totalPrice: 0 });

  // Hàm gọi API lấy dữ liệu giỏ hàng
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(CARTS_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token để xác thực
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Tính tổng số lượng sản phẩm và tổng giá trị
        const quantity = data.reduce((total, item) => total + item.quantity, 0); // Tổng quantity
        const totalPrice = data.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ); // Tổng giá trị
        
        // Cập nhật state với số lượng và tổng giá
        setCartData({
          quantity,
          totalPrice,
        });
      } else {
        console.error("Không thể lấy dữ liệu giỏ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API giỏ hàng:", error);
    }
  };

  // Polling every 5 seconds to fetch cart data
  useEffect(() => {
    const interval = setInterval(fetchCartData, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const headerFunction = () => {
    if (window.location.pathname !== `/`) {
      setClassName("hidden");
    } else {
      setClassName("headerSection");
    }
  };

  useEffect(() => {
    headerFunction();
  });

  return (
    <div className="NavMainContainer">
      <div className="nav">
        <div
          className="hamburger"
          onClick={() => {
            setBurger(!burger);
          }}
        >
          {burger ? <RxCross2 /> : <GiHamburgerMenu />}
        </div>
        <span className="headerLogo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </span>
        <span className="navItemLeft"> 
          <Link to="/menu" className="navItems-component-Menu">
            Menu
          </Link>
          <Link to="/offers" className="navItems-component-Deals">
            Khuyến Mãi
          </Link>
          <Link to="/services" className="navItems-component-Services">
            Dịch Vụ
          </Link>
          <Link to="/stores" className="navItems-component-Stores">
            Cửa Hàng
          </Link>
          <Link to="/contact" className="navItems-component-Contact">
            Liên Hệ
          </Link>
        </span>
        <div className="navItemRight">
          <div className="accountItems">
            <button className="signInButton" onClick={() => navigate("/login")}>
              <img src={accountIcon} alt="account Icon" />
            </button>
          </div>
          <div className="bucketCartItems">
            <button
              className="headerIconButtons"
              onClick={() => navigate("/cart")}
            >
              <span className="headerPrice">
                {cartData.totalPrice.toLocaleString('vi-VN')} VNĐ
              </span>
              <div className="cartIcon">
                <div className="cartIconCount">{cartData.quantity}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
