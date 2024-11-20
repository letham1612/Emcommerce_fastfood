/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { FaRegImage } from "react-icons/fa6";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../../components/admin/Navbar/Navbar';
import Sidebar from '../../../components/admin/Sidebar/Sidebar';
import logo from '../../../assets/logo.png';
import './New.scss';
import {inputTypes} from './Input'
import { toast } from "react-toastify";
import { PRODUCTS_API, PRODUCT_IMAGE_API, IMAGE_URL, TYPES_API } from '../../../config/ApiConfig';


function AddNew({ titlee, type }) {
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const createProduct = async () => {
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
            console.log('Kết quả:', result.files[0].storedName);
    
            // if (result.files) {
            //     alert('Upload thành công! Đường dẫn file: ' + result.files.map(file => file.path).join(', '));
            // }

            const responseJson = await fetch(PRODUCTS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ID_Type: inputValues.ID_Type,
                    name: inputValues.name,
                    description: inputValues.description,
                    price: inputValues.price,
                    image: result.files[0].storedName
                })
            });
            if (!responseJson.ok) throw new Error('Lỗi khi gọi API');

            return true 
        } catch (error) {
            console.error('Lỗi khi cập nhập :', error);
            return false
        }
      };

      const createType = async () => {
        try {
            const responseJson = await fetch(TYPES_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Type_name: inputValues.Type_name,
                })
            });
            if (!responseJson.ok) throw new Error('Lỗi khi gọi API');

            return true 
        } catch (error) {
            console.error('Lỗi khi cập nhập :', error);
            return false
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === 'product')
        {if (await createProduct()){
            toast.success("Thêm mới thành công.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            navigate("/admin/product");
        
        }else{
            toast.error("Thêm mới thất bại.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }}
        if(type === 'type')
        {if (await createType()){
            toast.success("Thêm mới thành công.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            navigate("/admin/type");
        }else{
            toast.error("Thêm mới thất bại.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }}

        
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
                                            <img src={file ? URL.createObjectURL(file) : logo} alt="" />
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
                                    Thêm mới
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
                                        value={inputValues[input.name] || ''}
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

export default AddNew;
