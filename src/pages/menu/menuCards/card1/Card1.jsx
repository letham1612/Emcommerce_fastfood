import React from "react";
import "./Style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgPlaceholder from "../../../../assets/placeholder.webp";
import logo from '../../../../assets/logo.png';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { CARTS_API } from '../../../../config/ApiConfig';


const SkeletonCard = () => (
  <div className="menu-childCardBody card1-skeleton">
    <div className="card1-skeleton-img">
      <img src={imgPlaceholder} alt="placeholder" />
    </div>
    <div className="card1-skeleton-category">
      <div className="card1-skeleton-text skeleton-text-large"></div>

      <div className="card1-skeleton-text card1-skeleton-text-small"></div>
      <div className="card1-skeleton-text card1-skeleton-text-small"></div>
    </div>
    <div className="card1-skeleton-text card1-skeleton-text-small"></div>
    <div className="card1-skeleton-text card1-skeleton-text-large"></div>
    <div className="card1-skeleton-button"></div>
  </div>
);

const Card1 = ({ card, setPurchase, purchase, loading }) => {
  const navigate = useNavigate();
  const handleNavigateToDetail = () => {
    navigate(`/product/${card.ID_Product}`); // Điều hướng đến chi tiết sản phẩm
  };
  const handleClick =async (card) => {
    // event.stopPropagation(); 
    // try {
    //   const token = localStorage.getItem("token");
  
    //   const response = await fetch(CARTS_API, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${token}`, // Thêm token vào header nếu cần
    //     },
    //     body: JSON.stringify({
    //       product_id: card.ID_Product,
    //       quantity: 1,
    //       price: card.price,
    //     }),
    //   });
    //   if (!response.ok) {
    //     if (response.status === 401) {
    //       toast.error("Vui lòng đăng nhập để thực hiện thao tác!", {
    //         position: "top-right",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         theme: "colored",
    //       });
    //       throw new Error("Vui lòng đăng nhập!");
    //     }
    //     throw new Error("Đã xảy ra lỗi!");
    //   }
    //   const data = await response.json();
      
    //   // Cập nhật lại purchase state từ API response (ví dụ như giỏ hàng)
    //   setPurchase({
    //     quantity: data.cart.quantity,  // Giả sử API trả về tổng số lượng sản phẩm trong giỏ
    //     subTotal: data.cart.subTotal,  // Giả sử API trả về tổng giá trị giỏ hàng
    //     totalAmount: data.cart.totalAmount,  // Giả sử API trả về tổng tiền sau thuế
    //   });
    //   toast.success("🍗 Thêm vào giỏ hàng thành công!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // } catch (error) {
    //   console.error("Lỗi khi thêm sản phẩm:", error);
    // }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = rating || 0; // Nếu không có rating thì mặc định là 0
    let stars = [];
  
    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(filledStars)) {
        stars.push(<FaStar key={i} color="gold" className={i < rating ? "star-filled" : "star-empty"} />); // Ngôi sao đầy
      } else if (i < Math.ceil(filledStars)) {
        stars.push(<FaStarHalfAlt key={i} color="gold" className={i < rating ? "star-filled" : "star-empty"}/>); // Ngôi sao nửa
      } else {
        stars.push(<FaRegStar key={i} color="gray" className={i < rating ? "star-filled" : "star-empty"}/>); // Ngôi sao rỗng
      }
    }
    return stars;
  };


  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="menu-childCardBody" onClick={handleNavigateToDetail}>
          <img
            src={card.image || logo}
            alt={card.name}
            className="offer-cardImg"
          />
          <p className="menu-cardTitle">{card.name}</p>
          <div className="offer-cardCategory">
            <img
              src="https://online.kfc.co.in/static/media/Non_veg_dot_Icon.d975d1f9.svg"
              alt=""
            />
          </div>
          <p className="menu-cardPrice"> {card.price.toLocaleString('vi-VN')} VNĐ</p>
          <p className="offer-cardCategory-text">{card.description}</p>

          {/* Phần Rating - Ngôi sao */}
          <div className="card-rating">
          {renderStars(card.averageRating)}
          </div>

          <div className="offer-button-add">
            <button
              className="offer-card-addToCart"
              onClick={() => handleClick(card)}
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card1;
