import React from 'react';
import { Link } from 'react-router-dom';
import InputGtoup from './InputGtoup';
import axios from 'axios';
import Header from './Header';
import Parser from 'html-react-parser';

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			option: 'ed',
			img: [],
			array: [],
			val: 1,
			sena: 0,
			senarr: [],
			Sena: 0,
			valtovar: 0,
			knopka: true
		};
		this.ongangeoption = this.ongangeoption.bind(this);
		this.list = this.list.bind(this);
		this.funcarr = this.funcarr.bind(this);
		this.func = this.func.bind(this);
		this.onClickKarzin = this.onClickKarzin.bind(this);
		this.onclickPlus = this.onclickPlus.bind(this);
		this.onclickMinus = this.onclickMinus.bind(this);
		this.masivsena = this.masivsena.bind(this);
		this.senasum = this.senasum.bind(this);
		this.fullsaena = this.fullsaena.bind(this);
	}

	funcarr(obj) {
		if (this.state.array.length > 0) {
			let newarr = this.state.array.filter(function(item) {
				return item.id !== obj.id;
			});
			this.setState({
				array: [ ...newarr, obj ]
			});
		} else {
			this.setState({
				array: [ ...this.state.array, obj ]
			});
		}
		setTimeout(() => this.func(), 20);
	}

	func() {
		let arrr = this.state.array;
		let serialObj = JSON.stringify(arrr);
		localStorage.setItem('karzina', serialObj);
		let returnObj = JSON.parse(localStorage.getItem('karzina'));
		this.setState({
			valtovar: returnObj.length
		});
	}

	onClickKarzin(e) {
		e.preventDefault();
		if (this.state.knopka === false) {
			let obj = {
				id: Number(this.state.data.id),
				value: Number(this.state.val) + 1,
				option: this.state.option
			};

			this.funcarr(obj);
			this.setState({
				knopka: false,
				val: this.state.val + 1
			});
		} else {
			let obj = {
				id: Number(this.state.data.id),
				value: Number(this.state.val),
				option: this.state.option
			};

			this.funcarr(obj);
			this.setState({
				knopka: false
			});
		}
		let goodSena = this.state.sena * this.state.val;
		setTimeout(() => this.masivsena(), 20);
	}
	componentDidMount() {
		{
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		}

		axios
			.post('/tovar', {
				id: this.props.match.params.id
			})
			.then((response) => {
				if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
					window.location.replace('/home/Notound');
				}
				let img = response.data.img.split(' ');

				this.setState({
					data: response.data,
					img: img
				});
			})
			.catch((error) => {
				this.forceUpdate();
				console.log(error);
			});

		if (localStorage.getItem('karzina') != null) {
			let returnObj = JSON.parse(localStorage.getItem('karzina'));
			this.setState({
				array: this.state.array.concat(returnObj),
				valtovar: returnObj.length
			});
			setTimeout(() => {
				this.masivsena();
			}, 200);
		}

		setTimeout(() => {
			if (localStorage.getItem('karzina') != null) {
				let returnObj = JSON.parse(localStorage.getItem('karzina'));
				for (let i = 0; i < returnObj.length; i++) {
					if (returnObj[i].id === Number(this.props.match.params.id)) {
						this.setState({
							val: returnObj[i].value,
							knopka: true,
							option: returnObj[i].option
						});

						if (returnObj[i].option === 'ed') {
							this.setState({
								sena: this.state.data.sena
							});
						} else {
							this.setState({
								sena: this.state.data.sena2 * this.state.data.kolichestvo
							});
						}
					}
				}
			}
		}, 500);
	}

	onclickPlus(val) {
		let value = Number(this.state.val);
		if (Number(val) < 1) {
			value = 1;
			let goodSena = this.state.sena * value;
			this.setState({
				val: value,
				knopka: true
			});
		} else {
			value++;
			let goodSena = this.state.sena * value;
			this.setState({
				val: value,
				knopka: true
			});
		}
	}

	onclickMinus(val) {
		let value = Number(this.state.val);
		let proverka = Number(val) - 1;
		if (proverka <= 0) {
			value = 1;
			let goodSena = this.state.sena * value;
			this.setState({
				val: value,
				knopka: true
			});
			setTimeout(() => this.masivsena(), 20);
		} else {
			value--;
			let goodSena = this.state.sena * value;
			this.setState({
				val: value,
				knopka: true
			});
			setTimeout(() => this.masivsena(), 20);
		}
	}

	ongangeoption(e) {
		if (e.target.value === 'ed') {
			this.setState({
				sena: this.state.data.sena
			});
			this.setState({
				option: e.target.value,
				knopka: true
			});
		} else {
			this.setState({
				sena: this.state.data.sena2 * this.state.data.kolichestvo
			});
			this.setState({
				option: e.target.value,
				knopka: true
			});
		}
	}

	Knopka() {
		return (
			<div className="row">
				<div className="col-12">
					<div className="input-group">
						<span className="input-group-btn">
							<img
								src="/img/minus.png"
								className="btn-buy"
								onClick={() => this.onclickMinus(this.state.val)}
							/>
						</span>
						<div className="chetchik"> {this.state.val} </div>
						<span className="input-group-btn">
							<img
								className="btn-buy"
								src="/img/plus.png"
								onClick={() => this.onclickPlus(this.state.val)}
							/>
						</span>
					</div>
				</div>
			</div>
		);
	}

	list() {
		const list = this.state.img.map((number) => (
			<div key={number} className="col-4">
				<a data-fancybox="gallery" href={`/img/sokis/${number}`}>
					<img src={`/img/sokis/${number}`} className="img-pr img-thumbnail " />
				</a>
			</div>
		));
		return list;
	}
	masivsena() {
		for (let i = 0; i < this.state.array.length; i++) {
			let newarr = this.state.senarr.filter((item) => {
				return item.id !== this.state.array[i].id;
			});
			this.setState({
				senarr: [ ...newarr ]
			});
			setTimeout(() => {
				axios
					.post('/tovar', {
						id: this.state.array[i].id
					})
					.then((response) => {
						if (this.state.array[i].option === 'ed') {
							this.setState({
								senarr: this.state.senarr.concat({
									id: response.data.id,
									value: this.state.array[i].value,
									sena: response.data.sena
								})
							});
							setTimeout(() => {
								this.senasum();
							}, 20);
						} else {
							this.setState({
								senarr: this.state.senarr.concat({
									id: response.data.id,
									value: this.state.array[i].value,
									sena: response.data.sena2 * response.data.kolichestvo
								})
							});
							setTimeout(() => {
								this.senasum();
							}, 20);
						}
					})
					.catch((error) => {
						this.forceUpdate();
						console.log(error);
					})
					.then(function() {
						// always executed
					});
			}, 20);
		}
	}
	senasum() {
		let sena = 0;
		for (let i = 0; i < this.state.senarr.length; i++) {
			sena += this.state.senarr[i].sena * this.state.senarr[i].value;
		}
		this.setState({
			Sena: sena
		});
	}
	fullsaena() {
		this.masivsena();
	}

	render() {
		return (
			<section className="content ">
				<Header
					valtovar={this.state.valtovar}
					funcarr={this.funcarr}
					sena={this.fullsaena}
					fulsena={this.state.Sena}
				/>

				<div className="container content-fon mtpage">
					<div className="row">
						<div className="col-md-4">
							<div className="product-galer ">
								<div className="img-prduc">
									<a data-fancybox="gallery" href={`/img/sokis/${this.state.img[0]}`}>
										<img
											src={`/img/sokis/${this.state.img[0]}`}
											className="img-pr img-thumbnail "
										/>
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card">
								<div className="card-body">
									<div className="title">
										<h3>{this.state.data.title}</h3>
										<hr />
									</div>
									<div className="">
										<p>
											{this.state.data.sklad === 1 ? (
												<span className="alert alert-success">Есть в наличии</span>
											) : (
												<span className="alert alert-danger">Нет в наличии</span>
											)}
										</p>
									</div>
									<div className="text-poduct">
										<h3>Характеристики</h3>
										<hr />
										<div className="row">
											<div className="col-md-6">
												<p className="zametkabold">Артикул</p>
												<p>{this.state.data.articl}</p>
											</div>
											<div className="col-md-6">
												<p className="zametkabold">Производитель</p>
												<p>{this.state.data.proezvod}</p>
											</div>
											<div className="col-md-6">
												<p className="zametkabold">Страна производства</p>
												<p>{this.state.data.cuntry}</p>
											</div>
											<div className="col-md-6">
												<p className="zametkabold">Объем</p>
												<p>{this.state.data.obem} л</p>
											</div>
											<div className="col-md-6">
												<p className="zametkabold">Упаковка</p>
												<p>{this.state.data.ypakovka}</p>
											</div>
											<div className="col-md-6">
												<p className="zametkabold">Срок хранения</p>
												<p>{this.state.data.srok}</p>
											</div>
										</div>
									</div>
									<h3>Цена:</h3>
									<hr />

									<div className="form-check">
										<input
											className="form-check-input"
											onChange={this.ongangeoption}
											type="radio"
											name="exampleRadios"
											id={`ex${this.state.data.id}`}
											defaultValue="ed"
											checked={this.state.option === 'ed'}
										/>
										<label className="form-check-label" htmlFor={`ex${this.state.data.id}`}>
											Купить единицей {this.state.data.sena} тг
										</label>
									</div>
									<div className="form-check">
										<input
											className="form-check-input"
											onChange={this.ongangeoption}
											type="radio"
											name="exampleRadios"
											id={`ex${this.state.data.id}2`}
											defaultValue="yp"
											checked={this.state.option === 'yp'}
										/>
										<label className="form-check-label" htmlFor={`ex${this.state.data.id}2`}>
											Купить упаковку {this.state.data.sena2} тг{' '}
											<span className="ekonom">
												(экономия {this.state.data.sena - this.state.data.sena2} тг )
											</span>
										</label>
									</div>
									<p className="pt-2">В упаковке {this.state.data.kolichestvo} штук</p>

									<h4>
										{this.state.option === 'ed' ? (
											this.state.data.sena * this.state.val
										) : (
											this.state.data.sena2 * this.state.data.kolichestvo * this.state.val
										)}{' '}
										тг
									</h4>
									<div className="row mt-3">
										<div className="col-md-6">{this.Knopka()}</div>
										<div className="col-md-6">
											<form onSubmit={this.onClickKarzin}>
												<button type="submit" className="btn btn-outline-success btn-block  ">
													В корзину
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
								<li className="nav-item">
									<a
										className="nav-link active"
										id="home-tab"
										data-toggle="tab"
										href="#home"
										role="tab"
										aria-controls="home"
										aria-selected="true"
									>
										Описание
									</a>
								</li>
							</ul>
							<div className="tab-content pb-4" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab"
								>
									{Parser(`${this.state.data.opisan}`)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
