import React from 'react'
import { Link } from 'react-router-dom'
import Category from "./component/Formzakaz";
import axios from "axios"
import Header from "./Header";
import Slider from "./component/Slider";
export default class About extends React.Component {

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

                <div className="container content-fon ">

                    <p className="pdost  ">
                        ТОО «GP Stability» - официальный дилер в Республики Казахстан торговой марки DON SIMON.
                        <br/>
                        Сок марки Don Simon был впервые представлен в Испании в 1982 году. С тех пор он стал брендом сока номер один в Испании и теперь имеет продажи в более чем 30 разных странах мира. Для создания вкуснейших натуральных соков используются только самые качественные фрукты с солнечных плантаций Испании, которые проходят переработку в течение 24 часов с момента сбора урожая.
                        <br/>
                        Марка DON SIMON принадлежит J.Garcia Carrion, семейному производителю соков и вина с богатой 120-летней историей, являющейся абсолютным лидером рынка вина и соков в Испании.
                        <br/>
                        J.Garcia Carrion - пятый по величине производитель вина в мире и четвертый по величине производитель соков в Европе.
                        <br/>
                    </p>
                    <p className="pdost2  text-center ">
                        100% натуральные соки прямого отжима марки Don Simon не содержат ГМО, сахара и консервантов! Отличаются высоким качеством и превосходным вкусом!
                        Напрямую с солнечных плантаций Испании!

                    </p>
                </div>

            </section>
        )
    }
}