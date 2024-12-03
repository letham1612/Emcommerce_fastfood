import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Heading,
  Spinner,
  Button,
  Stack,
  Flex,
  Icon,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { PRODUCTS_API, CARTS_API, IMAGE_URL } from "../../config/ApiConfig";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart,FaUser } from "react-icons/fa";
import "./Style.css"; // Import định dạng từ file CSS riêng
import { toast } from "react-toastify";
import logo from '../../assets/logo.png';


const ProductDetail = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${PRODUCTS_API}/${id}`);
        if (!response.ok) throw new Error(`Không tìm thấy sản phẩm: ${response.status}`);
        const data = await response.json();

        // Đảm bảo URL hình ảnh hợp lệ
        data.image = data.image ? IMAGE_URL + data.image : logo;
        
        setProduct(data);

      } catch (error) {
        console.error("Lỗi khi gọi API chi tiết sản phẩm:", error.message);
        alert("Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(CARTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Token đăng nhập
        },
        body: JSON.stringify({
          product_id: product.ID_Product,
          quantity: 1,
          price: product.price,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          return;
        }
        throw new Error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
      }

      const data = await response.json();

      toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });


    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return <Text className="not-found">Không tìm thấy sản phẩm.</Text>;
  }
    
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = rating || 0; // Nếu không có rating thì mặc định là 0
    let stars = [];
  
    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(filledStars)) {
        stars.push(<FaStar key={i} color="gold" />); // Ngôi sao đầy
      } else if (i < Math.ceil(filledStars)) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />); // Ngôi sao nửa
      } else {
        stars.push(<FaRegStar key={i} color="gray" />); // Ngôi sao rỗng
      }
    }
    return stars;
  };


  return (
    <Box className="product-detail-container">
      {/* Khung chi tiết sản phẩm */}
      <Box className="product-detail-box">
        <Stack direction={{ base: "column", md: "row" }} spacing="10">
          <Image
            src={product.image}
            alt={product.name}
            className="product-image"
            fallbackSrc="https://via.placeholder.com/400"
          />
          <Box className="product-info">
            <Heading className="product-title">{product.name}</Heading>
            <Text className="product-description">{product.description}</Text>
            <Text className="product-price">
              Giá: {product.price.toLocaleString("vi-VN")} VND
            </Text>

            {/* Đánh giá sản phẩm */}
            <Box className="rating-box">
              <Flex className="rating-stars">
                <HStack spacing="2">
                  {/* Render ngôi sao từ rating */}
                  {renderStars(product.averageRating || 0)}
                </HStack>
                <Text className="rating-text">({product.averageRating || 0} / 5 từ {product.reviewCount || 0} lượt đánh giá)</Text>
              </Flex>
            </Box>

            {token ? (
              <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                <Icon as={FaShoppingCart} mr="2" />
                Thêm vào giỏ hàng
              </Button>
            ) : (
              <Button className="goto-to-login-btn" disabled>
                <Text>
                  Vui lòng đăng nhập
                </Text>
              </Button>
            )}
          </Box>
        </Stack>

        <Divider className="divider" />
      </Box>

      {/* Khung đánh giá sản phẩm */}
      <Box className="review-box">
        <Heading className="review-heading">Đánh giá sản phẩm</Heading>
        <Stack spacing="2">
          {/* Đánh giá mẫu */}
          <Box className="review-item">
            <Flex justify="space-between" align="center">
              <HStack spacing="2" align="center">
                <Icon as={FaUser} boxSize={5} color="gray.500" />
                <Text className="review-author">Nguyễn Văn A</Text>
              </HStack>
              <HStack spacing="1">
                <Icon as={FaStar} />
                <Icon as={FaStar} />
                <Icon as={FaStar} />
                <Icon as={FaStarHalfAlt} />
                <Icon as={FaRegStar} />
              </HStack>
            </Flex>
            <Text className="review-text">
              Sản phẩm rất tốt, giao hàng nhanh và chất lượng như mong đợi.
            </Text>
          </Box>

          {/* Đánh giá mẫu 2 */}
          <Box className="review-item">
            <Flex justify="space-between" align="center">
              <HStack spacing="2" align="center">
                <Icon as={FaUser} boxSize={5} color="gray.500" />
                <Text className="review-author">Trần Thị B</Text>
              </HStack>
              <HStack spacing="1">
                <Icon as={FaStar} />
                <Icon as={FaStar} />
                <Icon as={FaStar} />
                <Icon as={FaStarHalfAlt} />
                <Icon as={FaRegStar} />
              </HStack>
            </Flex>
            <Text className="review-text">
              Sản phẩm ổn, nhưng giao hàng hơi chậm một chút.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;