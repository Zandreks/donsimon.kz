import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Category from "./components/Category"
import AddTovar from "./components/AddTovar"
import EditTovar from './components/EditTovar'
import Editcat from './components/Editcat'
import Zakas from './components/Zakas'
import Addcat from './components/AddCategory'
import Skid from "./components/Skidka"
import Users from "./components/Users";
export default class Routeuser extends React.Component{

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/admin' component={Home}/>
                    <Route exact path='/admin/category' component={Category}/>
                    <Route exact path='/admin/addtovar' component={AddTovar}/>
                    <Route exact path='/admin/edittovars/:id' component={EditTovar}/>
                    <Route exact path='/admin/addcat' component={Addcat}/>
                    <Route exact path='/admin/editcat/:id' component={Editcat}/>
                    <Route exact path='/admin/zakas' component={Zakas}/>
                    <Route exact path='/admin/skid' component={Skid}/>
                    <Route exact path='/admin/users' component={Users}/>


                    <Route path="*" component={NotFound}/>
                </Switch>
            </main>

        );
    }
}

