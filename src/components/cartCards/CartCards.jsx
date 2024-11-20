import React, { useEffect, useState } from "react";
import "./Style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMAGE_URL, PRODUCTS_API, CARTS_API } from '../../config/ApiConfig';
import logo from "../../assets/logo.png";

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true); // Hình ảnh tồn tại
    img.onerror = () => resolve(false); // Hình ảnh không tồn tại
  });
}

const CartCards = ({ card, purchase, setPurchase, cartData, setCartData }) => {
  const [productsData, setProductsData] = useState({});
 
  useEffect(() => {
    fetchProductsByID(card.ID_Product);
  }, []);

  useEffect(() => {
    console.log(card)
  }, [cartData]);

  const handleRemove = (id, ID_Product) => {
    const updatedCartData = cartData.filter((item) => item._id !== id );
    if (deleteProductInCart(ID_Product)){
      setCartData(updatedCartData);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      updatedCartData.forEach((item) => fetchProductsByID(item.ID_Product));
    }
    else{
      toast.error("Đã xảy ra lỗi không thể xóa sản phẩm! Vui lòng thử lại.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


    // const index = cartData.findIndex((item) => item.id === id);

    // const updatedPurchase = { ...purchase };
    // updatedPurchase.quantity =
    //   updatedPurchase.quantity - cartData[index].quantity;
    // updatedPurchase.subTotal = parseFloat(
    //   parseFloat(updatedPurchase.subTotal) -
    //     parseFloat(card.price * card.quantity)
    // ).toFixed(2);

    // updatedPurchase.totalAmount = parseFloat(
    //   updatedPurchase.subTotal * 1.05
    // ).toFixed(2);

    // localStorage.setItem("cartData", JSON.stringify(updatedCartData));
    // setPurchase(updatedPurchase);
  };

  const handleDec = (id) => {
    
    // const updatedPurchase = { ...purchase };
    // updatedPurchase.quantity -= 1;
    // updatedPurchase.subTotal = parseFloat(
    //   parseFloat(updatedPurchase.subTotal) - parseFloat(card.price)
    // ).toFixed(2);
    // updatedPurchase.totalAmount = parseFloat(
    //   updatedPurchase.subTotal * 1.05
    // ).toFixed(2);

    // setPurchase(updatedPurchase);

    // card.quantity -= 1;

    // console.log(card)

    const updatedCartData = cartData.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity - 1;
        changeQuantityProductInCart(item.ID_Product, newQuantity);
        return { ...item, quantity: newQuantity};
      }
      return item;
    });

    setCartData(updatedCartData);

    // localStorage.setItem("cartData", JSON.stringify(cartData));
  };

  const handleInc = (id) => {
    // const updatedPurchase = { ...purchase };
    // updatedPurchase.quantity += 1;
    // updatedPurchase.subTotal = parseFloat(
    //   parseFloat(updatedPurchase.subTotal) + parseFloat(card.price)
    // ).toFixed(2);
    // updatedPurchase.totalAmount = parseFloat(
    //   updatedPurchase.subTotal * 1.05
    // ).toFixed(2);

    // setPurchase(updatedPurchase);
    // const index = cartData.findIndex((item) => item.id === id);
    // cartData[index].quantity += 1;

    // localStorage.setItem("cartData", JSON.stringify(cartData));

    const updatedCartData = cartData.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + 1;
        changeQuantityProductInCart(item.ID_Product, newQuantity);
        return { ...item, quantity: newQuantity};
      }
      return item;
    });

    setCartData(updatedCartData);

    // toast.success("🍗 Item added to cart!", {
    //   position: "top-center",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
  };

  const fetchProductsByID = async (ID_Product) => {
    try {
      const response = await fetch(`${PRODUCTS_API}/${ID_Product}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API sản phẩm.');
      const data = await response.json();
      data.image = IMAGE_URL + data.image;
 
      const exists = await checkImageExists(data.image);
      data.image = exists ? data.image : logo;
      // console.log(data)
      setProductsData((prev) => ({ ...prev, [ID_Product]: data }));
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu sản phẩm ${ID_Product}:`, error);
    }
  };

  const deleteProductInCart = async (ID_Product) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${CARTS_API}/${ID_Product}`, {
        method: 'DELETE',
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
            throw new Error("Xóa sản phẩm thất bại!");
        }
        throw new Error("Đã xảy ra lỗi!");
    }

      // const data = await response.json();
      // console.log(data)
      // setCartData(data);
      return true
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      return false
    }
  };

  const changeQuantityProductInCart = async (ID_Product, newQuantity) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${CARTS_API}/${ID_Product}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Add token to the Authorization header
        },
        body: JSON.stringify({
          quantity: newQuantity
      })
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
            throw new Error("Cập nhật số lượng sản phẩm thất bại!");
        }
        throw new Error("Đã xảy ra lỗi!");
    }

      // const data = await response.json();
      // console.log(data)
      // setCartData(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  return (
    <div className="cart-cards-container">
      <div className="cart-cards-parentbox">
        <div className="cart-cards-child-left">
          <img
            src={productsData[card.ID_Product]?.image || logo} // Kiểm tra dữ liệu hình ảnh trước khi hiển thị
            alt="alt"
            className="cart-cards-child-left-img"
          />
        </div>
        <div className="cart-cards-child-right">
          <div className="cart-cards-right-child1">
            <p className="cart-cards-right-child1-title">{productsData[card.ID_Product]?.name || "Không xác định!"}</p>
            <p
              className="cart-cards-right-child1-remove"
              onClick={() => handleRemove(card._id, card.ID_Product)}
            >
              Xóa
            </p>
          </div>
          <div className="cart-cards-right-child2">
            <button
              onClick={() => handleDec(card._id)}
              disabled={card.quantity < 2}
              className="cart-cards-right-child2-buttons"
            >
              -
            </button>
            <h3> {card.quantity} </h3>
            <button
              onClick={() => handleInc(card._id)}
              className="cart-cards-right-child2-buttons"
            >
              +
            </button>
            <div className="cart-cards-right-child2-itemPrice">
              <p>{parseInt(card.price * card.quantity, 10).toLocaleString('vi-VN')} VNĐ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCards;
