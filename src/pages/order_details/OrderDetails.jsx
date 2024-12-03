import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ORDER_DETAILS_API } from "../../config/ApiConfig";
import './Style.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${ORDER_DETAILS_API}/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi tải chi tiết đơn hàng");
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const {
    ID_Order,
    createdAt,
    total_price,
    status,
    delivery_address,
    details = [],
  } = orderDetails || {};
  return (
    <div className="main-content">
      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : !orderDetails ? (
        <div className="no-data-container">
          <div className="no-data">Không tìm thấy chi tiết đơn hàng.</div>
        </div>
      ) : (
        <div className="order-details">
          <h2>Chi tiết Đơn hàng #{orderDetails._id}</h2>
          <div className="order-summary">
          <p>
            <strong>Mã đơn hàng:</strong> {ID_Order}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(createdAt).toLocaleString("vi-VN")}
          </p>
          <p>
            <strong>Tổng giá trị:</strong> {total_price} VND
          </p>
          <p>
            <strong>Trạng thái:</strong> {status}
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong> {delivery_address}
          </p>
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

          <div className="order-actions">
            <button className="cancel-order-btn">Hủy đơn hàng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
