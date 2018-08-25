import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios";

export default class TovarShpw extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:{},val:1, option:'ed', sena:0, img:[], knopka:false};
        this.onClickKarzin = this.onClickKarzin.bind(this);
        this.onclickPlus = this.onclickPlus.bind(this)
        this.onclickMinus = this.onclickMinus.bind(this)
        this.ongangeoption = this.ongangeoption.bind(this)


    }

    onClickKarzin(e) {
        e.preventDefault()
        let obj = {
            id:Number(this.state.data.id),
            value:Number(this.state.val),
            option:this.state.option
        };

        this.props.obj(obj)
        this.setState({
            knopka: true
        })
        let goodSena = this.state.sena * this.state.val;
        setTimeout(()=>this.props.fullsena(),20)


    }
    onclickPlus(val){
        let value = Number(this.state.val);
        if (Number(val)<1){
            value = 1;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });

        }else{
            value++;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });


        }


    }

    onclickMinus(val){
        let value = Number(this.state.val)
        let proverka = Number(val) -1
        if (proverka<=0){
            value = 1;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            })


        }else{
            value--;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            })

        }

    }


    componentDidMount(){

        axios.post('/tovar', {
            id: this.props.id
        })
            .then((response)=> {

                let img = response.data.img.split(' ');

                this.setState({
                    data: response.data,
                    img: img,
                    sena:response.data.sena
                })
            })
            .catch((error)=> {
                this.forceUpdate();
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        setTimeout(()=>{
            if (localStorage.getItem("karzina") != null) {
                let returnObj = JSON.parse(localStorage.getItem("karzina"))
                for (let i =0; i< returnObj.length ; i++){
                    if (returnObj[i].id === this.state.data.id){
                        this.setState({
                            val:returnObj[i].value,
                            knopka: true,
                            option:returnObj[i].option
                        })

                        if (returnObj[i].option==="ed"){
                            this.setState({
                                sena: this.state.data.sena
                            })
                        }else {
                            this.setState({
                                sena: this.state.data.sena2 *this.state.data.kolichestvo
                            })
                        }




                    }
                }

            }
        },500)

    }

    ongangeoption(e){
        if (e.target.value ==="ed"){
            this.setState({
                sena: this.state.data.sena
            })
            this.setState({
                option: e.target.value,
                knopka: true
            })

        }else {
            this.setState({
                sena: this.state.data.sena2 *this.state.data.kolichestvo
            })
            this.setState({
                option: e.target.value,
                knopka: true

            })

        }


    }


    Knopka(){
        return(

            <div className="row">
                <div className="col-12">
                    <div className="input-group">
                                                        <span className="input-group-btn">
                                                            <img  src="/img/minus.png" className="btn-buy"
                                                                  onClick={()=>this.onclickMinus(this.state.val)}

                                                            />
                                                        </span>
                        <div className="chetchik"> {this.state.val} </div>
                        <span className="input-group-btn">
                                                            <img className="btn-buy" src="/img/plus.png"
                                                                 onClick={()=>this.onclickPlus(this.state.val)} />

                                                        </span>
                    </div>
                </div>

            </div>
        )
    }
    render() {
        return (
                <div className="col-md-6 col-lg-6 col-xl-3 col-sm-12 mb-3 mt-1 product-blok ">

                <div className="img-priduct mx-auto">
                    <img src={`/img/sokis/${this.state.img[0]}`} className="img-thumbnail " alt=""/>
                </div>
                <div className="product-hide">
                    <form onSubmit={this.onClickKarzin} >
                        <div className="name-tovar text-center">
                            <Link to={`/home/page/${this.props.id}`} >{this.state.data.title}<span> {this.state.data.obem} л</span></Link>
                        </div>
                        <div className="nalich text-center">
                            {(this.state.data.sklad === 1) ? <span className="yesnal" >Есть в наличии</span> :<span className="nolnal" >Нет в наличии</span> }

                        </div>
                        <div className="form-check">
                            <input className="form-check-input" onChange={this.ongangeoption} type="radio" name="exampleRadios" id={`ex${this.state.data.id}`}
                                   defaultValue='ed' checked={this.state.option === "ed"}   />
                                <label className="form-check-label" htmlFor={`ex${this.state.data.id}`}>
                                    Купить единицей {this.state.data.sena} тг
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" onChange={this.ongangeoption} type="radio" name="exampleRadios" id={`ex${this.state.data.id}2`}
                                    defaultValue="yp"  checked={this.state.option === "yp"} />
                                <label className="form-check-label" htmlFor={`ex${this.state.data.id}2`}>
                                    Купить упаковку {this.state.data.sena2} тг  (экономия  {this.state.data.sena - this.state.data.sena2} тг )
                                </label>
                        </div>
                        <p className="senatov">Цена:</p>
                        <div className="row">
                            <div className="col-12">
                                <h5 className='text-center senatovar'> {(this.state.option==='ed')?this.state.data.sena *this.state.val : this.state.data.sena2 *this.state.data.kolichestvo * this.state.val} тг</h5>

                            </div>
                            <div className="col-6">
                                {this.Knopka()}
                            </div>
                            <div className="col-6">
                                <button type="submit"  className="btn btn-outline-success btn-block  ">В корзину</button>
                            </div>
                        </div>

                    </form>

                </div>
                    <div className="name-tovar non  text-center">
                        <Link to={`/home/page/${this.props.id}`} >{this.state.data.title}<span> {this.state.data.obem} л</span></Link>
                    </div>
                    <div className="nalich non text-center">
                        {(this.state.data.sklad === 1) ? <span className="yesnal" >Есть в наличии</span> :<span className="nolnal" >Нет в наличии</span> }

                    </div>

                    <div className="col-12 non">
                        <h5 className='text-center senatovar'> {(this.state.option==='ed')?this.state.data.sena *this.state.val : this.state.data.sena2 *this.state.data.kolichestvo * this.state.val} тг</h5>

                    </div>

            </div>

        );
    }
}