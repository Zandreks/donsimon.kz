import React from 'react'
import Routeuser from './Routeuser'
import "jquery/dist/jquery"
import 'bootstrap/dist/css/bootstrap.css';
import "./css/style.css"
import Header from "./components/Header"

export default class App extends React.Component {

    render() {
        return (
            <div className="wraper">
                <Header/>

                <Routeuser/>
            </div>

        );
    }
}

