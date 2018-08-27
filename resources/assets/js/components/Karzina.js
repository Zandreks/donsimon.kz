import React from 'react'
import { Link , NavLink } from 'react-router-dom'
import ListKorzin from "./ListKorzin";
import Header from "./Header";
import Sllider2 from "./component/Sllider2";
import axios from "axios";

export default class Karzina extends React.Component{

    constructor(props) {
        super(props);
        this.state = {array:[],senarr:[],Sena:0, valtovar:0,promo:'',
            erorrpomi:'',
            isvalidptomo:'',
            claspromo:'',
            skid:0,
            nam:0,
            fulsena:0,
            dostavra:'',
            promotrue:false,
            senadostrue:false
        } ;
        this.deletenumber = this.deletenumber.bind(this)
        this.Table=this.Table.bind(this)
        this.func = this.func.bind(this)
        this.funcarr = this.funcarr.bind(this)
        this.senamasiv = this.senamasiv.bind(this)
        this.suma = this.suma.bind(this)
        this.promo = this.promo.bind(this)
        this.promosend = this.promosend.bind(this)
        this.optiondos = this.optiondos.bind(this)
        this.senados = this.senados.bind(this)
    }

    funcarr(obj){

        if (this.state.array.length>0) {
           let newarr =  this.state.array.filter(function (item) {
                return (item.id !== obj.id);
            });
            this.setState({
                array: [...newarr,obj]
            })
        }
        else {
            this.setState({
                array: [...this.state.array,obj]
            })
        }
        setTimeout(()=>this.func(),20)

    }


    deletenumber(id){
        var filteredItems = this.state.array.filter(function (item) {
            return (item.id !== id);
        });

        this.setState({
            array: filteredItems
        });
        var filtersena = this.state.senarr.filter(function (item) {
            return (item.id !== id);
        });

        this.setState({
            senarr: filtersena
        });
        this.setState({
          senadostrue:false
        });
        setTimeout(this.func, 10);
        setTimeout( this.suma,50)
        setTimeout(()=>this.senados(),100)


    }

    func(){
        let arrr = this.state.array
        let serialObj = JSON.stringify(arrr);
        localStorage.setItem("karzina", serialObj);
        let returnObj = JSON.parse(localStorage.getItem("karzina"))
        this.setState({
            valtovar: returnObj.length
        })

    }

    senamasiv(val,id, option, sena) {
        let obj = {
            id: id,
            sena: sena

        };
        let obj2 ={
            id:id,
            value:val,
            option
        }
        this.funcarr(obj2)

        if (this.state.senarr.length>0) {
            let newarr =  this.state.senarr.filter(function (item) {
                return (item.id !== obj.id);
            });
            this.setState({
                senarr: [...newarr,obj]
            })
        }
        else {
            this.setState({
                senarr: [...this.state.senarr,obj]
            })
        }
        this.setState({
          senadostrue:false
        });
        setTimeout(()=>this.suma())
    }
    suma(){
        let obshasuma =0;
        let num =0
        for (let i = 0; i< this.state.senarr.length; i++){
            obshasuma+= this.state.senarr[i].sena
            this.setState({
                nam:num+=1
            })

        }

        this.setState({
            Sena: obshasuma
        })
        this.senados();

    }
    sena2(){
      let obshasuma =0;
      let num =0
      for (let i = 0; i< this.state.senarr.length; i++){
          obshasuma+= this.state.senarr[i].sena
          this.setState({
              nam:num+=1
          })

      }

      this.setState({
          Sena: obshasuma
      })
    }
    senados(){
      if (this.state.dostavra === 'Доставка по городу Астана' && this.state.Sena <=10000 && this.state.senadostrue ===false)  {
         setTimeout(()=>{
          this.setState({
            Sena: this.state.Sena+1000,
            senadostrue:true
          });
        },20)

      }if (this.state.dostavra === 'Доставка в другие регионы') {

        setTimeout(()=> {
          this.sena2()
          setTimeout(()=>{
            this.setState({
              senadostrue:false
            });
          },50)

        })
      }


    }
    Table(){

        if (this.state.array.length>0){
            return(
              <div>

                  <div className="table-responsive pt-5">
                      <table className="table  ">
                          <tbody>
                          { this.state.array.sort(function (a, b) {
                              if (a.id > b.id) {
                                  return 1;
                              }
                              if (a.id < b.id) {
                                  return -1;
                              }
                              // a должно быть равным b
                              return 0;
                          }).map((number) =>
                              <ListKorzin key={ number.id} number={number} senamasiv={this.senamasiv}  del={this.deletenumber}/>
                          )}
                          </tbody>
                      </table>

                  </div>
                <div className="form-row  promo">

                                      <div className="col-md-6 mb-3">
                                          <input  className={`form-control text-center ${this.state.isvalidptomo}`} onChange={this.promo} id="promo"
                                                  placeholder="Промокод" value={this.state.promo}/>

                                          <div className={this.state.claspromo}>
                                              {this.state.erorrpomi}
                                          </div>

                                      </div>

                                      <div className="col-md-6 mb-3">
                                          <button type="button" id='checkout' onClick={this.promosend} className="btn btn-outline-success btn-block">Проверить</button>

                                      </div>

                                      <div>

                </div>



                                  </div>

                                        <div className="optiondost">
                                          <div className="form-check">
                                            <input
                                  className="form-check-input"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios1"
                                  onChange={this.optiondos}
                                  defaultValue="Доставка по городу Астана" />
                                            <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios1">
                                              Доставка по городу Астана осуществляется бесплатно при заказе на сумму свыше 10 000 тг
                                            </label>
                                          </div>
                                          <div className="form-check">
                                            <input
                                  className="form-check-input"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios2"
                                  onChange={this.optiondos}
                                  defaultValue="Доставка в другие регионы" />
                                            <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios2">
                                              Доставка в другие регионы осуществляется по договоренности (За дополнительной информацией просим обращаться по тел.: <a href="tel:+77710850808">+7 (771) 085-08-08</a>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h4 className="text-center">Итого: {this.state.Sena} тг</h4>

                                        </div>

              </div>
            )
        }else {
            return(
                <h3 className="text-center pt-2 pb-3 m-0">Корзина пуста</h3>
            )
        }
    }


    componentDidMount() {
        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"))
            this.setState({
                array: returnObj,
                valtovar: returnObj.length

            })

        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        axios.post('/skid')
            .then((response)=> {
                this.setState({
                    skid:response.data.skid
                })
            })
            .catch( (error)=> {
                this.forceUpdate();

                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }
    promo(e){
        let str = e.target.value
        this.setState({
            promo:str
        })
    }
    promosend(){
        axios.post('/promo', {
            promo:this.state.promo
        })
            .then((response)=> {
                if (response.data==="ok") {
                    this.setState({
                        isvalidptomo:"is-valid",
                        claspromo:'valid-feedback',
                        erorrpomi:"Ваша скидка подсчитана"

                    })
                    if (this.state.promotrue === false) {
                      let skidka = Number(this.state.Sena)*this.state.skid/100
                      const fullsena = Math.ceil(Number(this.state.Sena)-skidka)
                      this.setState({
                          Sena:fullsena,
                          promotrue:true

                      })
                      this.senados()
                    }

                }else {
                    this.setState({
                        isvalidptomo:"is-invalid",
                        claspromo:'invalid-feedback',
                        erorrpomi:'У вас нет скидки! Совершите покупку чтобы получить скидку'

                    })
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

    optiondos(e){
      this.setState({
        dostavra:e.target.value
      });
      setTimeout(()=> this.senados(),20)
    }

    render(){
        return(
            <section className="content">
                <Header  valtovar={this.state.valtovar} non={false} fulsena={this.state.Sena}/>

                <div className="container content-fon over  pt-3">

                    <div className="tablekorzin">

                        {this.Table()}

                    </div>
                    <div className="inputgrp text-center ">
                        <div className="btn-group btnblokrarz  " role="group" aria-label="Basic example">
                          {(this.state.Sena ===0 || this.state.nam!== this.state.valtovar || this.state.dostavra==="")?

                            <a href="#"type="button" className={`btn btnofrm disabled`}>Оформить заказ</a>:
                              <NavLink to={{
                                  pathname:"/home/decor",
                                  state:{sena:this.state.Sena,dost:this.state.dostavra}

                              }} type="button" className={`btn btnofrm`}>Оформить заказ</NavLink>
                          }

                        </div>
                    </div>

                </div>
            </section>

    )
    }

}
