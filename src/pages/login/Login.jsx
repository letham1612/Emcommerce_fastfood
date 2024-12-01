import React, { useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {  faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LOGIN_API } from '../../config/ApiConfig';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("Con chó Khiêm"); // Giả định có một tên người dùng

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
          // Thông báo đăng nhập thành công
          toast.error("Đăng nhập thất bại!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
            throw new Error("Đăng nhập thất bại!");
        }

        const data = await response.json();
        
        // Thông báo đăng nhập thành công
        toast.success("Đăng nhập thành công.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
        console.log(response.status)
        if (response.status === 202){
          navigate("/");
        }
        else{
          navigate("/admin");
        }
        

        setTimeout(() => {
            // Lưu token người dùng vào localStorage
            localStorage.setItem('token', data["token"]);
        }, 2000);
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
    }
};

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <h1 className="login-title">ĐẶT MÓN DỄ DÀNG</h1>
          <h1 className="login-title">GIAO HÀNG NHANH CHÓNG</h1>
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
              Chưa có tài khoản? <a href="/register">Đăng ký</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;