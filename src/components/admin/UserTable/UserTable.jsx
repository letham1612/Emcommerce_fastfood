import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './usertable.scss';
import { USER_API } from '../../../config/ApiConfig';
import { toast } from "react-toastify";
import moment from 'moment'; 
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const UserTable = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fethProductData();
  }, []);


  const fethProductData = async () => {
    try {
      const response = await fetch(USER_API+"/all", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API');
      const data = await response.json();
      
    //  console.log(data)
    setUserData(data)
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
            const token = localStorage.getItem("token");

            try {
              const response = await fetch(`${USER_API}/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`,
                  }
              });
              if (!response.ok) {
                toast.error("Xóa tài khoản thất bại.", {
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
              
              setUserData(userData.filter(item => item._id !== id));

              toast.success("Đã xóa tài khoản.", {
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
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm:ss'), 
    },
    {
      title: 'Thời gian sửa đổi',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt) => moment(updatedAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Quyền quản trị',
      dataIndex: 'isadmin',
      key: 'isadmin',
      render: (isadmin) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isadmin ? (
          <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red', fontSize: '24px' }} />
        )}
      </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div> 
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={userData}
      rowKey="_id"
    />
  );
};

export default UserTable;
