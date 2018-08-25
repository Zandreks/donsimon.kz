import React from 'react'
import {NavLink , Link } from 'react-router-dom'
import axios from "axios";
import Listheader from "./Listheader";
import ListKorzin from "./ListKorzin";
export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {search:'',array:[],data:[],korzin:this.props.non, drop:false };
        this.list= this.list.bind(this)
        this.drop = this.drop.bind(this)
        this.funcarr = this.funcarr.bind(this)
        this.sena  = this.sena.bind(this)
        this.listtovars = this.listtovars.bind(this)
    }

    list(){
            const list = this.state.data.map(number=>

                <a key={number.id}  href={`/home/category/${number.id}`} className="dropdown-item hidemnu"> {number.title} </a>

            )
            return list
    }
    drop(){
        if (this.state.korzin === false){
            return false
        }
        this.setState({
            drop:!this.state.drop
        })
        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"))
            this.setState({
                array: returnObj,
            })

        }
    }
    listtovars(){
        if (this.state.array.length>0){
            return(

                         this.state.array.sort(function (a, b) {
                            if (a.id > b.id) {
                                return 1;
                            }
                            if (a.id < b.id) {
                                return -1;
                            }
                            // a должно быть равным b
                            return 0;
                        }).map((number) =>
                            <Listheader key={ number.id} number={number} funcarr={this.funcarr} sena={this.sena} />
                        )
            )
        }else {
            return(
                <h3 className="text-center pt-2 pb-3 m-0">Корзина пуста</h3>
            )
        }
    }

    componentDidMount(){
        axios.post('/home')
            .then((response)=> {
                this.setState({
                    data:response.data
                })
            })
            .catch( (error)=> {
                this.forceUpdate();

                console.log(error);
            })
            .then(function () {
                // always executed
            });


        $(function () {
            $('[data-toggle="popover"]').popover({
                html : true,
                content: function() {
                    return $("#list").html();
                }
            })
        })





    }
    funcarr(obj){
        this.props.funcarr(obj)
    }
    sena(){
        this.props.sena()
    }

    render(){

        return(

            <header>

                <div className=''>
                    <div className=" ">
                        <nav className="navbar  fixed-top pl-0 pb-0 pt-0 pr-0 menu navbar-expand-lg navbar-light" id='menu-top'>

                            <div className='container'>
                                <NavLink className="navbar-brand ml-3" activeClassName='active' to="/home">
                                    <img src="/img/vdf-logo.png" />
                                </NavLink>

                                <button className={`navbar-toggler  `} type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className={`collapse navbar-collapse `}  id="navbarSupportedContent">

                                    <ul className="navbar-nav  abs-center-x ">
                                        <li className="nav-item  " >
                                            <NavLink exact   className="nav-link hidemnu" activeClassName='active' to="/home">Главная </NavLink >
                                        </li>
                                        <li className="nav-item padingm dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Каталог
                                            </a>
                                            <div className="dropdown-menu dropmenu" aria-labelledby="navbarDropdown">
                                                {this.list()}
                                            </div>
                                        </li>


                                        <li className="nav-item padingm">
                                            <NavLink className="nav-link hidemnu" activeClassName='active' to="/home/delivery">Доставка</NavLink>
                                        </li>


                                    </ul>
                                    <ul className="navbar-nav ml-auto noclose ">
                                        <div className="btn-group korzinanav"  >
                                            <div className="korzinka">

                                                <Link className='linkto' to={'/home/shop'}> <img src="/img/корзинка.png" alt=""/> </Link>
                                                <div className="sena "  >
                                                    <p className="text-center" onClick={this.drop}><span className="senanv">{this.props.fulsena}тг. </span>
                                                        <br/>
                                                         Товаров: {this.props.valtovar} <img src="/img/strelka.png" alt=""/>
                                                    </p>
                                                    <div className={(this.state.drop === true)?"dropdown-menu show headspisol":"drophide"} >
                                                        {(this.state.drop === true)?this.listtovars():<h3>Корзина пуста</h3>}
                                                        <div className="">
                                                            <div className="col-12 fulltexthead">
                                                                Сумма заказа: <span className='fullsenahead '>{this.props.fulsena}тг.</span>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>

                                    </ul>



                                </div>
                            </div>

                        </nav>



                    </div>

                </div>
            <div id="list">
                {this.list()}
            </div>


            </header>


        )
    }
}

