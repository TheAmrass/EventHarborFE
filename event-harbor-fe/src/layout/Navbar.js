import React from 'react';
import {Link} from "react-router-dom";
import RolesAuthContent from "../security/RolesAuthContent";

const Navbar = () => {

    const userName = localStorage.getItem('username');

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <div className="col-3">
                        <Link to={"/"} className="navbar-brand text-light">
                            <img src="" alt="Logo" width="30" height="24"
                                 className="d-inline-block align-text-top d-none"/>
                            EventHarbor
                        </Link>
                    </div>
                    <div className="containter-fluid mx-auto col-6">
                        <RolesAuthContent allowedRoles={['ADMIN']}>
                            <Link className="btn btn-outline-light mx-2" to={"/users"}>Přehled uživatel</Link>
                        </RolesAuthContent>
                        <Link className="btn btn-outline-light mx-2" to={"/task"}>Přehled úkolů</Link>
                        <Link className="btn btn-outline-light mx-2" to={"/project"}>Přehled projektů</Link>
                    </div>
                    <div className="col-3">
                        <span className="text-light">Přihlášen: {userName}</span>
                        <Link className="btn btn-danger mx-2" to={"/logout"}>Odhlásit se</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;