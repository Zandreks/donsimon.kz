import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[],url:"/admin/users"} ;
        this.list = this.list.bind(this)
        this.delet = this.delet.bind(this)
        this.userok=this.userok.bind(this)
        // this.make_paginat = this.make_paginat.bind(this)
        //this.loademore = this.loademore.bind(this)
    }
    list(){

        const list = this.state.data.map(number=>
            <tr key={number.id}>
                <td>{number.name}</td>
                <td>{number.email}</td>
                <td>{number.created_at}</td>
                <td>{number.updated_at}</td>
                <td> <button  className="btn btn-primary" role="button" onClick={()=> this.userok(number.id)} aria-pressed="true">Потвердить</button></td>
                <td><button type="button" onClick={()=>this.delet(number.id)} className="btn btn-danger">Удалить</button></td>
            </tr>
        )
        return list
    }
    userok(id){
        axios.post('/admin/usersok',{
            id: id
        }).then((response)=> {
            if (response.data ==="ok")
                alert("Пользователь одобрен")
        })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    delet(id){
        var filteredItems = this.state.data.filter(function (item) {
            return (item.id !== id);
        });

        this.setState({
            data: filteredItems
        });
        axios.post('/admin/usersdel',{
            id: id
        }).then((response)=> {
            if (response.data ==="ok")
            alert("Пользователь удален")
        })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    componentWillMount(){
        axios.post(this.state.url)
            .then((response)=> {

                this.setState({
                    data:response.data,

                })
            })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })

    }
    freh(){

    }
    /*make_paginat(data){
        let paginaton={
            current_page:data.current_page,
            last_page_:data.last_page,
            next_page_url:data.next_page_url,
            prev_page_url:data.prev_page_url
        }
        this.setState({
            pagination:paginaton
        })
    }*/

    /* loademore(){
         this.setState({
             url:this.state.pagination.next_page_url
         })
         this.freh()
     }*/

    render(){
        return(
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Список пользователей</h3>
                            <hr/>
                            <table className="table table-hover table-dark">
                                <thead>
                                <tr>
                                </tr>
                                </thead>
                                <tbody>
                                {this.list()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}