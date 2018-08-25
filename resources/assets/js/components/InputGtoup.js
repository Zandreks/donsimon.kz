import React from 'react'

export default class InputGtoup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {array: [],val:1, knopka:false};

        this.funcarr = this.funcarr.bind(this)
        this.func = this.func.bind(this)
        this.onClickKarzin = this.onClickKarzin.bind(this);
        this.onclickPlus = this.onclickPlus.bind(this)
        this.onclickMinus = this.onclickMinus.bind(this)

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



    func() {
        let arrr = this.state.array
        let serialObj = JSON.stringify(arrr);
        localStorage.setItem("karzina", serialObj);

        //return <IconKorzin num={int}/>

    }

    onClickKarzin(e) {
        e.preventDefault()
        let obj = {
            id: Number(this.props.id),
            value: Number(this.state.val),
            option:this.props.option
        };
        this.funcarr(obj)
        this.setState({
            knopka: true
        })
    }


    componentDidMount() {

        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"))
            this.setState({
                array: this.state.array.concat(returnObj)
            })

        }
        setTimeout(()=>{
            if (localStorage.getItem("karzina") != null) {
                let returnObj = JSON.parse(localStorage.getItem("karzina"))
                for (let i =0; i< returnObj.length ; i++){
                    if (returnObj[i].id === this.props.id){
                        this.setState({
                            val:returnObj[i].value,
                            knopka: true
                        })
                    }
                }

            }
        },200)


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
        setTimeout(()=>{
            let obj = {
                id:Number(this.props.id),
                value:Number(this.state.val),
                option:this.props.option

            };
            this.funcarr(obj)
        },200)

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
        setTimeout(()=>{
            let obj = {
                id:Number(this.props.id),
                value:Number(this.state.val),
                option:this.props.option

            };
            this.funcarr(obj)

        },200)
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
            <form onSubmit={this.onClickKarzin}>
                {(this.state.knopka===false)? <button type="submit"  className="btn btn-outline-success btn-block  ">В корзину</button>:this.Knopka()}

            </form>
                )
                }
            }