import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../security/Api";

function ViewProject(props) {

    const[project, setProject]=useState({
        title:"",
        notes:"",
        tasks:"",
        projectDate:"",
        users:[],
        createdBy:""

    })

    const params = useParams();
    const projectId = params.id;
    console.log("Project ID: " + projectId)

    useEffect(() => {
        loadProject()
    }, []);

    const loadProject = async () => {
        const result = await api.get(`/project/${projectId}`)
        console.log(result.data)
        setProject(result.data);
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Detail projektu</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail projektu s id: {projectId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název: </b>
                                    {project.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Detail: </b>
                                    {project.notes}
                                </li>
                                <li className="list-group-item">
                                    <b>Termín projektu: </b>
                                    {project.projectDate}
                                </li>
                                <li className="list-group-item">
                                    <b>Vytvořil: </b>
                                    {project.createdBy.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Přidělení uživatelé: </b>
                                    {project.users.map((user, index) => (
                                        <span key={user.userId}>
                                            {user.name}
                                            {index !== project.users.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/project"} className={"btn btn-primary my-2"}>Zpět na seznam projektů</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewProject;