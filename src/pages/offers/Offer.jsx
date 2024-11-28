import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";

const Offer = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  const fethData = () => {
    axios
      .get("https://kfc-2yef.onrender.com/cardsData")
      .then((res) => setCardData(res.data));
  };

  useEffect(() => {
    fethData();
  }, []);
  console.log(cardData);
  return (
    <div className="offer-Body">
      <div className="offer-headerSection">
      ĐẶT MÓN DỄ DÀNG - TẬN HƯỞNG MỌI LÚC, MỌI NƠI ! 
       <button className="offer-headerSection-button">Đặt ngay </button>
      </div>
      <div className="offer-bannerSection">DEALS & OFFERS</div>
      <div className="offer-cardsSection">
        <div className="offer-headingSection">
         KHUYẾN MÃI DÀNH CHO BẠN
        </div>

        <div className="offer-blankSpace"></div>
        <div className="offer-cards-Box">
          <div className="offer-box1">
            <FcHome size={60} />
            SELECT A KFC TO SEE LOCAL OFFERS
            <button className="offer-cards-button">Find a KFC</button>
          </div>

          <div className="offer-box2">
            SIGN IN TO SEE MORE EXCLUSIVE OFFERS & DEALS
            <button
              className="offer-cards-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          {/* Offer Boxs start from  */}
          {cardData.map((singleCard, index) => {
            return (
              <div className="offer-box3" key={index}>
                <img
                  src={singleCard.url}
                  alt="box3 Img"
                  className="offer-box3-img"
                />
                <h1 className="offer-box3-title">{singleCard.offer}</h1>
                <p className="offer-box3-text">{singleCard.text}</p>
                <div className="offer-box3-buttonSection">
                  <h5
                    onClick={() => navigate("/menu")}
                    style={{ cursor: "pointer" }}
                  >
                    Xem chi tiết
                  </h5>
                  <button className="offer-box3-button">Đổi điểm lấy quà </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Offer;
