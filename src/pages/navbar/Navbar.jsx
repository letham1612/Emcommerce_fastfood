import React, { useEffect, useState } from "react";
import "./Style.css";
import logo from "../../assets/logo.png";
import accountIcon from "../../assets/Account_Icon.svg";
import cartBucketIcon from "../../assets/bucket_cart_icon.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { CARTS_API, REFRESH_TOKEN_API, USER_API} from "../../config/ApiConfig"; // API endpoint

const Navbar = ({ setBurger, burger }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [className, setClassName] = useState("");
  const [cartData, setCartData] = useState({ quantity: 0, totalPrice: 0 });

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token){
        setUsername(null);
        setCartData({ quantity: 0, totalPrice: 0 });
        return;
      }
      let response = await fetch(CARTS_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token để xác thực
        },
      });
  
      if (response.status === 401) {
        // Token hết hạn, thử làm mới token
        const newToken = await refreshToken();
  
        if (newToken) {
          // Gửi lại yêu cầu với token mới
          response = await fetch(CARTS_API, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`, // Sử dụng token mới
            },
          });
        } else {
          console.error("Không thể làm mới token, vui lòng đăng nhập lại.");
          return;
        }
      }
  
      if (response.ok) {
        const data = await response.json();
        // Tính tổng số lượng sản phẩm và tổng giá trị
        const quantity = data.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = data.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
  
        // Cập nhật state với số lượng và tổng giá
        setCartData({
          quantity,
          totalPrice,
        });
      } else {
        console.error("Không thể lấy dữ liệu giỏ hàng!");
        window.location.reload();
      }
    } catch (error) {

      console.error("Lỗi khi gọi API giỏ hàng:", error);
    }
  };
  

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage
      const response = await fetch(REFRESH_TOKEN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;

        if (!newAccessToken) {
          alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/login"); // Điều hướng người dùng đến trang đăng nhập
        }
  
        // Lưu accessToken mới vào localStorage
        localStorage.setItem("token", newAccessToken);
        return newAccessToken; // Trả về token mới
      } else {
        console.error("Làm mới token thất bại!");
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      return null;
    }
  };
  

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token){
        setUsername(null);
        setCartData({ quantity: 0, totalPrice: 0 });
        return;
      }
  
      const response = await fetch(USER_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        // Token hết hạn, thử làm mới token
        const newToken = await refreshToken();
        if (newToken) {
          return fetchUserData(); 
        } else {
          navigate("/login");
        }
      }
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data.username)
        setUsername(data.data.username);
      } else {
        console.error("Không thể lấy thông tin người dùng!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Polling every 5 seconds to fetch cart data
  useEffect(() => {    
    // Set intervals for both fetchCartData and fetchUserData
    // const cartInterval = setInterval(fetchCartData, 5000); // 5000ms = 5 seconds
    // const userInterval = setInterval(fetchUserData, 10000); // 10000ms = 10 seconds

    // Cleanup both intervals when the component unmounts
    // return () => {
      // clearInterval(cartInterval);
      // clearInterval(userInterval);
    // };
    fetchCartData()
    fetchUserData()
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
          {username ? (
            <button
              className="usernameButton"
              onClick={() => navigate("/account-details")}
            >
              Xin chào, {username}
            </button>
          ) : (
            <button className="signInButton" onClick={() => navigate("/login")}>
              <img src={accountIcon} alt="account Icon" />
            </button>
          )}
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
