/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import ProductTable from '../../../components/admin/ProductTable/ProductTable';
import TypeTable from '../../../components/admin/TypeTable/TypeTable';
import Navbar from '../../../components/admin/Navbar/Navbar';
import Sidebar from '../../../components/admin/Sidebar/Sidebar';
import './lists.scss';
import UserTable from '../../../components/admin/UserTable/UserTable';

function Lists({ type }) {
    console.log(type)
    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */}
                <div className="data_table">
                    {type === 'product' || type === 'type'?
                        (<div className="btnn">
                            <Link
                                to={`/admin/${type}/addnew`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button type="button">Thêm  
                                    {type === 'product' ? (
                                        ' sản phẩm '
                                    ) : type === 'type' ? (
                                        ' loại sản phẩm '
                                    ) : ' '}
                                    Mới
                                </button>
                            </Link>
                        </div>):
                        <div></div>
                    }
                    {type === 'user' ? (
                        <UserTable />
                    ) : type === 'product' ? (
                        <ProductTable />
                    ) : type === 'type' ? (
                        <TypeTable />
                    ) : type === 'order' ? (
                        <ProductTable />
                    ) : null}
                    
                </div>
            </div>
        </div>
    );
}

export default Lists;
