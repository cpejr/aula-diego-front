import React, { useState } from 'react';

import './Burger.css';

export default function Burger() {

    const [status, setStatus] = useState(false);

    const handleClick = () => {

        if (status)
            closeMenu();
        else
            openMenu();
        setStatus(!status);
    }

    const openMenu = () => {
        const lines = document.querySelectorAll("div.menuBurger > div");
        lines[0].classList.add("top");
        lines[1].classList.add("middle");
        lines[2].classList.add("bottom");

        document.querySelector(".Sidebar").classList.add("active");
    }

    const closeMenu = () => {
        const lines = document.querySelectorAll("div.menuBurger > div");
        lines[0].classList.remove("top");
        lines[1].classList.remove("middle");
        lines[2].classList.remove("bottom");

        document.querySelector(".Sidebar").classList.remove("active");
    }

    return (
        <div className="menuBurger" onClick={handleClick}>
            <div />
            <div />
            <div />
        </div>
    );
}