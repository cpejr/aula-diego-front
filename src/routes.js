import React from "react";
import {Route, BrowserRouter} from "react-router-dom"
import Login from "./Pages/Login/Login"
import Dashboard from "./Pages/Dashboard/index"

const routes = () => {
    return(
        <BrowserRouter>
            <Route component = {Dashboard} exat path="/dashboard"/>
            <Route component = {Login} exact path = "/"/>

        </BrowserRouter>
    )   
}

export default routes;
