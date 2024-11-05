import React from "react";
import "./Style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgPlaceholder from "../../../../assets/placeholder.webp";
import { IMAGE_URL } from '../../../../config/ApiConfig';
import logo from '../../../../assets/logo.png';


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
  const handleClick = ({ card }) => {
    const localCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const index = localCart.findIndex((item) => item.id === card.id);

    if (index >= 0) {
      localCart[index].quantity += 1;
    } else {
      card.quantity = 1;
      localCart.push(card);
    }
    localStorage.setItem("cartData", JSON.stringify(localCart));

    const updatedPurchase = { ...purchase };
    updatedPurchase.quantity += 1;
    updatedPurchase.subTotal = parseFloat(
      parseFloat(updatedPurchase.subTotal) + parseFloat(card.price)
    ).toFixed(2);
    updatedPurchase.totalAmount = parseFloat(
      updatedPurchase.subTotal * 1.05
    ).toFixed(2);
    setPurchase(updatedPurchase);
    toast.success("🍗 Thêm vào giỏ hàng thành công!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="menu-childCardBody">
          <img src={IMAGE_URL+card.image || logo} alt={card.name} className="offer-cardImg" />
          <p className="menu-cardTitle">{card.name}</p>
          <div className="offer-cardCategory">
            <img
              src="https://online.kfc.co.in/static/media/Non_veg_dot_Icon.d975d1f9.svg"
              alt=""
            />
          </div>
          <p className="menu-cardPrice"> {card.price.toLocaleString('vi-VN')} VNĐ</p>
          <p className="offer-cardCategory-text">{card.description}</p>
          <div className="offer-button-add">
            <button
              className="offer-card-addToCart"
              onClick={() => handleClick({ card })}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card1;
