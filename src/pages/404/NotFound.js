import React from "react";
import "./Style.css";
import errorImg from "./404.webp";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <img src={errorImg} alt="Lost Chicken" className="errorImg" />

      <h1>Con gà bạn đang muốn tìm đã bị lạc!</h1>
      <p>
        Có vẻ như trang bạn đang tìm kiếm không được tìm thấy.
        Đừng lo, còn nhiều gà ngon đang xếp hàng đợi bạn!
      </p>
      <button className="error-goHome" onClick={() => navigate("/")}>
        Nào theo tôi! Tôi sẽ đưa bạn đến thiên đường ẩm thực!
      </button>
    </div>
  );
};

export default NotFound;
