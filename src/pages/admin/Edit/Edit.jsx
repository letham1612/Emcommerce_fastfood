/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { FaRegImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/admin/Navbar/Navbar';
import Sidebar from '../../../components/admin/Sidebar/Sidebar';
import logo from '../../../assets/logo.png';
import './edit.scss';
import {inputTypes} from './Input'
import { toast } from "react-toastify";
import { PRODUCTS_API, PRODUCT_IMAGE_API, IMAGE_URL, TYPES_API } from '../../../config/ApiConfig';

function checkImageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true); // Hình ảnh tồn tại
      img.onerror = () => resolve(false); // Hình ảnh không tồn tại
    });
}


function Edit({ titlee, type }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [file, setFile] = useState('');   
    const [inputValues, setInputValues] = useState({});
    const [dataValues, setDataValues] = useState({});

    useEffect(() => {
        if(type === 'product'){
            fethProductData();
        }else{
            fethTypeData();
        }
    }, []);
      
    const fethProductData = async () => {
        try {
          const response = await fetch(`${PRODUCTS_API}/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
            if (!response.ok) throw new Error('Lỗi khi gọi API');
            const data = await response.json();
            data.image = IMAGE_URL + data.image

            const exists = await checkImageExists(data.image);
            data.image = exists ? data.image : logo;
            
            setDataValues(data);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      };

      const fethTypeData = async () => {
        try {
          const response = await fetch(`${TYPES_API}/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
            if (!response.ok) throw new Error('Lỗi khi gọi API');
            const data = await response.json();
            setDataValues(data);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      };

      const updateProduct = async () => {
        const formData = new FormData();

        if (file) {
            formData.append('ProductImage', file);
        }
        else{
            const response = await fetch(logo);
            const blob = await response.blob();
            formData.append('ProductImage', blob, "logo.png");
        }
        

        try {
            const responseImg = await fetch(PRODUCT_IMAGE_API, {
                method: 'POST',
                body: formData,
            });

            if (!responseImg.ok) {
                throw new Error('Lỗi khi upload ảnh!');
            }
    
            const result = await responseImg.json();
            // console.log('Kết quả:', result.files[0].storedName);
    
            // if (result.files) {
            //     alert('Upload thành công! Đường dẫn file: ' + result.files.map(file => file.path).join(', '));
            // }

            const responseJson = await fetch(`${PRODUCTS_API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name : inputValues.name ? inputValues.name : dataValues.name,
                  description : inputValues.description ? inputValues.description : dataValues.description,
                  ID_Type : inputValues.ID_Type ? inputValues.ID_Type : dataValues.ID_Type,
                  price : inputValues.price ? inputValues.price : dataValues.price,
                  newprice : inputValues.newprice ? inputValues.newprice : dataValues.newprice,
                  image : result.files[0].storedName
                })
            });
              if (!responseJson.ok) throw new Error('Lỗi khi gọi API');

            return true 
        } catch (error) {
            console.error('Lỗi khi cập nhập :', error);
            return false
        }
      };

      const updateType = async () => {

        try {
            const responseJson = await fetch(`${TYPES_API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Type_name : inputValues.Type_name ? inputValues.Type_name : dataValues.Type_name,
                })
            });
              if (!responseJson.ok) throw new Error('Lỗi khi gọi API');

            return true 
        } catch (error) {
            console.error('Lỗi khi cập nhập :', error);
            return false
        }
      };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await updateProduct() && type === 'product'){
            toast.success("Đã cập nhập mới.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            navigate("/admin/product");
        }
        else if (await updateType() && type === 'type'){
            toast.success("Đã cập nhập mới.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            navigate("/admin/type");
        }
        else{
            toast.error("Cập nhập thất bại.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };
    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <form onSubmit={handleSubmit} className="form">
                            <div>
                                {type === 'product' ?(
                                    <div>
                                        <div className="image">
                                            <p className="add_new_user">{titlee}</p>
                                            <img src={file ? URL.createObjectURL(file) : dataValues.image} alt="" />
                                        </div>
                                        <div className="form_inp">
                                            <label htmlFor="file">
                                                Upload: <FaRegImage className="file_icon" />
                                            </label>

                                            <input
                                                type="file"
                                                name="file"
                                                id="file"
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    
                                                    if (file && file.type.startsWith("image/")) {
                                                        setFile(file); // Nếu là tệp hình ảnh, đặt nó vào state
                                                    } else {
                                                        alert("Vui lòng chọn tệp hình ảnh!"); // Thông báo lỗi nếu không phải ảnh
                                                        e.target.value = null; // Xóa tệp đã chọn
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>):
                                        <div className="image">
                                            <p className="add_new_user">{titlee}</p>
                                        </div>
                                    }
                                <button type="submit" className="submit_btn">
                                    Thay đổi
                                </button>
                            </div>

                            <div className="input-group">
                            {inputTypes[type].map((input) => (
                                <div key={input.name}>
                                    <label htmlFor={input.name}>{input.placeholder} *</label>
                                    <input
                                        type={input.type}
                                        id={input.name}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={
                                            inputValues[input.name] !== undefined  ? inputValues[input.name] : dataValues[input.name]
                                        }
                                        onChange={handleInputChange}
                                        required={input.required}
                                    />
                                </div>
                                ))}
                            </div>

                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
