import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Style.css';

const DeleteAccount = ({ firstName }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Logic to delete account
        console.log("Tài khoản đã bị xóa");
        navigate('/');
    };

    return (
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
                <Link to="/orders">Đơn hàng đã đặt</Link>
                <Link to="/favourites">Đơn hàng yêu thích</Link>
                <Link to="/addresses">Địa chỉ của bạn</Link>
                <Link to="/account-details">Chi tiết tài khoản</Link>
                <Link to="/reset-password">Đặt lại mật khẩu</Link>
                <Link to="/delete-account">Xóa tài khoản</Link>
            </div>
            <div className="content">
                <div className="delete-account-container">
                    <h1 className="delete-account-title">Bạn có chắc muốn xoá tài khoản không?</h1>
                    <p className="delete-account-message">Xóa tài khoản của bạn cũng sẽ xóa vĩnh viễn các thông tin bên dưới:</p>
                    <ul className="delete-account-list">
                        <li>Đơn đặt hàng trước đây của tôi</li>
                        <li>Đơn đặt hàng yêu thích của tôi</li>
                        <li>Địa chỉ giao hàng đã lưu</li>
                    </ul>
                    <button className="delete-account-button" onClick={handleDelete}>Xóa</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
