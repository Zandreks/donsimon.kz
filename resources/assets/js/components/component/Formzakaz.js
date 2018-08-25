import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import TovarShpw from './TovarShpw'
import axios from "axios";
export default class Formzakaz extends React.Component{

    constructor(props) {
        super(props);
        this.state = {name:[], data:{}};
        this.ArrFunc = this.ArrFunc.bind(this)
        this.fullsena = this.fullsena.bind(this)

        this.listovar= this.listovar.bind(this)

    }

    ArrFunc(obj){
        this.props.func(obj)

    }
    componentWillMount(){

        axios.post('/idtovar', {
            id: this.props.id
        })
            .then((response)=> {

                this.setState({
                    name: response.data
                })
            })
            .catch( (error)=> {

                this.forceUpdate();

                console.log(error);
            })
            .then(function () {

            });
        axios.post('/categoryname', {
            id: this.props.id
        })
            .then((response)=> {

                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });


    }
    fullsena(){
        this.props.fullsena()
    }

    listovar(){
        const list2 = this.state.name.map(number=><TovarShpw key={number.id} fullsena={this.fullsena} obj={this.ArrFunc} id={number.id} />)
        return list2
    }


    render() {

        return (
            <div className="pt-4">
                <div className='border-title '>
                    <p className="header-title ">
                        {(this.props.name ===undefined)?this.state.data.title:this.props.name}
                    </p>
                </div>


                <div className="row wow fadeInDown">
                    {this.listovar()}
                </div>


            </div>
        );
    }
}