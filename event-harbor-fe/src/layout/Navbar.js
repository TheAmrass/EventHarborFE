import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand text-light" >
                      <img src="" alt="Logo" width="30" height="24"
                             className="d-inline-block align-text-top d-none" />
                        EventHarbor
                    </Link>
                    <button className="btn btn-outline-light">Přihlásit se</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;