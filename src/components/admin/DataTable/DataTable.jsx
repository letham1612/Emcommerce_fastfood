import React, { useState } from 'react';
import { Table, Button, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './datatable.scss';

// Sample data
const userData = [
  { id: '630343eb94c2812e4cd7e45d', username: 'Devid434', email: 'devidbom232@gmail.com', image: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'active', age: 24 },
  { id: '6303234eb94c2812e4cd7e45e', username: 'Johnn434', email: 'john03434@gmail.com', image: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'passive', age: 29 },
  { id: 'e40343eb94c2812e4cd7e4233', username: 'Dilvib1233', email: 'dilvibhasanjohn1233@gmail.com', image: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'active', age: 20 },
  { id: '930343eb94c2812e4cd7e45g', username: 'DoeJelia88', email: 'doejelia88@gmail.com', image: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'active', age: 23 },
  { id: '60443eb94c2812e4cd7e45ii', username: 'Lucas0984', email: 'lucashossel@gmail.com', image: 'https://randomuser.me/api/portraits/men/4.jpg', status: 'passive', age: 30 },
  { id: 'e23343eb94c2812e4cd7e45kk', username: 'Annie765', email: 'anniejhon@gmail.com', image: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'active', age: 23 },
];

const DataTable = () => {
  const [data, setData] = useState(userData);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Avatar src={image} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Link to={`/edit/${record.id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>Sửa   </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  );
};

export default DataTable;
