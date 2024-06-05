import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./layout/Navbar";
import UserList from "./users/UserList";
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import React from "react";
import Login from "./pages/Login";
import AuthProvider from "./security/AuthProvider";
import NavbarLoggedOut from "./layout/NavbarLoggedOut";
import Logout from "./users/Logout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./tasks/Tasks";
import ViewTask from "./tasks/ViewTask";
import AddTask from "./tasks/AddTask";
import EditTask from "./tasks/EditTask";
import Projects from "./projects/Projects";
import AddProject from "./projects/AddProject";
import ViewProject from "./projects/ViewProject";
import EditProject from "./projects/EditProject";


const NotFound = () => <h1>Stránka nenalezena</h1>;

const auth = localStorage.getItem('token');
function PrivateOutlet() {
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
        <Router>
            <AuthProvider/>
            {auth ? <Navbar/> : <NavbarLoggedOut/>}
            <Routes>
                <Route path="/" element={auth ? <Dashboard/> : <Login/>} />
                <Route path="*" element={<NotFound/>} />
                <Route exact path="/logout" element={<Logout/>} />

                <Route path="/users" element={<PrivateOutlet/>}>
                    <Route exact path="" element={<UserList/>} />
                    <Route exact path="/users/addUser" element={<AddUser/>} />
                    <Route exact path="/users/edit/:id" element={<EditUser/>}/>
                    <Route exact path="/users/view/:id" element={<ViewUser/>} />
                </Route>
                <Route path="/task" element={<PrivateOutlet/>}>
                    <Route exact path="" element={<Tasks/>} />
                    <Route exact path="/task/add" element={<AddTask/>} />
                    <Route exact path="/task/edit/:id" element={<EditTask/>} />
                    <Route exact path="/task/view/:id" element={<ViewTask/>} />
                </Route>
                <Route path="/project" element={<PrivateOutlet/>}>
                    <Route exact path="" element={<Projects/>} />
                    <Route exact path="/project/add" element={<AddProject/>} />
                    <Route exact path="/project/edit/:id" element={<EditProject/>} />
                    <Route exact path="/project/view/:id" element={<ViewProject/>} />
                </Route>
            </Routes>
        </Router>
    </div>
  );


}

export default App;
