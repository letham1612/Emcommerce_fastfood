import React from "react";
import "./Style.css";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgPlaceholder from "../../../../assets/placeholder.webp";
import logo from '../../../../assets/logo.png';
import { CARTS_API } from '../../../../config/ApiConfig';

const SkeletonCard = () => (
  <div className="menu-card2-parent child2-skeleton">
    <div className="menu-card2-child1 child2-skeleton">
      <div className="child2-skeleton-img">
        <img src={imgPlaceholder} alt="placeholder" />
      </div>
      <div className="menu-card2-child1-desc child2-skeleton-menu-card2-child1-desc">
        <div className="child2-skeleton-text child2-skeleton-text-large"></div>
        <Flex gap={4} pb={2}>
          <div className="child2-skeleton-circle"></div>
          <div className="child2-skeleton-text child2-skeleton-text-small"></div>
        </Flex>
        <Flex gap={4} pb={2}>
          <div className="child2-skeleton-text child2-skeleton-text-small"></div>
        </Flex>
        <div className="child2-skeleton-text child2-skeleton-text-large"></div>
        <div className="child2-skeleton-text child2-skeleton-text-large"></div>
        <div className="child2-skeleton-text child2-skeleton-text-large"></div>
        <div className="child2-skeleton-text child2-skeleton-text-large"></div>
      </div>
    </div>
    <div className="menu-card2-child2">
      <div className="child2-skeleton-button"></div>
    </div>
  </div>
);

const Card2 = ({ card, setPurchase, purchase, loading }) => {
  // const handleClick = async ({ card }) => {
    // event.preventDefault();

    const navigate = useNavigate();
    const handleNavigateToDetail = () => {
      navigate(`/product/${card.ID_Product}`); // Điều hướng đến chi tiết sản phẩm
    };
    const handleClick = async (card) => {
      // event.stopPropagation(); 

    // try {
    //   const token = localStorage.getItem('token');
  
    //   const response = await fetch(CARTS_API, {
    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json",
    //           "Authorization": `Bearer ${token}` 
    //       },
    //       body: JSON.stringify({
    //           product_id: card.ID_Product,
    //           quantity: 1,
    //           price: card.price
    //       })
    //   });
  
    //   if (!response.ok) {
    //       if (response.status === 401) {
    //           // Show login required message
    //           toast.error("Vui lòng đăng nhập để thực hiện thao tác!", {
    //               position: "top-right",
    //               autoClose: 2000,
    //               hideProgressBar: false,
    //               closeOnClick: true,
    //               pauseOnHover: true,
    //               draggable: true,
    //               theme: "colored",
    //           });
    //           throw new Error("Thêm sản phẩm thất bại!");
    //       }
    //       throw new Error("Đã xảy ra lỗi!");
    //   }
  
    //   const data = await response.json();

    // } catch (error) {
    //     console.error("Lỗi khi thêm sản phẩm :", error);
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
        <div className="menu-card2-parent"onClick={handleNavigateToDetail}>
          <div className="menu-card2-child1">
            <img
              src={card.image || logo}
              alt={card.name}
              className="menu-card2-child1-img"
            />
            <div className="menu-card2-child1-desc">
              <div className="menu-card2-child1-title"> {card.name} </div>
              <Flex gap={4} pb={2}>
                {card.oldPrice ? (
                  <>
                    <h4 className="menu-card2-child1-oldPrice">
                      {card.price}
                    </h4>
                    <h4 className="menu-card2-child1-currentPrice">
                      {card.newprice} VNĐ
                    </h4>
                    `
                  </>
                ) : (
                  <h4 className="menu-card2-child1-currentPrice">
                      {card.price.toLocaleString('vi-VN')} VNĐ
                  </h4>
                )}
              </Flex>
              <div className="card2-desc">{card.description}</div>
            </div>
          </div>
          {/* Rating stars before the button */}
          <div className="menu-card2-child1-rating">
            {renderStars(card.averageRating)}
          </div>
          <div className="menu-card2-child2">
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

export default Card2;
