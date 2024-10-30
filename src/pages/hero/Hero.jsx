import React, { useEffect, useState } from "react";
import "./Style.css";
import Carousel from "../../components/carousel/Carousel";
import lineImg from "../../assets/mobileLogo.png";
// import axios from "axios";
import Categories from "../../components/categoriesCard/Categories";
import { useNavigate } from "react-router-dom";
import categories from "./categories";

const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };
  const fethData = () => {
    setLoading(true);
    // try {
    //   axios
    //     .get("https://kfc-2yef.onrender.com/categories")
    //     .then((res) => setData(res.data))
    //     .finally(setLoading(false));
    // } catch (error) {
    //   console.log(error);
    // }
    setData(categories);
    setLoading(false);
  };

  useEffect(() => {
    fethData();
  }, []);
  return (
    <div className="hero-Main-Contianer">
      <div className="headerBottom">
        <div className="heroBottom-text">
          LET'S ORDER FOR DELIVERY, PICK UP, OR DINE-IN
        </div>
        <button className="startOrderBtn" onClick={handleClick}>
          Đặt ngay
        </button>
      </div>
      <Carousel />
      <div className="welcomeContainer">
        <img src={lineImg} alt="line Img" className="lineImg" />
        <div className="welcomeGreeting">WELCOME TO ...!</div>
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
                  <div key={item.id}>
                    <Categories
                      url={item.url}
                      categoryName={item.categoryName}
                      loading={loading}
                    />
                  </div>
                );
              })
            ) : (
              <h1>Something went wrong from our backend</h1>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Hero;
