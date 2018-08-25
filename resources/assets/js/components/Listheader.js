import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
export default class Listheader extends React.Component{

    constructor(props) {
        super(props);
        this.state = {val:this.props.number.value,sena:0, option:this.props.number.option, id:this.props.number.id,data:{}, img: [],goodsna:0} ;
        this.onclickPlus = this.onclickPlus.bind(this)
        this.onclickMinus = this.onclickMinus.bind(this)


    }

    onclickPlus(val){
        let value = Number(this.state.val);
        if (Number(val)<1){
            value = 1;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });
            setTimeout(()=>{
                let obj={
                    id:this.state.id,
                    value:this.state.val,
                    option: this.state.option
                }
                this.props.funcarr(obj)
            })

            setTimeout(()=>this.props.sena(),20)
        }else{
            value++;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });

            setTimeout(()=>{
                let obj={
                    id:this.state.id,
                    value:this.state.val,
                    option: this.state.option

                }
                this.props.funcarr(obj)
            })
            setTimeout(()=>this.props.sena(),20)

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
            setTimeout(()=>{
                let obj={
                    id:this.state.id,
                    value:this.state.val,
                    option: this.state.option
                }
                this.props.funcarr(obj)
            })
            return false
            setTimeout(()=>this.props.sena(),20)

        }else{
            value--;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            })
            setTimeout(()=>{
                let obj={
                    id:this.state.id,
                    value:this.state.val,
                    option: this.state.option

                }
                this.props.funcarr(obj)
            })
            setTimeout(()=>this.props.sena(),20)

        }

    }
    componentDidMount(){
        axios.post('/tovar', {
            id: this.state.id
        })
            .then((response)=> {
                if (this.state.option ==='ed'){
                    this.setState({
                        sena: response.data.sena
                    })

                }else {

                    this.setState({
                        sena: response.data.sena2 * response.data.kolichestvo
                    })

                }

                // let img = response.data.img.split(' ');

                this.setState({
                    data: response.data,
                    //   img: img
                })
            })
            .catch( (error)=> {
                console.log(error);
            })

    }




    render() {
        return(
                <div className=" listhead" >
                        <div className='container' ><Link to={`/home/page/${this.state.data.id}`}> {this.state.data.title} {this.state.data.obem} л </Link>
                            <div className="row">
                                <div className="col-md-6">

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
                                <div className={"col-md-6 senalist"}>{(this.props.number.option === "ed")? this.state.data.sena *this.state.val+" тг ":this.state.data.sena2* this.state.data.kolichestvo *this.state.val +" тг"} </div>

                            </div>




                        </div>



                </div>

        )

    }
}