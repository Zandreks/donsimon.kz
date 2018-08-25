import React from 'react'
import InputMask from 'react-input-mask';
import axios from "axios";
import Listofrml from "./Listofrml";
import Header from "./Header";
import {NavLink} from "react-router-dom";
import Sllider2 from "./component/Sllider2";
export default class Oform extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            data:[],
            name:'',
            erorrname:'',
            isvalidname:'',
            clasname:'',
            lasname:'',
            erorrlastename:'',
            isvalidlastname:'',
            claslastname:'',
            email:'',
            erorremail:'',
            isvalidemail:'',
            clasemil:'',
            phone:'',
            erorrphone:'',
            isvalidphone:'',
            clasphone:'',
            city:'',
            erorrcity:'',
            isvalidcity:'',
            clascity:'',
            adres:'',
            erorradres:'',
            isvalidadres:'',
            clasadrs:'',
            valtovar:0,
            reg:'',
            spisoktovar:[],
        };
        this.datakarin = this.datakarin.bind(this)
        this.onchangename = this.onchangename.bind(this)
        this.onchangelastname = this.onchangelastname.bind(this)
        this.onchangephone = this.onchangephone.bind(this)
        this.onchangeemail = this.onchangeemail.bind(this)
        this.onchangecity = this.onchangecity.bind(this)
        this.onchangeadres = this.onchangeadres.bind(this)
        this.formoplata = this.formoplata.bind(this)
        this.onchangereg = this.onchangereg.bind(this)
        if (Number(this.props.location.state.sena) ===0){
            window.location.replace("/home/shop")
        }



    }
    datakarin(){
        let data = this.state.array.sort(function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        }).map((number) =><Listofrml key={number.id} id={number.id} val={number.value} option={number.option}/>)
        return data
    }

    componentDidMount() {
        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"))
            this.setState({
                array: this.state.array.concat(returnObj),
                valtovar: returnObj.length

            })

        }
        {document.body.scrollTop = document.documentElement.scrollTop = 0}
        let fulspisok="";
        setTimeout(()=>{
            for (let i=0; i<this.state.array.length;i++){
                axios.post('/tovar', {
                    id: this.state.array[i].id
                })
                    .then((response)=> {

                        fulspisok = (this.state.array[i].option ==='ed')? response.data.title + " количество "+ this.state.array[i].value +" едениц по цене "+ response.data.sena+" тг": response.data.title + " количество "+  this.state.array[i].value +" упаковак по цене "+ response.data.sena2 *response.data.kolichestvo+" тг"
                        this.setState({
                            spisoktovar:this.state.spisoktovar.concat(fulspisok)
                        })
                    })
                    .catch( (error)=> {

                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });

            }

        },1000)

    }

    onchangereg(e){
        let str = e.target.value
        this.setState({
            reg: str,
        })

        }



    onchangephone(e){
        let str = e.target.value;
        let phone = str.replace(/\D+/g,'')
        if (phone.length<11){
            this.setState({
                phone: phone,
                isvalidphone:"is-invalid",
                clasphone:'invalid-feedback',
                erorrphone:"Поле введено не коректно"

            })
        }else {
            this.setState({
                phone: phone,
                isvalidphone:"is-valid",
                clasphone:'valid-feedback',
                erorrphone:"Поле введено коректно"

            })
        }
    }
    onchangelastname(e){
        let str = e.target.value;
        let lastname = str.replace(/\s/g, '')
        if (lastname.length<3){
            this.setState({
                lasname: lastname,
                isvalidlastname:"is-invalid",
                claslastname:'invalid-feedback',
                erorrlastename:"Поле введено не коректно"

            })
        }else {
            this.setState({
                lasname: lastname,
                isvalidlastname:"is-valid",
                claslastname:'valid-feedback',
                erorrlastename:"Поле введено коректно"

            })
        }
    }
    onchangeemail(e){
        let str = e.target.value;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let email = str.replace(/\s/g, '')
        if (reg.test(email) ===false){
            this.setState({
                email: email,
                isvalidemail:"is-invalid",
                clasemil:'invalid-feedback',
                erorremail:"Поле введено не коректно"

            })
        }else {
            this.setState({
                email: email,
                isvalidemail:"is-valid",
                clasemil:'valid-feedback',
                erorremail:"Поле введено коректно"

            })
        }
    }
    onchangecity(e){
        let city = e.target.value;
        if (city.length<3){
            this.setState({
                city: city,
                isvalidcity:"is-invalid",
                clascity:'invalid-feedback',
                erorrcity:"Поле введено не коректно"

            })
        }else {
            this.setState({
                city: city,
                isvalidcity:"is-valid",
                clascity:'valid-feedback',
                erorrcity:"Поле введено коректно"

            })
        }
    }
    onchangeadres(e){
        let adres = e.target.value;
        if (adres.length<3){
            this.setState({
                adres: adres,
                isvalidadres:"is-invalid",
                clasadrs:'invalid-feedback',
                erorradres:"Поле введено не коректно"

            })
        }else {
            this.setState({
                adres: adres,
                isvalidadres:"is-valid",
                clasadrs:'valid-feedback',
                erorradres:"Поле введено коректно"

            })
        }
    }
    onchangename(e){
        let str = e.target.value;
        let name = str.replace(/\s/g, '')
        if (name.length<3){
            this.setState({
                name: name,
                isvalidname:"is-invalid",
                clasname:'invalid-feedback',
                erorrname:"Поле введено не коректно"

            })
        }else {
            this.setState({
                name: name,
                isvalidname:"is-valid",
                clasname:'valid-feedback',
                erorrname:"Поле введено коректно"

            })
        }
    }

    formoplata(e){
        e.preventDefault()

       if (this.state.name.length<3){

            this.setState({
                isvalidname:"is-invalid",
                clasname:'invalid-feedback',
                erorrname:"Поле введено не коректно"

            })
            return false
        }
        if (this.state.lasname.length<3){
            this.setState({
                isvalidlastname:"is-invalid",
                claslastname:'invalid-feedback',
                erorrlastename:"Поле введено не коректно"

            })
            return false
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(this.state.email) ===false){
            this.setState({
                isvalidemail:"is-invalid",
                clasemil:'invalid-feedback',
                erorremail:"Поле введено не коректно"

            })
            return false
        }
        if (this.state.phone.length<11){
            this.setState({
                isvalidphone:"is-invalid",
                clasphone:'invalid-feedback',
                erorrphone:"Поле введено не коректно"


            })
            return false
        }
        if (this.state.city.length<3){
            this.setState({
                isvalidcity:"is-invalid",
                clascity:'invalid-feedback',
                erorrcity:"Поле введено не коректно"

            })
            return false
        }
        if (this.state.adres.length<3){
            this.setState({
                isvalidadres:"is-invalid",
                clasadrs:'invalid-feedback',
                erorradres:"Поле введено не коректно"

            })
            return false
        }



        console.log()

        const datapay ={
            name:this.state.name,
            lastname:this.state.lasname,
            email: this.state.email,
            phone: this.state.phone,
            reg: this.state.reg,
            city: this.state.city,
            amount:this.props.location.state.sena,
            adres: this.state.adres,
            tovars:this.state.spisoktovar.join(', ')
        }
        axios.post('/savepay', datapay)
            .then((response)=> {
                if (response.data === "ok"){
                    window.location.replace("/pay");
                }
            })
            .catch( (error)=> {
                this.forceUpdate();

                console.log(error);
            })
            .then(function () {
                // always executed
            });





    }
    render() {

        return (

            <section className="content">
                <Header  valtovar={this.state.valtovar} non={false} fulsena={this.props.location.state.sena}/>
                <div className="container content-fon over pt-3">
                    <div className=" inputgrp text-center ">
                        <div className="btn-group  " role="group" aria-label="Basic example">
                            <NavLink to='/home/shop' type="button" className="btn btnofrm ">Корзина</NavLink>
                        </div>
                    </div>
                        <div className="row">
                        <div className="col-md-12">
                            <form className="needs-validation tablekorzin p-2" onSubmit={this.formoplata} noValidate>
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="name">Имя*</label>
                                        <input type="text" onChange={this.onchangename} className={`form-control ${this.state.isvalidname}`} id="name"
                                               placeholder="Имя" value={this.state.name} required />
                                            <div className={this.state.clasname}>
                                                {this.state.erorrname}
                                            </div>

                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="lastname">Фамилия*</label>
                                        <input type="text" onChange={this.onchangelastname} className={`form-control ${this.state.isvalidlastname}`} id="lastname"
                                               placeholder="Фамилия" value={this.state.lasname} required/>
                                            <div className={this.state.claslastname}>
                                                {this.state.erorrlastename}
                                            </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="email">Email*</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="email">@</span>
                                            </div>
                                            <input type="text" onChange={this.onchangeemail} className={`form-control ${this.state.isvalidemail}`} id="email"
                                                   placeholder="Email" value={this.state.email} aria-describedby="inputGroupPrepend" required />
                                                <div className={this.state.clasemil}>
                                                    {this.state.erorremail}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">

                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="phone">Телефон*</label>
                                        <InputMask mask="+7 (999)-999-9999" onChange={this.onchangephone} className={`form-control ${this.state.isvalidphone}`} id="phone"
                                                   placeholder="Телефон" value={this.state.phone} required/>

                                        <div className={this.state.clasphone}>
                                            {this.state.erorrphone}
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="region">Регион</label>
                                        <input type="text" className="form-control" id="region"
                                               placeholder="Регион" onChange={this.onchangereg} value={this.state.reg}/>
                                        <div className="invalid-feedback">

                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="city">Город*</label>
                                        <input type="text" onChange={this.onchangecity} className={`form-control ${this.state.isvalidcity}`} id="city"
                                               placeholder="Город" value={this.state.city} required />
                                            <div className={this.state.clascity}>
                                                {this.state.erorrcity}
                                            </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="adres">Адрес*</label>
                                        <input type="text" onChange={this.onchangeadres} className={`form-control ${this.state.isvalidadres}`} id="adres"
                                               placeholder="Адрес" value={this.state.adres} required/>
                                            <div className={this.state.clasadrs}>
                                                {this.state.erorradres}
                                            </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-12 text-center">
                                        <h4>Итого:  {( Number(this.props.location.state.sena) ===0)? window.location.replace("/home/shop"): this.props.location.state.sena } тг</h4>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="btn btn-success mt-3  btn-block">Оплатить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="maginop"></div>
                </div>
            </section>
        );
    }
}