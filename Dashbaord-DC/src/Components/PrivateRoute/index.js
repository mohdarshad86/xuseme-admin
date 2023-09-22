import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

export default function PrivateRoute({ component: Component, path, ...rest }) {
    const navigate = useNavigate();

    const handleLoading = () => {
        let userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        console.log("userInfo", userInfo);
        if (!userInfo?.token) navigate('/');
    }
    useEffect(() => {
        handleLoading()
        // eslint-disable-next-line
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />
            }}
        />
    );
}