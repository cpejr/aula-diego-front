import React from "react";
import {Route, BrowserRouter} from "react-router-dom"
import Login from "./Pages/Login/Login"
import Dashboard from "./Pages/Dashboard/index"
import Live from "./Pages/Live/Live"
import Admin from "./Pages/Admin/Admin";


const routes = () => {
    return(
        <BrowserRouter>
            <Route component = {Dashboard} exat path="/dashboard"/>
            <Route component = {Login} exact path = "/"/>
            <Route component = {Live} exact path = "/live"/>
<<<<<<< HEAD
=======
            <Route component={Admin} exact path='/admin'/> 

>>>>>>> 785a501085ddcfdc0dedfed7fc393ff171d26842
        </BrowserRouter>
    )   
}

export default routes;
