import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../security/Api";
import {format} from 'date-fns';
import moment from "moment";

function EditTask(props) {
    let navigate = useNavigate();
    const userId = localStorage.getItem('loggedId')

    const params = useParams();
    const taskId = params.id;

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

    useEffect(() => {
        loadTask()
    }, []);

    const loadTask = async () => {
        const result = await api.get(`/task/${taskId}`)
        console.log(result.data)
        setTask(result.data);
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        await api.put(`/task/${taskId}`,task)
        navigate("/task");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Upravit úkol</h2>
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
                            <input type={"hidden"}
                                   className="form-control"
                                   name="userId"
                                   value={userId}
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
                                   value={moment(dueDate).format('YYYY-MM-DD')}
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
                                <option>Vyberte prioritu</option>
                                <option value="HIGH">1 - Vysoká</option>
                                <option value="MEDIUM">2 - Střední</option>
                                <option value="LOW">3 - Nízká</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Upravit úkol
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={"/task"}>
                            Zpět
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default EditTask;