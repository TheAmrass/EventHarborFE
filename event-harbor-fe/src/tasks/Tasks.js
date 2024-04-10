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
                        <th scope="col">Vytvořeno</th>
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
                                <td>{task.priority}</td>
                                <td>{moment(task.createdDate).format('DD.MM.YYYY')}</td>
                                <td>{moment(task.dueDate).format('DD.MM.YYYY')}</td>
                                <td className={task.completed ? "text-success fw-bold" : "text-danger fw-bold"}>{task.completed ? "Dokončeno" : "Zbývá dokončit"}</td>
                                <td>
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
            </div>
        </div>
    );
}

export default TaskList;