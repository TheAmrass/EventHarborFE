import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../security/Api";

function AddUser(props) {
    let navigate = useNavigate();

    const[user, setUser]=useState({
        name:"",
        password:"",
        email:"",
        registered: "",
        lastLogged: "",
        role: ""

    })

    const{name, password, email, passwordCheck, role, registered, lastLogged}=user;

    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})

    }

    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        const result = await api.get(`/user/${userId}`)
        setUser(result.data);
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        await api.put(`/user/${userId}`,user)
        navigate("/users");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Upravit uživatele</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Jméno
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte jméno"
                                   name="name"
                                   value={name}
                                   onChange={(e) => onInputChange(e)}
                                   required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte e-mail"
                                   name="email"
                                   value={email}
                                   onChange={(e) => onInputChange(e)}
                                   required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Heslo
                            </label>
                            <input type={"password"}
                                   className="form-control"
                                   placeholder="Zadejte heslo"
                                   name="password"
                                   onChange={(e) => onInputChange(e)}
                                   required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">
                                Role
                            </label>
                            <select
                                className="form-select"
                                name="role"
                                value={role}
                                onChange={(e)=> onInputChange(e)}
                                required
                            >
                                <option selected>Vyberte příslušnou roli</option>
                                <option value="USER">Uživatel</option>
                                <option value="MODERATOR">Moderátor</option>
                                <option value="ADMIN">Administrátor</option>
                            </select>
                        </div>
                            <button type="submit" className="btn btn-outline-primary">
                                Upravit účet
                            </button>
                            <Link className="btn btn-outline-danger mx-2" to={"/users"}>
                                Zpět
                            </Link>
                    </form>
                </div>
            </div>

        </div>
);
}

export default AddUser;