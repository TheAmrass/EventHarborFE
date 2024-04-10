import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import api from "../security/Api";

function AddTask(props) {
    let navigate = useNavigate();
    const userId = localStorage.getItem('loggedId')

    const[task, setTask]=useState({
        title:"",
        description:"",
        priority: "",
        dueDate:"",

    })

    const{title, description, dueDate, priority}=task;

    const onInputChange=(e)=>{
        setTask({...task, [e.target.name]:e.target.value})

    }

    const onSubmit=async (e)=>{
        try {
            e.preventDefault();
            const response = await api.post(`/task/add/${userId}`, task);
            console.log("Úkol byl úspěšně přidán.", response.data);
        } catch (error) {
            console.error("Chyba při přidávání úkolu: ", error.response.data.message);
        }

        navigate("/task");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Přidat úkol</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Název
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte jméno"
                                   name="title"
                                   value={title}
                                   onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                                Popis úkolu
                            </label>
                            <div className="input-group">
                                <textarea className="form-control"
                                          aria-label="S textovým polem"
                                          placeholder="Zadejte popis úkolu"
                                          name="description"
                                          value={description}
                                          onChange={(e) => onInputChange(e)}></textarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DueDate" className="form-label">
                                Datum splnění
                            </label>
                            <input type={"date"}
                                   className="form-control"
                                   placeholder="Vyberte deadline"
                                   name="dueDate"
                                   value={dueDate}
                                   onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">
                                Priorita
                            </label>
                            <select
                                className="form-select"
                                name="priority"
                                value={priority}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option selected>Vyberte prioritu</option>
                                <option value="HIGH">1 - Vysoká</option>
                                <option value="MEDIUM">2 - Střední</option>
                                <option value="LOW">3 - Nízká</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Vytvořit úkol
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

export default AddTask;