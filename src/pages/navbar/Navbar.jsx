import React, { useEffect, useState } from "react";

import "./Style.css";
import logo from "../../assets/headerLogo.jpg";
// import logo from "../../assets/kfcLogo.svg";
import accountIcon from "../../assets/Account_Icon.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setBurger, burger, purchase }) => {
  const navigate = useNavigate();
  return (
    <div className='NavMainContainer'>
      <div className='nav'>
        <div
          className='hamburger'
          onClick={() => {
            setBurger(!burger);
          }}
        >
          {burger ? <RxCross2 /> : <GiHamburgerMenu />}
        </div>
        <span className='headerLogo' onClick={() => navigate("/")}>
          <img src={logo} alt='Logo' />
        </span>
        <span className='navItemLeft'>
          <Link to='/menu' className='navItems-component-Menu'>
            Menu
          </Link>
          <Link to='/offers' className='navItems-component-Deals'>
            Khuyến Mãi
          </Link>
          <Link to='/services' className='navItems-component-Services'>
           Dịch Vụ
          </Link>
          <Link to='/stores' className='navItems-component-Stores'>
           Cửa Hàng
          </Link>
          <Link to='/contact' className='navItems-component-Contact'>
          Liên Hệ
           </Link>
        </span>
        <div className='navItemRight'>
          <div className='accountItems'>
            <button className='signInButton' onClick={() => navigate("/login")}>
              <img src={accountIcon} alt='account Icon' />
        
            </button>
          </div>
          <div className='bucketCartItems'>
            <button
              className='headerIconButtons'
              onClick={() => navigate("/cart")}
            >
              <span className='headerPrice'> {parseInt(purchase.totalAmount, 10).toLocaleString('vi-VN')} VNĐ</span>
              <div className='cartIcon'>
                <div className='cartIconCount'>{purchase.quantity}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
