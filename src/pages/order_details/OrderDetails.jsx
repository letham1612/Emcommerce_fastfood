/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style.css'; // Tệp CSS dùng chung

const OrderDetails = () => {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API để lấy chi tiết đơn hàng
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/orderdetails/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Thêm token nếu cần
                    }
                });
                const data = await response.json();
                setOrderDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (!orderDetails) {
        return <p>Không tìm thấy chi tiết đơn hàng.</p>;
    }

    const { ID_Order, createdAt, total_price, status, delivery_address, details } = orderDetails;

    return (
        <div className="order-details">
            <h1>Chi tiết đơn hàng</h1>
            <div className="order-info">
                <p><strong>Mã đơn hàng:</strong> {ID_Order}</p>
                <p><strong>Ngày tạo:</strong> {new Date(createdAt).toLocaleString()}</p>
                <p><strong>Tổng giá trị:</strong> {total_price} VND</p>
                <p><strong>Trạng thái:</strong> {status}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {delivery_address}</p>
            </div>
            <h2>Danh sách sản phẩm</h2>
            <table className="details-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng giá</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((item) => (
                        <tr key={item.ID_Product._id}>
                            <td>{item.ID_Product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price} VND</td>
                            <td>{item.quantity * item.price} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetails;*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = () => {
      const orderData = {
        id: orderId,
        date: '01/12/2024',
        address: '123, Đường ABC, Quận XYZ',
        status: 'Đang xử lý',
        total: '1,200,000 VND',
        items: [
          { name: '1 gà giòn', quantity: 2, price: '200,000 VND' },
          { name: 'combo', quantity: 1, price: '800,000 VND' },
        ]
      };
      setOrderDetails(orderData);
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="order-details">
      <h2>Chi tiết Đơn hàng #{orderDetails.id}</h2>

      <div className="order-summary">
        <p><strong>Mã đơn hàng:</strong> #{orderDetails.id}</p>
        <p><strong>Ngày đặt hàng:</strong> {orderDetails.date}</p>
        <p><strong>Địa chỉ giao hàng:</strong> {orderDetails.address}</p>
        <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
        <p><strong>Tổng giá trị:</strong> {orderDetails.total}</p>
      </div>

      <h3>Danh sách sản phẩm</h3>
      <table className="order-details-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá mỗi sản phẩm</th>
            <th>Tổng giá trị</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                {item.quantity *
                  parseInt(item.price.replace(' VND', '').replace(',', ''), 10)}{' '}
                VND
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-actions">
        <button className="cancel-order-btn">Hủy đơn hàng</button>
      </div>
    </div>
  );
};

export default OrderDetails;
