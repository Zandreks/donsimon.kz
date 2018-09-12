import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: [], url: '/admin/index', pagination: [], img: [], category: [] };
		this.list = this.list.bind(this);
		this.delet = this.delet.bind(this);
		this.datalist = this.datalist.bind(this);
		// this.make_paginat = this.make_paginat.bind(this)
		//this.loademore = this.loademore.bind(this)
	}
	list() {
		const list = this.state.category.map((number) => (
			<div key={number.id} s>
				<h4>{number.title}</h4>

				<table className="table table-hover table-dark">
					<thead>
						<tr>
							<th scope="col">Тип товара</th>

							<th scope="col">Наименование</th>
							<th scope="col">Позиция</th>

							<th scope="col">Дата создания</th>
							<th scope="col">Дата изменения</th>
						</tr>
					</thead>
					<tbody>{this.datalist(number.id)}</tbody>
				</table>
			</div>
		));
		return list;
	}
	delet(id) {
		var filteredItems = this.state.data.filter(function(item) {
			return item.id !== id;
		});

		this.setState({
			data: filteredItems
		});
		axios
			.post('/admin/deltovar', {
				id: id
			})
			.then((response) => {
				alert('Товар удален');
			})
			.catch((error) => {
				console.log(error);
			})
			.then(function() {
				// always executed
			});
	}
	componentDidMount() {
		axios
			.post(this.state.url)
			.then((response) => {
				this.setState({
					data: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.then(function() {
				// always executed
			});
		axios
			.post('/admin/category')
			.then((response) => {
				this.setState({
					category: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.then(function() {
				// always executed
			});
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
	datalist(id) {
		var filteredItems = this.state.data.filter(function(item) {
			return item.id_category === id;
		});
		let list = filteredItems.map((number) => (
			<tr key={number.id}>
				<td>
					<img src={`/img/sokis/${number.img.split(' ')[0]}`} className="img-thumbnail img-admin" alt="" />
				</td>
				<td>
					<a href={`/home/page/${number.id}`} target="_blank">
						{' '}
						{number.title}{' '}
					</a>
				</td>
				<td>{number.pozit} </td>

				<td>{number.created_at}</td>
				<td>{number.updated_at}</td>
				<td>
					{' '}
					<Link
						to={`/admin/edittovars/${number.id}`}
						className="btn btn-primary"
						role="button"
						aria-pressed="true"
					>
						Изменить
					</Link>
				</td>
				<td>
					<button type="button" onClick={() => this.delet(number.id)} className="btn btn-danger">
						Удалить
					</button>
				</td>
			</tr>
		));
		return list;
	}
	render() {
		return (
			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Список товаров в магазине</h3>
							<hr />
							{this.list()}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
