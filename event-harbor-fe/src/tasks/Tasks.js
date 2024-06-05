import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../security/Api";
import moment from "moment/moment";

function TaskList(props) {

    const userId = localStorage.getItem('loggedId');

    const[tasks,setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks =async ()=>{
        const result = await api.get(`tasks/${userId}`);
        setTasks(result.data);
    };

    const deleteTask=async(taskId)=>{
        await api.delete(`/task/${taskId}`)
        await loadTasks()
    }

    const completeTask=async(taskId)=>{
        await api.put(`/task/complete/${taskId}`)
        await loadTasks()
    }

    const valueMap = {
        'LOW': 3,
        'MEDIUM': 2,
        'HIGH': 1,
    };

    return (
        <div className="container">
            <div className="py-4">
                <h1>Přehled úkolů</h1>
                <Link className="btn btn-primary" to="../task/add">Přidat úkol</Link>
            </div>
            <div className="py-4">
                <table className="table table-hover table-striped border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Název</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Priorita</th>
                        <th scope="col">Projekt</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Splněno</th>
                    </tr>
                    </thead>
                    <tbody>

                    {



                        tasks.map((task, index) => (


                            <tr>
                                <td><b>{task.title}</b></td>
                                <td>{task.description}</td>
                                <td>{valueMap[task.priority]}</td>
                                <td>
                                    {task.project ? (
                                        <Link to={"../project/view/" + task.project.projectId}>
                                            {task.project.title}
                                        </Link>
                                    ) : (
                                        <i>Bez projektu</i>
                                    )}
                                </td>
                                <td>{moment(task.dueDate).format('DD.MM.YYYY')}</td>
                                <td className={task.completed ? "text-success fw-bold" : "text-danger fw-bold"}>{task.completed ? "Dokončeno" : "Zbývá dokončit"}</td>
                                <td className="col-4">
                                    <button className="btn btn-success mx-2"
                                            onClick={() => completeTask(task.taskId)}>
                                        {task.completed ? "X" : "✓"}
                                    </button>
                                    <Link className="btn btn-primary mx-2"
                                          to={`../task/view/${task.taskId}`}>
                                        Detail
                                    </Link>
                                    <Link className="btn btn-outline-primary mx-2"
                                          to={`../task/edit/${task.taskId}`}>
                                        Upravit
                                    </Link>
                                    <button className="btn btn-danger mx-2"
                                            onClick={() => deleteTask(task.taskId)}>
                                        Odstranit
                                    </button>
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

export default TaskList;