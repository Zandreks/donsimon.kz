import React from "react"
import {NavLink , Link } from 'react-router-dom'
import axios from "axios";

export default class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {search:'' , data:[]};
        this.search = this.search.bind(this)
        this.list= this.list.bind(this)
        this.ser=this.ser.bind(this)
    }

    search(e){
        this.setState({
            search: e.target.value
        });
            $('#ser').popover('show')
            $('#ser').popover('update')
            if (this.state.search===''){
                $('#ser').popover('hide')
            }

        this.ser(this.state.search)


    }
    ser(str){
        axios.post('/ser', {
            ser: str
        })
            .then((response)=> {
                this.setState({
                    data: response.data
                })
            })
            .catch( (error)=> {

                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    list(){
        if (this.state.data.length>0){
            let list = this.state.data.map(number=>
                <div key={number.id}>
                    <Link  to={`/admin/edittovars/${number.id}`}> {number.title} </Link>
                </div>
            )
            return list
        }else {
            return(
                <p>Ничего не найдено</p>
            )
        }

    }
    componentDidMount() {

        $(()=> {
            $('[data-toggle="popover"]').popover({
                html: true,
                content: function () {
                    return $("#list").html();
                }
            })
        })
    }


        render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                    <NavLink exact   className="navbar-brand" activeClassName='active' to="/admin">Админ панель </NavLink >
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <NavLink exact   className="nav-link" activeClassName='active' to="/admin">Главная </NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/category">Список категории </NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/addcat">Добавить категорию </NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/addtovar">Добавить товар </NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/zakas">Список заказов</NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/skid">Изменить скидку</NavLink >
                            </li>
                            <li className="nav-item ">
                                <NavLink  className="nav-link" activeClassName='active' to="/admin/users">Пользователи</NavLink >
                            </li>


                            <li className="nav-item ">
                                <a href='/logout'  className="nav-link" >Выход </a >
                            </li>







                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control" type="search" id="ser"  data-container="body" data-toggle="popover"  data-placement="bottom"   onChange={this.search} value={this.state.search} placeholder="Поиск" aria-label="Search"/>

                        </form>
                    </div>
                </nav>
                <div id="list">
                    {this.list()}
                </div>
            </header>
        );
    }
}