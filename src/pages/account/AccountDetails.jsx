import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Style.css'; 
import { USER_API} from "../../config/ApiConfig"; 
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
      { value: '', label: 'Tháng' },
      { value: '01', label: 'Tháng 1' },
      { value: '02', label: 'Tháng 2' },
      { value: '03', label: 'Tháng 3' },
      { value: '04', label: 'Tháng 4' },
      { value: '05', label: 'Tháng 5' },
      { value: '06', label: 'Tháng 6' },
      { value: '07', label: 'Tháng 7' },
      { value: '08', label: 'Tháng 8' },
      { value: '09', label: 'Tháng 9' },
      { value: '10', label: 'Tháng 10' },
      { value: '11', label: 'Tháng 11' },
      { value: '12', label: 'Tháng 12' },
    ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const response = await fetch(USER_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
          navigate("/login");
      }
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data)
        setUser(data.data);
        setUserName(data.data.username)
        setPhoneNumber(data.data.phoneNumber)
      } else {
        console.error("Không thể lấy thông tin người dùng!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };


  const updateUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const response = await fetch(USER_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          phoneNumber: phoneNumber
        })
      });
  
      if (!response.ok) {
        // Thông báo đăng nhập thành công
        toast.error("Sửa thông tin tài khoản thất bại!", {
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
  
      if (response.ok) {
        toast.success("Sửa thông tin tài khoản thành công.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        window.location.reload();
      } else {
        console.error("Không thể lấy thông tin người dùng!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu nhập lại không khớp!");
      return;
    }

    setError(""); // Xóa thông báo lỗi nếu hợp lệ
    // Gửi yêu cầu cập nhật tài khoản lên server
    updateUserData()
    // console.log("Cập nhật tài khoản thành công!");

  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };
  
    useEffect(() => {
      // Lấy tên người dùng từ localStorage
      // const name = localStorage.getItem('firstName');
      // if (name) {
      //   setFirstName(name);
      // }
      fetchUserData();
    }, []);  return (
    <div className="container">
      <div className="sidebar-account">
        <img
          alt=""
          height="100"
          src= {logo}
          width="100"
        />
        <h2>Xin chào, {user.username}</h2>
          <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
          <Link to="/orders">Đơn hàng đã đặt</Link>
          <Link to="/favourites">Đơn hàng yêu thích</Link>
          <Link to="/addresses">Địa chỉ của bạn</Link>
          <Link to="/account-details">Chi tiết tài khoản</Link>
          <Link to="/reset-password">Đặt lại mật khẩu</Link>
          <Link to="/delete-account">Xóa tài khoản</Link>
        </div>
      <div className="content">
        <h1>CHI TIẾT TÀI KHOẢN</h1>
        <div className="form-group">
          <label className="label" htmlFor="first-name">Tên người dùng *</label>
          <input
            className="input-text"
            id="first-name"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="phone-number">Số điện thoại *</label>
          <input
            className="input-text"
            id="phone-number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">Email *</label>
          <input className="input-email" disabled id="email" type="email" defaultValue={user.email} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="new-password">Mật khẩu mới *</label>
          <input
            className="input-text"
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="confirm-password">Nhập lại mật khẩu mới *</label>
          <input
            className="input-text"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <button className="btn" onClick={handleUpdate}>Cập nhập tài khoản</button>
      </div>
    </div>
  );
};

export default AccountDetails;