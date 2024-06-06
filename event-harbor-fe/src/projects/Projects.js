import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../security/Api";
import moment from "moment/moment";
import AddProject from "./AddProject";
import RolesAuthRoute from "../security/RolesAuthRoute";
import RolesAuthContent from "../security/RolesAuthContent";

function ProjectList(props) {

    const userId = localStorage.getItem('loggedId');

    const[projects,setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects =async ()=>{
        const result = await api.get(`project/user/${userId}`);
        setProjects(result.data);
    };

    const deleteProject=async(projectId)=>{
        await api.delete(`/project/${projectId}`)
        await loadProjects()
    }


    return (
        <div className="container">
            <div className="py-4">
                <h1>Přehled projektů</h1>
                <RolesAuthContent allowedRoles={['MODERATOR']}>{<Link className="btn btn-primary" to="../project/add">Přidat projekt</Link>}</RolesAuthContent>
            </div>
            <div className="py-4">
                <table className="table table-hover table-striped border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Datum</th>
                        <th scope="col">Název</th>
                        <th scope="col">Popis</th>
                    </tr>
                    </thead>
                    <tbody>

                    {



                        projects.map((project, index) => (


                            <tr>
                                <td>{moment(project.projectDate).format('DD.MM.YYYY')}</td>
                                <td><b>{project.title}</b></td>
                                <td>{project.notes}</td>
                                <td className="col-4">
                                    <Link className="btn btn-primary mx-2"
                                          to={`../project/view/${project.projectId}`}>
                                        Detail
                                    </Link>
                                    <RolesAuthContent allowedRoles={['MODERATOR']}>
                                    <Link className="btn btn-outline-primary mx-2"
                                          to={`../project/edit/${project.projectId}`}>
                                        Upravit
                                    </Link>
                                    <button className="btn btn-danger mx-2"
                                            onClick={() => deleteProject(project.projectId)}>
                                        Odstranit
                                    </button>
                                    </RolesAuthContent>
                                </td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ProjectList;