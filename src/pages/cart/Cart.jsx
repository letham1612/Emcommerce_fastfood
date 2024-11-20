import React, { useEffect, useState } from "react";
import "./Style.css";
import linesLogo from "../../assets/mobileLogo.png";
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import CartCards from "../../components/cartCards/CartCards";
import logo from "../../assets/logo.png";
import { CARTS_API, API_BASE_URL } from '../../config/ApiConfig';
import { toast } from "react-toastify";



const Cart = ({ purchase, setPurchase }) => {
  const [cartData, setCartData] = useState([]);

  const initialHope = JSON.parse(localStorage.getItem("hope")) || false;
  // console.log(initialHope);
  const [hope, setHope] = useState(initialHope);

  const handleHope = () => {
    setHope(!hope);
    localStorage.setItem("hope", !hope);
    const updatedPurchase = { ...purchase };
    if (!hope) {
      updatedPurchase.totalAmount = parseFloat(
        parseFloat(updatedPurchase.totalAmount) + 5
      ).toFixed(2);
    } else {
      updatedPurchase.totalAmount = parseFloat(
        updatedPurchase.totalAmount - 5
      ).toFixed(2);
    }
    setPurchase(updatedPurchase);
  };

  // const payment = async (id) => {
  //   try {
  //     const response = await fetch(API_BASE_URL + "/payment", {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "Authorization": `Bearer ${token}` // Add token to the Authorization header
  //       },
  //     });

  //     if (!response.ok) {
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

  //     const data = await response.json();
  //     // console.log(data)
  //     setCartData(data);
  //   } catch (error) {
  //     console.error('Lỗi khi lấy dữ liệu:', error);
  //   }
  // };
  // }

  const fetchDataCarts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(CARTS_API, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Add token to the Authorization header
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
            // Show login required message
            toast.error("Vui lòng đăng nhập để thực hiện thao tác!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            throw new Error("Thêm sản phẩm thất bại!");
        }
        throw new Error("Đã xảy ra lỗi!");
    }

      const data = await response.json();
      // console.log(data)
      setCartData(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const navigate = useNavigate();
  const gst = ((cartData.reduce((total, item) => total + (item.price * item.quantity), 0)) * 0.05);
  // const gst = parseFloat((purchase.subTotal * 0.05) / 1000).toFixed(2);

  const fetchData = () => {
    const localCart = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartData(localCart);
  };

  useEffect(() => {
    // fetchData();
    fetchDataCarts();
  }, []);

  return (
    <div className="cart-Body">
      <div className="cart-headerSection">
      ĐẶT MÓN DỄ DÀNG - TẬN HƯỞNG MỌI LÚC, MỌI NƠI ! 
        <button className="cart-headerSection-button">Đặt ngay</button>
      </div>
      {cartData.length < 1 ? (
        <div className="cart-cardsSection">
          <div className="cart-headingSection">
            <img src={linesLogo} alt="logo" className="cart-3lingLogo" />
            GIỎ HÀNG
          </div>

          <div className="cart-data-parent-Empty-box">
            <div className="cart-data-parent-Empty-box-left">
              <p>GIỎ HÀNG CỦA BẠN TRỐNG. HÃY BẮT ĐẦU ĐẶT HÀNG!</p>
              <button
                className="cart-empty-Start-button"
                onClick={() => navigate("/menu")}
              >
                Đặt ngay
              </button>
            </div>
            <div className="cart-data-parent-Empty-box-right">
              <img
                src={logo}
                alt="empty cart img"
                className="EmptyCartImage"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-parentContianer">
          <div className="cart-cardsSection2">
            <div className="cart-headingSection2">
              <img src={linesLogo} alt="logo" className="cart-3lingLogo" />
              GIỎ HÀNG
            </div>
            <div className="cart-storedData">
              <div className="cart-storedData-left">
                {cartData.map((card, index) => {
                  return (
                    <CartCards
                      card={card}
                      key={index}
                      purchase={purchase}
                      setPurchase={setPurchase}
                      cartData={cartData}
                      setCartData={setCartData}
                    />
                  );
                })}
              </div>
              <div className="cart-storedData-right">
                <div className="cart-amoutBox">
                  {/* <Heading>
                    {purchase.quantity}{" "}
                    {purchase.quantity > 1 ? " MÓN" : " ITEM"}
                  </Heading> */}
                  <Heading>
                    {cartData.reduce((total, item) => total + item.quantity, 0)}{" "}
                    {cartData.reduce((total, item) => total + item.quantity, 0) > 1 ? " MÓN" : " ITEM"}
                  </Heading>
                  <div className="cart-amountBox-offerBox">
                    <div className="cart-amountBox-offerBox-circle1"></div>
                    <div className="cart-amountBox-offerBox-text">
                      <p>Áp dụng Ưu đãi & Khuyến mãi</p>
                    </div>
                    <button
                      className="cart-amountBox-button"
                      onClick={() => navigate("/offers")}
                    >
                      Xem
                    </button>
                    <div className="cart-amountBox-offerBox-circle2"></div>
                  </div>
                  <div className="cart-amountBox-total">
                  <p>Tạm tính</p>
                  {/* <p>{parseInt(purchase.subTotal, 10).toLocaleString('vi-VN')} VNĐ</p> */}
                  <p>{cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('vi-VN')} VNĐ</p>
                  </div>
                  <div className="cart-amountBox-gst">
                  <p>Phí giao hàng</p>
                  <p>{parseInt(gst, 10).toLocaleString('vi-VN')} VNĐ</p>
                  </div>
                  {hope ? (
                    <div className="cart-amountBox-addHope">
                      <p>Add Hope</p>
                      <p>1.000 VNĐ</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="cart-amountBox-line"></div>
                  <div className="cart-amountBox-hopeBox">
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleHope();
                      }}
                      checked={hope}
                    />
                    <Flex direction={"column"} fontSize={10}>
                      <p> Quyên góp 1.000 đ bằng việc nhấp vào Add Hope.</p>
                      <p> Mục tiêu của chúng tôi là cung cấp bữa ăn cho 100 ngàn người vào năm 2025.</p>
                    </Flex>
                    <img
                      src={logo}
                      alt="hope img"
                      className="addHopeImage"
                    />
                  </div>
                  <button
                    className="cart-amountBox-hopeBox-checkoutBtn"
                    onClick={() => navigate("/checkout")}
                  >
                    <p>Thanh toán  </p> 
                    <p>{parseInt(cartData.reduce((total, item) => total + (item.price * item.quantity), 0) + gst).toLocaleString('vi-VN')} VNĐ</p>
                    {/* <p>{parseInt(purchase.totalAmount).toLocaleString('vi-VN')} VNĐ</p> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
