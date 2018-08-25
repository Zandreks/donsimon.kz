import React from 'react'
import { Link } from 'react-router-dom'
import Category from "./component/Formzakaz";
import axios from "axios"
import Header from "./Header";
import Slider from "./component/Slider";
export default class Delivery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {array:[], category:[], valtovar:0, senarr:[],Sena:0,} ;

        this.funcarr = this.funcarr.bind(this)
        this.func = this.func.bind(this)
        this.fullsaena=this.fullsaena.bind(this)
        this.masivsena = this.masivsena.bind(this)
        this.senasum = this.senasum.bind(this)
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

    func(){
        let arrr = this.state.array
        let serialObj = JSON.stringify(arrr);
        localStorage.setItem("karzina", serialObj);
        let returnObj = JSON.parse(localStorage.getItem("karzina"))
        this.setState({
            valtovar: returnObj.length
        })

    }

    fullsaena(){
        this.masivsena()
    }

    componentDidMount() {
        {document.body.scrollTop = document.documentElement.scrollTop = 0}

        axios.post('/home')
            .then((response)=> {
                this.setState({
                    category: response.data
                })
            })
            .catch( (error)=> {
                this.forceUpdate();

                console.log(error);
            })
            .then(function () {
                // always executed
            });
        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"))
            this.setState({
                array: this.state.array.concat(returnObj),
                valtovar: returnObj.length
            })
            setTimeout(()=>{
                this.masivsena()

            },200)

        }


    }



    masivsena (){
        for (let i =0; i<this.state.array.length;i++){
            let newarr =  this.state.senarr.filter( (item)=> {
                return (item.id !==this.state.array[i].id );
            });
            this.setState({
                senarr: [...newarr]
            })
            setTimeout(()=>{
                axios.post('/tovar', {
                    id: this.state.array[i].id
                })
                    .then((response)=> {
                        if (this.state.array[i].option ==="ed"){
                            this.setState({
                                senarr: this.state.senarr.concat({
                                    id:response.data.id,
                                    value:this.state.array[i].value,
                                    sena:response.data.sena
                                }),

                            })
                            setTimeout(()=>{
                                this.senasum()
                            },20)
                        } else {
                            this.setState({
                                senarr: this.state.senarr.concat({
                                    id:response.data.id,
                                    value:this.state.array[i].value,
                                    sena:response.data.sena2 * response.data.kolichestvo
                                }),

                            })
                            setTimeout(()=>{
                                this.senasum()
                            },20)
                        }

                    })
                    .catch((error)=> {
                        this.forceUpdate();
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            },20)

        }
    }
    senasum(){
        let sena =0;
        for (let i=0; i<this.state.senarr.length;i++){
            sena+= this.state.senarr[i].sena * this.state.senarr[i].value
        }
        this.setState({
            Sena:sena
        })
    }

    render() {
        return (

            <section className="content">
                <Header valtovar={this.state.valtovar} funcarr={this.funcarr} sena={this.fullsaena} fulsena={this.state.Sena}/>
                <Slider/>

                <div className="container  content-fon ">
                   <p className="pdost3">
                        Доставка по г.Астана:
                        <br/>
                        <ul className="lidev">
                            <li>
                                при заказе на сумму до <span className="numbertext">10 000</span>  тг стоимость доставки составляет <span className="numbertext">1 000</span>  тг;

                            </li>
                            <li>
                                при заказе на сумму свыше <span className="numbertext">10 000</span>  тг доставка осуществляется бесплатно.

                            </li>
                        </ul>

                        Возможность доставки в другие регионы Республики Казахстан осуществляется по договоренности и рассчитывается индивидуально.<br/>
                       <span className="colorred"> За дополнительной информацией просим обращаться по тел.: <a href="tel:+77710850808">+7 (771) 085-08-08</a></span>

                    </p>
                </div>

            </section>
        )
    }
}