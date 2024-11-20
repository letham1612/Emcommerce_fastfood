import React from "react";
import "./Style.css";
import footerLogo from "../../assets/logo.png";
import locationImg from "../../assets/location.svg";
import SocialButtons from "../../components/socialButtons/SocialButtons";
const Footer = () => {
  return (
    <div className='footer-parentContainer'>
      <div className='MainFooterContainer'>
        <div className='footerSection'>
          <div className='footerLogo'>
            <img src={footerLogo} alt='FooterLogo' />
          </div>
          <div className='footerUlTitle'>
            <ul>
              <li>
                <a href='/'>Legal</a>
              </li>
              <li>
                <a href='/'>Terms and Conditions</a>
              </li>
              <li>
                <a href='/'>Privacy Policy</a>
              </li>
              <li>
                <a href='/'>Disclaimer</a>
              </li>
              <li>
                <a href='/'>Caution Notice</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href='/'>Viet Nam</a>
              </li>
              <li>
                <a href='/'>About me</a>
              </li>
              <li>
                <a href='/'> Care</a>
              </li>
              <li>
                <a href='/'>Careers</a>
              </li>
              <li>
                <a href='/'>Our Golden Past</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href='/'>Food</a>
              </li>
              <li>
                <a href='/'>Menu</a>
              </li>
              <li>
                <a href='/'>Order Lookup</a>
              </li>
              <li>
                <a href='/'>Gift Card</a>
              </li>
              <li>
                <a href='/'>Nutrition & Allergen</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href='/'>Support</a>
              </li>
              <li>
                <a href='/'>Get Help</a>
              </li>
              <li>
                <a href='/'>Contact Us</a>
              </li>
              <li>
                <a href='/'>Feedback</a>
              </li>
              <li>
                <a href='/'>Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className='findStore'>
            <img src={locationImg} alt='locationImg' />
            <a href='/'>Find a location</a>
          </div>
          <div className='footerSocialButtons'>
            <SocialButtons />
          </div>
        </div>
      </div>
      <div className='footerBottomSection'>
        <span>Copyright © 2024 </span>{" "}
        <span> Nhóm 6 XÂY DỰNG ỨNG DỤNG THƯƠNG MẠI ĐIỆN TỬ </span>
      </div>
    </div>
  );
};

export default Footer;