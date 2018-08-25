import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Zakas extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[],url:"/admin/zakas",pagination:[] ,img:[],str:'',sortstat:''} ;
        this.list = this.list.bind(this)
        this.make_paginat = this.make_paginat.bind(this)
        this.loademore = this.loademore.bind(this)
        this.fil = this.fil.bind(this)
        this.status=this.status.bind(this)
        this.sort=this.sort.bind(this)
        this.sortdata= this.sortdata.bind(this)
    }
    list(){


    }

    componentWillMount(){
       this.freh()

    }
    freh(){
        axios.post(this.state.url)
            .then((response)=> {
                this.setState({
                    data:this.state.data.length>0?this.state.data.concat(response.data.data):response.data.data,
                    url:response.data.next_page_url
                })
                this.make_paginat(response.data)
            })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    make_paginat(data){
        let paginaton={
            current_page:data.current_page,
            last_page_:data.last_page,
            next_page_url:data.next_page_url,
            prev_page_url:data.prev_page_url
        }
        this.setState({
            pagination:paginaton
        })
    }

    loademore(){
         this.setState({
             url:this.state.pagination.next_page_url
         })
         this.freh()
     }
    fil(e){
        this.setState({
            str: e.target.value
        });
    }
    status(id, stat){
        axios.post('/admin/stat',{
            id: id,
            stat
        }).then((response)=> {
            if (response.data==='ok'){
                alert("Статус изменен")
                location.reload()
            }

        })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    sort(e){
        let str = e.target.value
        if (str ==='non'){
            location.reload()

        }else {
            axios.post('/admin/sort',{
                sort: str,
            }).then((response)=> {
                this.setState({
                    data:response.data
                })
            })
                .catch((error)=> {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                })

        }


    }
    sortdata(e){

        let str = e.target.value
        if (str ===''){
            location.reload()

        }else {
            axios.post('/admin/sortdata',{
                sort: str,
            }).then((response)=> {
                this.setState({
                    data:response.data
                })
            })
                .catch((error)=> {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                })

        }
    }

    render(){
        let filt = this.state.data.filter((ids)=>{
            return ids.name.indexOf(this.state.str !==-1)
        })
        return(
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Список заказов в магазине</h3>
                            <hr/>
                            <div className='row'>
                                <div className="form-group col-md-4">
                                    <label htmlFor="exampleFormControlSelect1">Сортировка по статусу</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={this.sort}>
                                        <option value={'non'}>Обычная сортировка</option>
                                        <option value={1}>Доставлен</option>
                                        <option value={2}>В пути</option>
                                        <option value={4}>Возврат</option>
                                        <option value={5}>Отмена</option>
                                    </select>
                                </div>
                                <div className=" form-group col-md-4">
                                    <label htmlFor="calen">
                                        Сортировка по дате
                                    </label>
                                    <input type="date" id="calen" className='form-control' name="calendar" onChange={this.sortdata}/>

                                </div>
                            </div>


                            <table className="table table-hover table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Номер заказа</th>
                                    <th scope="col">Покупаатель</th>
                                    <th scope="col">Адрес</th>
                                    <th scope="col">Товар</th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Дата создания</th>
                                    <th scope="col">Дата изменения</th>
                                    <th scope="col">Статус</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((number)=>
                                    <tr key={number.id}>
                                        <td>{number.id}</td>
                                        <td>{number.name}</td>
                                        <td>{number.adres}</td>
                                        <td>{number.tovars}</td>
                                        <td> {number.sena}</td>
                                        <td>{number.created_at}</td>
                                        <td>{number.updated_at}</td>
                                        <td>{(number.status ===0)?
                                            <div className="alert alert-primary" role="alert">Принят!</div>:
                                            (number.status ===1)?<div className="alert alert-success" role="alert">Доставлен!</div>:
                                            (number.status ===2)?<div className="alert alert-secondary" role="alert">В пути</div>:
                                            (number.status ===4)?<div className="alert alert-warning" role="alert">Возврат</div>:
                                                <div className="alert alert-danger" role="alert">Отменен</div>
                                    }</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-secondary" onClick={()=>this.status(number.id,2)}>В пути</button>
                                                <button type="button" className="btn btn-secondary" onClick={()=>this.status(number.id,1)}>Доставлен</button>
                                                <button type="button" className="btn btn-secondary" onClick={()=>this.status(number.id,4)}>Возврат</button>
                                                <button type="button" className="btn btn-secondary" onClick={()=>this.status(number.id,5)}>Отмена</button>
                                            </div>
                                        </td>

                                    </tr>)}
                                </tbody>
                            </table>
                            <button onClick={this.loademore}>Загрузить еще</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}