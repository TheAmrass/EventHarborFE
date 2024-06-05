import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../security/Api";

function ViewTask(props) {

    const[task, setTask]=useState({
        title:"",
        description:"",
        createdDate:"",
        dueDate:"",
        completed:"",
        users:[]

    })

    const params = useParams();
    const taskId = params.id;
    console.log("Task ID: " + taskId)

    useEffect(() => {
        loadTask()
    }, []);

    const loadTask = async () => {
        const result = await api.get(`/task/${taskId}`)
        console.log(result.data)
        setTask(result.data);
    }

    console.log(task)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Detail úkolu</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail úkolu s id: {taskId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Název: </b>
                                    {task.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Detail: </b>
                                    {task.description}
                                </li>
                                <li className="list-group-item">
                                    <b>Vytvořen: </b>
                                    {task.createdDate}
                                </li>
                                <li className="list-group-item">
                                    <b>Deadline: </b>
                                    {task.dueDate}
                                </li>
                                <li className="list-group-item">
                                    <b>Přidělení uživatelé: </b>
                                   {task.users.map((user, index) => (
                                        <span key={user.userId}>
                                            {user.name}
                                            {index !== task.users.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </li>
                                <li className="list-group-item">
                                    <b>Dokončeno: </b>
                                    {task.completed ? "ANO" : "NE"}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/"} className={"btn btn-primary my-2"}>Zpět na seznam úkolů</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewTask;