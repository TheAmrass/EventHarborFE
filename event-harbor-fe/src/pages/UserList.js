import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function UserList(props) {

    const {id} = useParams();

    const[users,setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers =async ()=>{
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser=async(id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        await loadUsers()
    }

    return (
        <div className="container">
            <div className="py-4">
                <h1>Správa uživatel</h1>
                <Link className="btn btn-primary" to="/addUser">Přidat uživatele</Link>
            </div>
            <div className="py-4">
                <table className="table table-hover table-striped border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jméno</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Role</th>
                        <th scope="col">Datum registrace</th>
                        <th scope="col">Poslední přihlášení</th>
                        <th scope="col">Akce</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        users.map((user, index) => (

                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.registered}</td>
                                <td>{user.lastLogged}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2"
                                    to={`/viewuser/${user.id}`}>
                                        Detail
                                    </Link>
                                    <Link className="btn btn-outline-primary mx-2"
                                          to={`/edituser/${user.id}`}>
                                        Upravit
                                    </Link>
                                    <button className="btn btn-danger mx-2"
                                        onClick={()=>deleteUser(user.id)}>
                                        Odstranit
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;