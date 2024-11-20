import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Style.css';
import { toast } from "react-toastify";
import { REGISTER_API } from '../../config/ApiConfig';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(REGISTER_API, {
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
        if (response.status === 200){
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

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form Submitted!");
//     navigate("/Menu");
//   };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-left">
          <h1 className="register-title">ĐẶT MÓN DỄ DÀNG</h1>
          <h1 className="register-title">GIAO HÀNG NHANH CHÓNG</h1>
        </div>
        <div className="register-right">
          <div className="form-container">
            <h2 className="register-heading">TẠO TÀI KHOẢN</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="first_name">Họ *</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Họ của bạn "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="last_name">Tên *</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Tên của bạn "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone_number">Số điện thoại *</label>
                <input
                  type="text"
                  id="phone_number"
                  placeholder="Số điện thoại "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password *</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="eye-icon"
                    onClick={handlePasswordToggle}
                  />
                </div>
              </div>
              <div className="checkbox-container">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  Tôi đã đọc và đồng ý với <a href="#">Chính sách họat động </a> và
                  <a href="#"> Chính sách bảo mật </a>.
                </label>
              </div>
              <button type="submit" className="btn">
                Tạo tài khoản
              </button>
            </form>
            <div className="signin">
              Đã có tài khoản?{" "}
              <span onClick={() => navigate("/Login")} className="signin-link">
                Đăng Nhập
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;