import React, { useState, useEffect } from 'react';
import Main from './components/main';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ProductPage from './Routes/productPage';
import StoreCart from './Routes/cart';
import LoginPage from './Routes/login';
import SignUp from './components/signUp';
import Profile from './Routes/profile';
import Orders from './Routes/orders';
import Setting from './Routes/setting_changeProfile';
import ChangePassword from './Routes/setting_changePassword';
import UploadAvatar from './Routes/setting_uploadAvatar';
import Address from './Routes/address';
import CheckOut from './Routes/checkout';
import NavBar from './components/nav';
import OrdersInfo from './Routes/ordersInfo';
import NotFound from './Routes/notFound';

const Pages = () => {
    const [data, setData] = useState(null);
    const [removed, setRemoved] = useState(null)
    const [amount, setAmount] = useState(null)
    const [amount2, setAmount2] = useState(null)
    const [loginData, setLoginData] = useState(null)


    const setTheData = (Data) => {
        setData(Data)
    }
    const setTheRemove = (Data) => {
        setRemoved(Data)
    }
    const setTheAmount = (Data) => {
        setAmount(Data)
    }

    const loginState = (Data) => {
        setLoginData(Data)
    }


    const setTheAmountZero = () => {
        setAmount2(amount2 + 1)
    }


    return (
        <React.Fragment>


            <BrowserRouter>
                <NavBar removed={removed} amount2={amount2} amount={amount} Data={data} loginState={loginState} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="product" element={<ProductPage setTheRemove={setTheRemove} setTheAmount={setTheAmount} />} />
                    <Route path="cart" element={<StoreCart loginData={loginData} setTheRemove={setTheRemove} setTheAmount={setTheAmount} />} />
                    <Route path="login" element={<LoginPage setTheData={setTheData} Data />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="profile" element={loginData ? <Profile /> : <NotFound />} />
                    <Route path="orders" element={loginData ? <Orders /> : <NotFound />} />
                    <Route path="setting/changeProfile" element={loginData ? <Setting /> : <NotFound />} />
                    <Route path="setting/changePassword" element={loginData ? <ChangePassword /> : <NotFound />} />
                    <Route path="setting/uploadAvatar" element={loginData ? <UploadAvatar /> : <NotFound />} />
                    <Route path="address" element={loginData ? <Address /> : <NotFound />} />
                    <Route path="checkout" element={loginData ? <CheckOut setTheAmountZero={setTheAmountZero} /> : <NotFound />} />
                    <Route path="OrdersInfo" element={loginData ? <OrdersInfo /> : <NotFound />} />
                </Routes>
            </BrowserRouter>


        </React.Fragment>
    );

}
export default Pages;