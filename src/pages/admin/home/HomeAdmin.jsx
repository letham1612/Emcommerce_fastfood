import React from 'react';
import Chart from '../../../components/admin/Chart/Chart';
import ItemLists from '../../../components/admin/ItemLists/ItemLists';
import Navbar from '../../../components/admin/Navbar/Navbar';
import ProgressBar from '../../../components/admin/ProgressBar/ProgressBar';
import Sidebar from '../../../components/admin/Sidebar/Sidebar';
// import TableList from '../../../components/admin/TableList/TableList';
import './HomeAdmin.scss';

function HomeAdmin() {
    //
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" />
                    <ItemLists type="orders" />
                    <ItemLists type="products" />
                    <ItemLists type="balance" />
                </div>

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Revenue" />
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
