import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Category from "./Category"
import NotFound from './NotFound'
import Page from './Page'
import Karzina from "./Karzina"
import Oform from "./Oform"
import Delivery from "./Delivery"
import About from "./About";
export default class Routeuser extends React.Component{

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path="/home/category/:id" component={Category}/>
                    <Route path="/home/page/:id" component={Page}/>
                    <Route path="/home/shop" component={Karzina}/>
                    <Route path="/home/decor" component={Oform}/>
                    <Route path="/home/delivery" component={Delivery}/>
                    <Route path="/home/about" component={About}/>

                    <Route path="*" component={NotFound}/>
                </Switch>
            </main>

        );
    }
}

