import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Style.css'; 

const AccountDetails = () => {
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
  
    useEffect(() => {
      // Lấy tên người dùng từ localStorage
      const name = localStorage.getItem('firstName');
      if (name) {
        setFirstName(name);
      }
    }, []);  return (
    <div className="container">
      <div className="sidebar">
        <img
          alt=""
          height="100"
          src="https://storage.googleapis.com/a1aa/image/KEJ7y5TGeJ0YP66Ze084iR15qOfK26ZPRrSV1KW4C3Tu3cXnA.jpg"
          width="100"
        />
        <h2>WELCOME, {firstName} !</h2>
        <Link to="/">Đăng xuất</Link>
        <Link to="/order-list">Đơn hàng đã đặt</Link>
        <Link to="/favourites">Đơn hàng yêu thích</Link>
        <Link to="/addresses">Địa chỉ của bạn</Link>
        <Link to="/account-details">Chi tiết tài khoản</Link>
        <Link to="/reset-password">Đặt lại mật khẩu</Link>
        <Link to="/delete-account">Xóa tài khoản</Link>
        </div>
      <div className="content">
        <h1>CHI TIẾT TÀI KHOẢN</h1>
        <div className="form-group">
          <label className="label" htmlFor="first-name">Họ *</label>
          <input className="input-text" id="first-name" type="text" defaultValue="Mỹ Duyên" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="last-name">Tên *</label>
          <input className="input-text" id="last-name" type="text" defaultValue="Trần" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="phone-number">Số điện thoại *</label>
          <input className="input-text" id="phone-number" type="text" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">Email *</label>
          <input className="input-email" disabled id="email" type="email" defaultValue="thefoxie2505@gmail.com" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="gender">Giới tính *</label>
          <select className="select" id="gender">
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Ngày sinh (lựa chọn)</label>
          <div className="dob-container">
            <select id="dob-day">
              <option value="">Ngày</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select id="dob-month">
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
            <select id="dob-year">
              <option value="">Năm</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn">Update Account</button>
      </div>
    </div>
  );
};

export default AccountDetails;