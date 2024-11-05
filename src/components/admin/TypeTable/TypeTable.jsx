import React, { useEffect, useState } from 'react';
import { Table, Button, Modal  } from 'antd';
import { Await, Link } from 'react-router-dom';
import './typetable.scss';
import { PRODUCTS_API, TYPES_API } from '../../../config/ApiConfig';
import { toast } from "react-toastify";


const ProductTable = () => {
  const [dataType, setDataType] = useState([]);
  // const [dataProduct, setDataProduct] = useState([]);

  const fethProductData = async () => {
    try {
      

    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const fethTypeData = async () => {
    try {
      const responseType = await fetch(TYPES_API, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!responseType.ok) throw new Error('Lỗi khi gọi API');
      const typeJson = await responseType.json();

      const responseProduct = await fetch(PRODUCTS_API, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!responseProduct.ok) throw new Error('Lỗi khi gọi API');
      const productJson = await responseProduct.json();

      // Tính toán số lượng sản phẩm cho mỗi loại
      const updatedData = await typeJson.map(type => ({
          ...type,
          count: countProductsByType(productJson, type.ID_Type) // Gọi hàm đếm số lượng sản phẩm
      }));
      setDataType(updatedData);
   
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
      
      fethTypeData()
      fethProductData()
  }, []);

  function countProductsByType(products, typeId) {
      return products.filter(product => product.ID_Type === typeId).length;
  }

  const handleDelete = (id) => {
    Modal.confirm({
        title: 'Xác nhận xóa',
        content: 'Bạn có chắc chắn muốn xóa mục này không?',
        okText: 'Có',
        okType: 'danger',
        cancelText: 'Không',
        async onOk() {
            try {
              const response = await fetch(`${TYPES_API}/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              if (!response.ok) {
                toast.error("Xóa loại sản phẩm thất bại.", {
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
              
              setDataType(dataType.filter(item => item.ID_Type !== id));

              toast.success("Đã xóa loại sản phẩm.", {
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
      title: 'Mã loại sản phẩm',
      dataIndex: 'ID_Type',
      key: 'ID_Type',
    },
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'Type_name',
      key: 'Type_name',
    },
    {
      title: 'Số lượng sản phẩm của loại',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div>
          <Link to={`/admin/type/edit/${record.ID_Type}`}>
            <Button type="primary" style={{ marginRight: 8 }}>Sửa</Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(record.ID_Type)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataType}
      rowKey="ID_Type"
    />
  );
};

export default ProductTable;
