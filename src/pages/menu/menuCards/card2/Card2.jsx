import React from "react";
import "./Style.css";
import { Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMAGE_URL } from '../../../../config/ApiConfig';
import imgPlaceholder from "../../../../assets/placeholder.webp";
import logo from '../../../../assets/logo.png';


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
        <div className="menu-card2-parent">
          <div className="menu-card2-child1">
            <img
              src={IMAGE_URL+card.image || logo}
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
          <div className="menu-card2-child2">
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

export default Card2;
