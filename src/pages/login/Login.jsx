import React, { useState } from "react";
import "./Style.css";
import logo from "../../assets/kfcLogo.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {  faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("Mỹ Duyên"); // Giả định có một tên người dùng


  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Đăng nhập thành công", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setTimeout(() => {
       // Lưu tên người dùng vào localStorage
      localStorage.setItem('firstName', firstName);
      navigate("/account-details");
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <h1 className="login-title">ĐẶT MÓN DỄ DÀNG</h1>
          <h1 className="login-title">GIAO HÀNG NHANH CHÓNG</h1>
          <img src={logo} alt="KFC Logo" className="login-logo" />
        </div>
        <div className="login-right">
          <h2 className="login-heading">ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu *</label>
              <div className="relative"> {/* Thêm div để chứa biểu tượng mắt */}
                <input
                  type={showPassword ? "text" : "password"} // Thay đổi loại input dựa trên state
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              
            </div>
            <button type="submit" className="login-button">Đăng nhập</button>
            <div className="divider">
              <span>Hoặc tiếp tục với </span>
            </div>
            <button className="facebook-button">
            <FontAwesomeIcon icon={faFacebook} /> Đăng nhập bằng Facebook
            </button>
            <button className="google-button">
              <FontAwesomeIcon icon={faGoogle} /> Đăng nhập bằng Google
            </button>
            <p className="signup-text">
              Chưa có tài khoản? <a href="#">Đăng ký</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;