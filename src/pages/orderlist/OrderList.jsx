import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

const OrderList = () => {
  const orders = [
    { id: '12345', date: '01/12/2024', status: 'Đang xử lý', total: '1,200,000 VND' },
    { id: '12346', date: '30/11/2024', status: 'Đã giao', total: '800,000 VND' },
    { id: '12347', date: '28/11/2024', status: 'Đã giao', total: '2,000,000 VND' },
  ];

  return (
    <div className="order-list">
    <h2>Danh sách đơn hàng đã đặt của bạn</h2>
    <div className="order-container">
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-info">
            <p><strong>Mã đơn hàng:</strong> #{order.id}</p>
            <p><strong>Ngày đặt hàng:</strong> {order.date}</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <p><strong>Tổng giá trị:</strong> {order.total}</p>
          </div>
          <Link to={`/order-details/${order.id}`} className="view-details-btn">
            Xem chi tiết
          </Link>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default OrderList;
