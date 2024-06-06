import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../security/Api";
import {format} from 'date-fns';
import moment from "moment";
import Select from "react-select";

function EditTask(props) {
    let navigate = useNavigate();
    const userId = localStorage.getItem('loggedId');
    const [error, setError] = useState("");

    const params = useParams();
    const taskId = params.id;

    const [usersFromDb, setUsersFromDb] = useState([]); // Seznam uživatelů načtený z backendu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get("/users");
                setUsersFromDb(result.data);
            } catch (error) {
                console.error("Chyba při načítání uživatelů:", error);
            }
        };

        fetchData();
    }, []);

    const userIdAndName = usersFromDb.map(user => ({
        value: user.userId,
        label: user.name
    }));

    const[task, setTask]=useState({
        title:"",
        description:"",
        priority: "",
        dueDate:"",
        userIds:[],
        project:"",
        userId:""

    })

    const{title, description, dueDate, priority}=task;

    const onInputChange=(e)=>{
        setTask({...task, [e.target.name]:e.target.value})

    }

    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        loadTask()
    }, []);

    const loadTask = async () => {
        const result = await api.get(`/task/${taskId}`)
        console.log(result.data)
        setTask(result.data);
        const originalUserIdAndName = result.data.users.map(user => ({
            value: user.userId,
            label: user.name
        }));
        setSelectedUsers(originalUserIdAndName);
    }

    const onSubmit=async (e)=>{
        try{
            e.preventDefault();
            task.userIds = selectedUsers.map(user => user.value)
            task.userId = task.createdBy.userId;
            await api.put(`/task/${taskId}`,task)
            navigate("/task");
        }
        catch (error) {
            setError(
                <div className="alert alert-danger" role="alert">
                    Chyba při zadávání úkolu!
                </div>
            );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Upravit úkol</h2>
                    {error ? error : ""}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Název
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte název"
                                   name="title"
                                   value={title}
                                   onChange={(e) => onInputChange(e)}
                                   required
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
                                   required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Přidělení úkolu uživateli
                            </label>
                            <Select
                                isMulti
                                name="assignedTo"
                                options={userIdAndName}
                                value={selectedUsers}
                                className="basic-multi-select"
                                onChange={(choice) =>  setSelectedUsers(choice)}
                                classNamePrefix="select"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Přiřazení k projektu
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte projekt"
                                   name="project"
                                /*   value={project}
                                   onChange={(e) => onInputChange(e)}*/
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