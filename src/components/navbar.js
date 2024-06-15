import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
<nav>
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/portfolio">Portfolio</Link></li>
    <li><Link to="/txhistory">Transaction History</Link></li>
    </ul>
</nav>

)
