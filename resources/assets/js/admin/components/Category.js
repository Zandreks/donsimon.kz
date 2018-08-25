import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[],url:"/admin/category",pagination:[]};
        this.list = this.list.bind(this)
        this.delet = this.delet.bind(this)
        this.make_paginat = this.make_paginat.bind(this)
        this.loademore = this.loademore.bind(this)
    }
    list(){
        const list = this.state.data.map(number=>
            <tr key={number.id}>
                <th scope="row"><img src={`/img/sokis/${number.img}`} className="img-thumbnail img-admin" alt=""/></th>
                <td><a href={`/home/category/${number.id}`} target="_blank"> {number.title} </a></td>
                <td>{number.created_at}</td>
                <td>{number.updated_at}</td>
                <td> <Link to={`/admin/editcat/${number.id}`} className="btn btn-primary" role="button" aria-pressed="true">Изменить</Link></td>
                <td><button type="button" onClick={()=>this.delet(number.id)} className="btn btn-danger">Удалить</button></td>
            </tr>
        )
        return list
    }
    delet(id){
        var filteredItems = this.state.data.filter(function (item) {
            return (item.id !== id);
        });

        this.setState({
            data: filteredItems
        });
        axios.post('/admin/delcategory',{
            id: id
        }).then((response)=> {
            alert("Категория удалена")
        })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    componentWillMount(){
        this.freh()
    }
    freh(){
        axios.post(this.state.url)
            .then((response)=> {
                this.setState({
                    data:response.data
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

    render(){
        return(
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Список категории в магазине</h3>
                            <hr/>
                            <table className="table table-hover table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Тип товара</th>
                                    <th scope="col">Наименование</th>
                                    <th scope="col">Дата создания</th>
                                    <th scope="col">Дата изменения</th>

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