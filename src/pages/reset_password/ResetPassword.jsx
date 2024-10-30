import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './Style.css';


const ResetPassword = ({ firstName }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add password reset logic here
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-sidebar">
                <img
                    alt=""
                    height="100"
                    src="https://storage.googleapis.com/a1aa/image/KEJ7y5TGeJ0YP66Ze084iR15qOfK26ZPRrSV1KW4C3Tu3cXnA.jpg"
                    width="100"
                />
                <h2>WELCOME, {firstName} !</h2>
                <Link to="/">Đăng xuất</Link>
                <Link to="/orders">Đơn hàng đã đặt</Link>
                <Link to="/favourites">Đơn hàng yêu thích</Link>
                <Link to="/addresses">Địa chỉ của bạn</Link>
                <Link to="/account-details">Chi tiết tài khoản</Link>
                <Link to="/reset-password">Đặt lại mật khẩu</Link>
                <Link to="/delete-account">Xóa tài khoản</Link>
            </div>
            <div className="reset-password-content">
                <h1>ĐẶT LẠI MẬT KHẨU</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="current-password">Mật khẩu hiện tại *</label>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={toggleCurrentPasswordVisibility}
                            className="eye-icon"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="new-password">Mật khẩu *</label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={toggleNewPasswordVisibility}
                            className="eye-icon"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="confirm-password">Xác nhận mật khẩu *</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faEye}
                            onClick={toggleConfirmPasswordVisibility}
                            className="eye-icon"
                        />
                    </div>
                    <button type="submit" className="reset-password-btn">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;