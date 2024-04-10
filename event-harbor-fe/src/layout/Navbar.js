import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand text-light">
                        <img src="" alt="Logo" width="30" height="24"
                             className="d-inline-block align-text-top d-none"/>
                        EventHarbor
                    </Link>
                    <div className="containter-fluid">
                        <Link className="btn btn-outline-light mx-2" to={"/users"}>Přehled uživatel</Link>
                        <Link className="btn btn-outline-light mx-2" to={"/task"}>Přehled úkolů</Link>
                        <Link className="btn btn-outline-light mx-2" to={"/logout"}>Odhlásit se</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;