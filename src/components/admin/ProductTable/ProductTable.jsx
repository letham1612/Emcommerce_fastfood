import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './producttable.scss';
import { PRODUCTS_API, IMAGE_URL } from '../../../config/ApiConfig';
import { toast } from "react-toastify";

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true); // Hình ảnh tồn tại
    img.onerror = () => resolve(false); // Hình ảnh không tồn tại
  });
}


const ProductTable = () => {
  const [productData, setProductData] = useState();

  useEffect(() => {
    fethProductData();
  }, []);


  const verifyImages = async (data) => {
    const updatedData = await Promise.all(
      data.map(async (item) => {
        const exists = await checkImageExists(item.image);
        return { ...item, image: exists ? item.image : logo }; // Sử dụng logo nếu hình ảnh không tồn tại
      })
    );
    setProductData(updatedData);
  };

  const fethProductData = async () => {
    try {
      const response = await fetch(PRODUCTS_API, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API');
      const data = await response.json();
      
      // Cập nhật dữ liệu với đường dẫn ảnh
      const updatedData = await data.map(item => ({
        ...item,
        image: IMAGE_URL + item.image,
      }));

      // setProductData(updatedData);
      // Gọi verifyImages sau khi productData đã được cập nhật
      verifyImages(updatedData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  

  const handleDelete = (id) => {
    Modal.confirm({
        title: 'Xác nhận xóa',
        content: 'Bạn có chắc chắn muốn xóa mục này không?',
        okText: 'Có',
        okType: 'danger',
        cancelText: 'Không',
        async onOk() {
            try {
              const response = await fetch(`${PRODUCTS_API}/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              if (!response.ok) {
                toast.error("Xóa sản phẩm thất bại.", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                throw new Error('Lỗi khi gọi API');
              }
              
              setProductData(productData.filter(item => item.ID_Product !== id));

              toast.success("Đã xóa sản phẩm.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
            } catch (error) {
              console.error('Lỗi truy cập dữ liệu:', error);
            }
        },
        onCancel() {
            // Thao tác khi nhấn nút hủy (nếu cần)
        },
    });
  };
  

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'ID_Product',
      key: 'ID_Product',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'ID_Type',
      key: 'ID_Type',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giá mới',
      dataIndex: 'newprice',
      key: 'newprice',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div>
          <Link to={`/admin/product/edit/${record.ID_Product}`}>
            <Button type="primary" style={{ marginRight: 8 }}>Sửa   </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(record.ID_Product)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={productData}
      rowKey="ID_Product"
    />
  );
};

export default ProductTable;
