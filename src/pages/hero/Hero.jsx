import React, { useEffect, useState } from "react";
import "./Style.css";
import Carousel from "../../components/carousel/Carousel";
import lineImg from "../../assets/mobileLogo.png";
// import axios from "axios";
import Categories from "../../components/categoriesCard/Categories";
import { useNavigate } from "react-router-dom";
import { TYPES_API, PRODUCTSBYTYPE_API } from '../../config/ApiConfig';
import logo from '../../assets/logo.png';


const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsByType, setProductsByType] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };
  const fethData = async () => {
    setLoading(true);
    try {
      const response = await fetch(TYPES_API, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API');
      const data = await response.json();
      setData(data);
      setLoading(false)
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
    
  };

  const fetchProductsByType = async (ID_Type) => {
    try {
      const response = await fetch(`${PRODUCTSBYTYPE_API}/${ID_Type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API sản phẩm theo loại');
      const data = await response.json();
      
      setProductsByType((prev) => ({ ...prev, [ID_Type]: data }));
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu sản phẩm cho loại ${ID_Type}:`, error);
    }
  };

  useEffect(() => {
    data.forEach((type) => {
      if (!productsByType[type.ID_Type]) {
        fetchProductsByType(type.ID_Type);
      }
    });
  }, [data]);

  useEffect(() => {
    fethData();
  }, []);
  return (
    <div className="hero-Main-Contianer">
      <div className="headerBottom">
        <div className="heroBottom-text">
          Thêm vào giỏ hàng, lấp đầy bụng đói!
        </div>
        <button className="startOrderBtn" onClick={handleClick}>
          Đặt ngay
        </button>
      </div>
      <Carousel />
      <div className="welcomeContainer">
        <img src={lineImg} alt="line Img" className="lineImg" />
        <div className="welcomeGreeting">Chào mừng quý khách ...!</div>
      </div>
      <div className="categoriesContainer">
        <div className="categoriesLeft">
          <h3>DANH MỤC MÓN ĂN </h3>
        </div>
        <div className="categoriesRight">
          <div className="horizontalLine"></div>
        </div>
      </div>

      <div className="categorySection">
        {
          <div className="categoryCards">
            {data ? (
              data?.map((item) => {
                return (
                  <div key={item.ID_Type}>
                    <Categories
                      url={productsByType[item.ID_Type] || logo}
                      categoryName={item.Type_name}
                      loading={loading}
                    />
                  </div>
                );
              })
            ) : (
              <h1>Có một vài vấn đề phía mấy con gà!</h1>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Hero;
