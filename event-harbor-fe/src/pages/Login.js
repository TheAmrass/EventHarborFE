import React, {useEffect, useState} from 'react';
import api from "../security/Api";
import {useForm} from 'react-hook-form';



function Login() {

    const[error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit=async (e)=>{
        try {
            e.preventDefault();
            console.log(formData);
            const response = await api.post("/auth/authenticate", formData);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('loggedId', response.data.logged_id);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role)
            console.log("Uživatel byl úspěšně přihlášen. Token: ", localStorage.getItem('token'), "UserId:", localStorage.getItem('loggedId'), "Role: ", localStorage.getItem('role'));
            window.location.reload();
        } catch (error) {
            console.error("Přihlášení se nezdařilo: ", error.response.data.message);
            setError(
                <div className="alert alert-danger" role="alert">
                    Zadané údaje jsou neplatné!
                </div>
            )
        }
    }


    return (
        <div className="container col-4">
            <h2>Přihlášení</h2>
            {error ? error : ""}
            <form onSubmit={handleSubmit} className=" mx-auto">
                <div className="form-group mt-3">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Zadejte e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Heslo</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Zadejte heslo"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Přihlásit se
                </button>
            </form>
        </div>
    );
}

export default Login;
