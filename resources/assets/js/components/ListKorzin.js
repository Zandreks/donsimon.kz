import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
export default class ListKorzin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {val:this.props.number.value,sena:0, id:this.props.number.id,data:{}, img: []} ;

        this.deletenumber = this.deletenumber.bind(this)
        this.onclickPlus = this.onclickPlus.bind(this)
        this.onclickMinus = this.onclickMinus.bind(this)
        this.ongange = this.ongange.bind(this)
        this.senasum = this.senasum.bind(this)


    }

    deletenumber(id){
        this.props.del(id)
    }
    onclickPlus(val){
        let value = Number(this.state.val);
        if (Number(val)<1){
            value = 1;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena),20)
        }else{
            value++;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            });
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena))

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
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena))

        }else{
            value--;
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            })
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena))

        }

    }
    ongange(event){
        let str = event.target.value
        let value = str.replace(/[^\d;]/g, '')
        if (Number(value)<1){
            value =1;
            let goodSena = this.state.sena* value ;
            this.setState({
                val: value
            })
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena))


        }else{
            let goodSena = this.state.sena * value ;
            this.setState({
                val: value
            })
            setTimeout(()=>this.props.senamasiv(this.state.val, this.state.id, this.props.number.option ,goodSena))


        }
    }
    componentDidMount(){
        axios.post('/tovar', {
            id: this.state.id
        })
            .then((response)=> {
                if (this.props.number.option ==='ed'){
                    this.setState({
                        sena: response.data.sena
                    })
                    this.senasum()

                }else {

                    this.setState({
                        sena: response.data.sena2 * response.data.kolichestvo
                    })

                    this.senasum()

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
            .then(()=>{

            })


    }


    senasum(){
        let goodSena = this.state.sena * Number(this.state.val)
        this.props.senamasiv(this.state.val, this.state.id, this.props.number.option, goodSena)
    }


    render() {
        let number = this.props.number
        return(
            <tr >

                <td className="pt-3" data-label="Наименование"><Link to={`/home/page/${this.state.data.id}`}> {this.state.data.title} </Link></td>
                <td data-label="Количество ">

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

                </td >
                <td className="pt-3" data-label="Цана за еденицу">{(this.props.number.option === "ed")?<p> {this.state.data.sena*this.state.val} тг
                <br/>  Цена за еденицу  {this.state.data.sena} тг. </p>
                  :<p> {this.state.data.sena2* this.state.data.kolichestvo *this.state.val}  тг за упаковку <br/>
                  В упаковке {this.state.data.kolichestvo} штук  Цена за единицу {this.state.data.sena2 * this.state.data.kolichestvo} тг. </p>}
              </td>
                <td data-label="Удалить товар">
                    <button type="button" onClick={()=> this.deletenumber(number.id) } className="btn btn-outline-danger">Удалить</button>
                </td>

            </tr>
        )

    }
}
