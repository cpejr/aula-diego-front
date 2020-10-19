import React from "react";
import {Route, BrowserRouter} from "react-router-dom"
import Login from "./Pages/Login/Login"

const routes = () => {
    return(
        <BrowserRouter>
            <Route component = {Login} path = "/"/>
        </BrowserRouter>
    )   
}

export default routes;
