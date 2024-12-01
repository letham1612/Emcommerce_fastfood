import React from "react";
import "./Style.css";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';  // Để sử dụng các icon đẹp

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <ul>
          <li className="contact-item">
            <a href="https://www.facebook.com/@hvhangkhongvietnam" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
              Facebook: Học viện hàng không Việt Nam
            </a>
          </li>
          <li className="contact-item">
            <a href="https://www.instagram.com/yourInstagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
              Instagram: Yummy Fast Food
            </a>
          </li>
          <li className="contact-item">
            <a href="https://zalo.me/028 3842 4762" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="icon" />
              Zalo: 028 3842 4762
            </a>
          </li>
          <li className="contact-item">
            <a href="tel:+84987654321" target="_blank" rel="noopener noreferrer">
              <FaPhoneAlt className="icon" />
              Điện thoại: 028 3842 4762
            </a>
          </li>
        </ul>

        <h3>Gửi tin nhắn cho chúng tôi</h3>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Tên *" required />
            <input type="text" placeholder="Số điện thoại *" required />
          </div>
          <input type="email" placeholder="E-mail *" required />
          <textarea placeholder="Tin nhắn *" rows="4" required></textarea>
          <button type="submit" className="submit-button">
            Gửi
          </button>
        </form>
      </div>

      <div className="contact-map">
        <h3>Vị trí cửa hàng</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.14732485717!2d106.65184127451747!3d10.800026358759027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e0!3m2!1svi!2s!4v1732910200515!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
