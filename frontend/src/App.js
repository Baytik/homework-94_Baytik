import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import {CssBaseline} from "@material-ui/core";
import EditUserProfile from "./Components/UserProfile/EditUserProfile";
import Profile from "./Components/Profile/Profile";

class App extends Component {
    render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Header/>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/edit/profile" component={EditUserProfile}/>
                </Switch>
            </div>
        )
    }
}

export default App;