import React, {useEffect, useState} from 'react';
import {Link, useAsyncError, useNavigate, useParams} from "react-router-dom";
import api from "../security/Api";
import {format} from 'date-fns';
import moment from "moment";
import Select from "react-select";

function EditProject(props) {
    let navigate = useNavigate();

    const params = useParams();
    const projectId = params.id;

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

    const[project, setProject]=useState({
        title:"",
        notes:"",
        tasks:"",
        projectDate:"",
        userIds:[],
        createdBy:""

    })

    const{title, notes, tasks, projectDate,userIds,createdBy}=project;
     const onInputChange=(e)=>{
        setProject({...project, [e.target.name]:e.target.value})

    }

    const [selectedUsers, setSelectedUsers] = useState([]);


    const loadProject = async () => {
        const result = await api.get(`/project/${projectId}`);
        setProject(result.data);
        const originalUserIdAndName = result.data.users.map(user => ({
            value: user.userId,
            label: user.name
        }));
        setSelectedUsers(originalUserIdAndName);
    }

    useEffect(() =>{
        loadProject();
        //setSelectedUsers(originalUserIdAndName);

    }, []);

    const onSubmit=async (e)=>{
        e.preventDefault();
        project.userIds = selectedUsers.map(user => user.value);
        project.createdBy = project.createdBy.userId;
        console.log(project);
        await api.put(`/project/${projectId}`,project)
        navigate("/project");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Upravit projekt</h2>
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
                                   required
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
                                          onChange={(e) => onInputChange(e)}>
                                </textarea>
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
                                   value={moment(projectDate).format('YYYY-MM-DD')}
                                   onChange={(e) => onInputChange(e)}
                                   required
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
                                value={selectedUsers}
                                className="basic-multi-select"
                                onChange={(choice) =>  setSelectedUsers(choice)}
                                classNamePrefix="select"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Upravit projekt
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

export default EditProject;