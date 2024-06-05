import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import api from "../security/Api";
import Select from "react-select";

function AddProject(props) {
    let navigate = useNavigate();
    const userId = localStorage.getItem('loggedId')

    const[project, setProject]=useState({
        title:"",
        notes:"",
        tasks:"",
        projectDate:"",
        userIds:[]

    })

    const{title, notes, tasks, projectDate, userIds}=project;

    const onInputChange=(e)=>{
        setProject({...project, [e.target.name]:e.target.value})

    };

    const [users, setUsers] = useState([]); // Seznam uživatelů načtený z backendu
    const [selectedUsers, setSelectedUsers] = useState([]); // Vybraní uživatelé

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get("/users");
                setUsers(result.data);
            } catch (error) {
                console.error("Chyba při načítání uživatelů:", error);
            }
        };

        fetchData();
    }, []);


    const userIdAndName = users.map(user => ({
        value: user.userId,
        label: user.name
    }));


    const onSubmit=async (e)=>{
        try {
            e.preventDefault();
            project.userIds = selectedUsers.map(user => user.value);
            console.log(project)
            const response = await api.post(`/project/add/${userId}`, project);
            console.log("Projekt byl úspěšně přidán.", response.data);
        } catch (error) {
            console.error("Chyba při přidávání projektu: ", error.response.data.message);
        }

        navigate("/project");
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Přidat projekt</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Název
                            </label>
                            <input type={"text"}
                                   className="form-control"
                                   placeholder="Zadejte název projektu"
                                   name="title"
                                   value={title}
                                   onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                                Popis projektu
                            </label>
                            <div className="input-group">
                                <textarea className="form-control"
                                          aria-label="S textovým polem"
                                          placeholder="Zadejte popis úkolu"
                                          name="notes"
                                          value={notes}
                                          onChange={(e) => onInputChange(e)}></textarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DueDate" className="form-label">
                                Datum projektu
                            </label>
                            <input type={"date"}
                                   className="form-control"
                                   placeholder="Vyberte deadline"
                                   name="projectDate"
                                   value={projectDate}
                                   onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Přidělení projektu uživateli
                            </label>
                            <Select
                                isMulti
                                name="assignedTo"
                                options={userIdAndName}
                                className="basic-multi-select"
                                onChange={(choice) => setSelectedUsers(choice)}
                                classNamePrefix="select"
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Vytvořit projekt
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={"/project"}>
                            Zpět
                        </Link>
                    </form>
                </div>
            </div>

        </div>
    );
    }

    export default AddProject;