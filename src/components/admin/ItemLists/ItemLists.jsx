import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaDollarSign, FaMoneyBill } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';
import './itemlists.scss';

function ItemLists({ type }) {
    let data;

    // Dynamically change the UI content based on the `type` prop
    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                count: 232,
                icon: (
                    <FaUser
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/users',
            };
            break;
        case 'orders':
            data = {
                title: 'ORDERS',
                isMoney: false,
                count: 34,
                icon: (
                    <FaShoppingCart
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'View all orders',
                linkto: '/orders',
            };
            break;
        case 'products':
            data = {
                title: 'PRODUCTS',
                isMoney: true,
                count: 107,
                icon: (
                    <FaDollarSign
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all products',
                linkto: '/products',
            };
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                count: 444,
                isMoney: true,
                icon: (
                    <FaMoneyBill
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all details',
                linkto: '/',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                <span className="percentage positive">
                    <AiOutlineArrowUp />
                    20 %
                </span>
            </div>

            <div className="counts">
                {data.isMoney && <FaDollarSign />}
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
