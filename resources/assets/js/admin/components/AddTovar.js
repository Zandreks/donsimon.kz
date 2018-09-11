import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

export default class AddTovar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inptitle: '',
			invtitle: '',
			clastitle: '',
			erortile: '',
			inpart: '',
			invart: '',
			clasart: '',
			erorart: '',
			inpproiz: '',
			invproiz: '',
			clasproiz: '',
			erorproiz: '',
			inpcount: '',
			invcount: '',
			clascount: '',
			erorcount: '',
			inpob: '',
			invob: '',
			clasob: '',
			erorob: '',
			inpyp: '',
			invyp: '',
			clasyp: '',
			eroryp: '',
			inpsrok: '',
			invsrok: '',
			classrok: '',
			erorsrok: '',
			inpsvet: '...',
			invsvet: '',
			classvet: '',
			erorsvet: '',
			inpvkys: '...',
			invvkys: '',
			clasvkys: '',
			erorvkys: '',
			inparomat: '...',
			invaromat: '',
			clasaromat: '',
			eroraromat: '',
			inpgs: '...',
			invgs: '',
			clasgs: '',
			erorgs: '',
			inptext: '',
			invtext: '',
			clastext: '',
			erortext: '',
			inpif: '',
			invif: '',
			clasif: '',
			erorif: '',
			inpsena: '',
			invsena: '',
			classena: '',
			erorsena: '',
			inpsena2: '',
			invsena2: '',
			classena2: '',
			erorsena2: '',
			inpkol: '',
			invkol: '',
			claskol: '',
			erorkol: '',
			sklad: 1,
			category: [],
			cat: '',
			pozis:1,
			image: []
		};
		this.oncgangetitle = this.oncgangetitle.bind(this);
		this.oncgangeart = this.oncgangeart.bind(this);
		this.oncgangeproiz = this.oncgangeproiz.bind(this);
		this.oncgangecount = this.oncgangecount.bind(this);
		this.oncgangeob = this.oncgangeob.bind(this);
		this.oncgangeyp = this.oncgangeyp.bind(this);
		this.oncgangesrok = this.oncgangesrok.bind(this);
		this.oncgangetext = this.oncgangetext.bind(this);
		this.oncgangesena = this.oncgangesena.bind(this);
		this.oncgangesena2 = this.oncgangesena2.bind(this);
		this.oncgangekol = this.oncgangekol.bind(this);
		this.oncgangesklad = this.oncgangesklad.bind(this);
		this.oncgangecat = this.oncgangecat.bind(this);
		this.submitform = this.submitform.bind(this);
		this.list = this.list.bind(this);
		this.onchagefile = this.onchagefile.bind(this);
		this.onchagepozis = this.onchagepozis.bind(this); 
	}

	componentWillMount() {
		axios
			.post('/admin/category')
			.then((response) => {
				this.setState({
					category: response.data,
					cat: response.data[0].id
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.then(function() {});
	}

	oncgangetitle(e) {
		let title = e.target.value;
		if (title.length < 5) {
			this.setState({
				inptitle: title,
				invtitle: 'is-invalid',
				clastitle: 'invalid-feedback',
				erortile: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inptitle: title,
				invtitle: 'is-valid',
				clastitle: 'valid-feedback',
				erortile: 'Поле введено коректно'
			});
		}
	}

	oncgangeart(e) {
		let art = e.target.value;
		if (art.length < 2) {
			this.setState({
				inpart: art,
				invart: 'is-invalid',
				clasart: 'invalid-feedback',
				erorart: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpart: art,
				invart: 'is-valid',
				clasart: 'valid-feedback',
				erorart: 'Поле введено коректно'
			});
		}
	}

	oncgangeproiz(e) {
		let title = e.target.value;
		if (title.length < 5) {
			this.setState({
				inpproiz: title,
				invproiz: 'is-invalid',
				clasproiz: 'invalid-feedback',
				erorproiz: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpproiz: title,
				invproiz: 'is-valid',
				clasproiz: 'valid-feedback',
				erorproiz: 'Поле введено коректно'
			});
		}
	}

	oncgangecount(e) {
		let title = e.target.value;
		if (title.length < 3) {
			this.setState({
				inpcount: title,
				invcount: 'is-invalid',
				clascount: 'invalid-feedback',
				erorcount: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpcount: title,
				invcount: 'is-valid',
				clascount: 'valid-feedback',
				erorcount: 'Поле введено коректно'
			});
		}
	}

	oncgangeob(e) {
		let title = e.target.value;
		if (title.length <= 0) {
			this.setState({
				inpob: title,
				invob: 'is-invalid',
				clasob: 'invalid-feedback',
				erorob: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpob: title,
				invob: 'is-valid',
				clasob: 'valid-feedback',
				erorob: 'Поле введено коректно'
			});
		}
	}

	oncgangeyp(e) {
		let title = e.target.value;
		if (title.length < 5) {
			this.setState({
				inpyp: title,
				invyp: 'is-invalid',
				clasyp: 'invalid-feedback',
				eroryp: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpyp: title,
				invyp: 'is-valid',
				clasyp: 'valid-feedback',
				eroryp: 'Поле введено коректно'
			});
		}
	}

	oncgangesrok(e) {
		let title = e.target.value;
		if (title.length <= 0) {
			this.setState({
				inpsrok: title,
				invsrok: 'is-invalid',
				classrok: 'invalid-feedback',
				erorsrok: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpsrok: title,
				invsrok: 'is-valid',
				classrok: 'valid-feedback',
				erorsrok: 'Поле введено коректно'
			});
		}
	}

	oncgangetext(evt) {
		var newContent = evt.editor.getData();
		if (title.length < 5) {
			this.setState({
				inptext: newContent,
				invtext: 'is-invalid',
				clastext: 'invalid-feedback',
				erortext: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inptext: newContent,
				invtext: 'is-valid',
				clastext: 'valid-feedback',
				erortext: 'Поле введено коректно'
			});
		}
	}

	oncgangesena(e) {
		let str = e.target.value;
		let int = str.replace(/\D+/g, '');
		if (int.length < 1) {
			this.setState({
				inpsena: int,
				invsena: 'is-invalid',
				classena: 'invalid-feedback',
				erorsena: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpsena: int,
				invsena: 'is-valid',
				classena: 'valid-feedback',
				erorsena: 'Поле введено коректно'
			});
		}
	}

	oncgangesena2(e) {
		let str = e.target.value;
		let int = str.replace(/\D+/g, '');
		if (int.length < 1) {
			this.setState({
				inpsena2: int,
				invsena2: 'is-invalid',
				classena2: 'invalid-feedback',
				erorsena2: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpsena2: int,
				invsena2: 'is-valid',
				classena2: 'valid-feedback',
				erorsena2: 'Поле введено коректно'
			});
		}
	}

	oncgangekol(e) {
		let str = e.target.value;
		let int = str.replace(/\D+/g, '');
		if (int.length < 1) {
			this.setState({
				inpkol: int,
				invkol: 'is-invalid',
				claskol: 'invalid-feedback',
				erorkol: 'Поле введено не коректно'
			});
		} else {
			this.setState({
				inpkol: int,
				invkol: 'is-valid',
				claskol: 'valid-feedback',
				erorkol: 'Поле введено коректно'
			});
		}
	}
	oncgangesklad(e) {
		let sklad = e.target.value;
		this.setState({
			sklad: sklad
		});
	}
	oncgangecat(e) {
		let sklad = e.target.value;
		if (sklad === 'nan') {
			sklad = this.state.cat;
			return false;
		}
		this.setState({
			cat: sklad
		});
	}
	submitform(e) {
		e.preventDefault();

		if (this.state.inptitle.length < 5) {
			this.setState({
				invtitle: 'is-invalid',
				clastitle: 'invalid-feedback',
				erortile: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpart.length < 2) {
			this.setState({
				invart: 'is-invalid',
				clasart: 'invalid-feedback',
				erorart: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpproiz.length < 5) {
			this.setState({
				invproiz: 'is-invalid',
				clasproiz: 'invalid-feedback',
				erorproiz: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpcount.length < 3) {
			this.setState({
				invcount: 'is-invalid',
				clascount: 'invalid-feedback',
				erorcount: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpob.length <= 0) {
			this.setState({
				invob: 'is-invalid',
				clasob: 'invalid-feedback',
				erorob: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpyp.length < 5) {
			this.setState({
				invyp: 'is-invalid',
				clasyp: 'invalid-feedback',
				eroryp: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpsrok.length <= 0) {
			this.setState({
				invsrok: 'is-invalid',
				classrok: 'invalid-feedback',
				erorsrok: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inptext.length < 5) {
			this.setState({
				invtext: 'is-invalid',
				clastext: 'invalid-feedback',
				erortext: 'Поле введено не коректно'
			});
			return false;
		}

		if (this.state.inpsena.length < 1) {
			this.setState({
				invsena: 'is-invalid',
				classena: 'invalid-feedback',
				erorsena: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpsena2.length < 1) {
			this.setState({
				invsena2: 'is-invalid',
				classena2: 'invalid-feedback',
				erorsena2: 'Поле введено не коректно'
			});
			return false;
		}
		if (this.state.inpkol.length < 1) {
			this.setState({
				invkol: 'is-invalid',
				claskol: 'invalid-feedback',
				erorkol: 'Поле введено не коректно'
			});
			return false;
		}
		const tovar = {
			title: this.state.inptitle,
			art: this.state.inpart,
			proiz: this.state.inpproiz,
			count: this.state.inpcount,
			ob: this.state.inpob,
			yp: this.state.inpyp,
			srok: this.state.inpsrok,
			text: this.state.inptext,
			sena: Number(this.state.inpsena),
			sena2: Number(this.state.inpsena2),
			kol: Number(this.state.inpkol),
			sklad: Number(this.state.sklad),
			cat: this.state.cat,
			pozit:this.state.pozis,
			file: this.state.image
		};
		axios
			.post('/admin/addtovar', tovar)
			.then((response) => {
				alert(response.data);
				location.reload();
			})
			.catch((error) => {
				alert('Добавьте новое фото');
			})
			.then(function() {
				// always executed
			});
	}

	list() {
		const list = this.state.category.map((number) => (
			<option key={number.id} value={number.id}>
				{number.title}
			</option>
		));
		return list;
	}
	onchagefile(e) {
		let files = e.target.files || e.dataTransfer.files;
		if (!files.length) return;
		this.createImage(files);
	}
	createImage(file) {
		// обходит файлы используя цикл
		for (var i = 0; i < file.length; i++) {
			const reader = new FileReader();

			reader.onload = (e) => {
				this.setState({
					image: [ ...this.state.image, e.target.result ]
				});
			};
			reader.readAsDataURL(file[i]);
		}
	}
	onchagepozis(e){
		let pozis = e.target.value;
		let int = pozis.replace(/\D+/g, '');
		this.setState({
			pozis:int
		})
	}
	render() {
		return (
			<section className="mt-5">
				<div className="container fonform">
					<div className="row">
						<h3 className="ml-2 mt-3">Добавление товара в магазин</h3>
						<div className="col-md-12 pt-5 pb-5">
							<form onSubmit={this.submitform} encType="multipart/form-data">
								<h4 className="mb-3 mt-3 ">Характеристики</h4>
								<div className="form-row">
									<div className="col-md-4 mb-3">
										<label htmlFor="title">Наименование товара</label>
										<input
											type="text"
											onChange={this.oncgangetitle}
											className={`form-control ${this.state.invtitle}`}
											id="title"
											placeholder="Наименование товара"
											value={this.state.inptitle}
										/>
										<div className={this.state.clastitle}>{this.state.erortile}</div>
									</div>
									<div className="col-md-4 mb-3">
										<label htmlFor="artikle">Артикул</label>
										<input
											type="text"
											onChange={this.oncgangeart}
											className={`form-control ${this.state.invart}`}
											id="artikle"
											placeholder="Артикул"
											value={this.state.inpart}
										/>
										<div className={this.state.clasart}>{this.state.erorart}</div>
									</div>
									<div className="col-md-4 mb-3">
										<label htmlFor="proiz">Производитель</label>
										<div className="input-group">
											<input
												type="text"
												onChange={this.oncgangeproiz}
												className={`form-control ${this.state.invproiz}`}
												id="proiz"
												value={this.state.inpproiz}
												placeholder="Производитель"
											/>
											<div className={this.state.clasproiz}>{this.state.erorproiz}</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div className="col-md-3 mb-3">
										<label htmlFor="country">Страна производства</label>
										<input
											type="text"
											className={`form-control ${this.state.invcount}`}
											onChange={this.oncgangecount}
											id="country"
											placeholder="Страна производства"
											value={this.state.inpcount}
										/>
										<div className={this.state.clascount}>{this.state.erorcount}</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="obem">Объем</label>
										<input
											type="text"
											onChange={this.oncgangeob}
											className={`form-control ${this.state.invob}`}
											id="obem"
											placeholder="Объем"
											value={this.state.inpob}
										/>
										<div className={this.state.clasob}>{this.state.erorob}</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="ypakovka">Упаковка</label>
										<input
											type="text"
											className={`form-control ${this.state.invyp}`}
											id="ypakovka"
											placeholder="Упаковка"
											onChange={this.oncgangeyp}
											value={this.state.inpyp}
										/>
										<div className={this.state.clasyp}>{this.state.eroryp}</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="srok">Срок хранения</label>
										<input
											type="text"
											className={`form-control ${this.state.invsrok}`}
											id="srok"
											placeholder="Срок хранения"
											onChange={this.oncgangesrok}
											value={this.state.inpsrok}
										/>
										<div className={this.state.classrok}>{this.state.erorsrok}</div>
									</div>
								</div>

								<h4 className="mb-3 mt-3 ">Описание</h4>
								<div className="form-row">
									<div className="col-md-12 mb-3">
										<label htmlFor="text">Описание</label>
										<CKEditor
											activeClass="p10"
											content={this.state.inptext}
											events={{
												change: this.oncgangetext
											}}
										/>
										<div className={this.state.clastext}>{this.state.erortext}</div>
									</div>
								</div>
								<h4 className="mb-3 mt-3 ">Цены</h4>

								<div className="form-row">
									<div className="col-md-3 mb-3">
										<label htmlFor="sena">Цена за единицу</label>
										<input
											type="text"
											className={`form-control ${this.state.invsena}`}
											onChange={this.oncgangesena}
											id="sena"
											placeholder="Цена за единицу"
											value={this.state.inpsena}
										/>
										<div className={this.state.classena}>{this.state.erorsena}</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="sena2">Цена за единицу в упаковке</label>
										<input
											type="text"
											className={`form-control ${this.state.invsena2}`}
											onChange={this.oncgangesena2}
											id="sena2"
											placeholder="Цена за единицу в упакоовке"
											value={this.state.inpsena2}
										/>
										<div className={this.state.classena2}>{this.state.erorsena2}</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="kol">Количество единиц в упаковке </label>
										<div className="input-group">
											<input
												type="text"
												className={`form-control ${this.state.invkol}`}
												id="kol"
												placeholder="Количество едениц в упаковке"
												onChange={this.oncgangekol}
												value={this.state.inpkol}
											/>
											<div className={this.state.claskol}>{this.state.erorkol}</div>
										</div>
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="sklad">В наличие </label>
										<div className="input-group">
											<select className="form-control" onChange={this.oncgangesklad} id="sklad">
												<option selected value="1">
													Есть
												</option>
												<option value="2">Нету</option>
											</select>
											<div className="" />
										</div>
									</div>
								</div>

								<div className="form-row">
									<div className="col-md-4 mb-3">
										<label htmlFor="file">Выберите одно или несколько изображений </label>
										<input
											type="file"
											className="form-control-file"
											multiple
											onChange={this.onchagefile}
											id="file"
										/>

										<div className="" />
									</div>
									<div className="col-md-3 mb-3">
										<label htmlFor="cat">Выберите категорию </label>
										<div className="input-group">
											<select className="form-control" onChange={this.oncgangecat} id="cat">
												<option value="nan" selected>
													Выберите категорию{' '}
												</option>

												{this.list()}
											</select>
											<div className="" />
										</div>
										
									</div>
									<div className="col-md-4 mb-3">
										<label htmlFor="pozis">Позиция для сока напишите целое число от 1 числа  </label>
										<input
											type="text"
											className="form-control-file"
											onChange={this.onchagepozis}
											value={this.state.pozis}
											id='pozis'
										/>

										<div className="" />
									</div>
								</div>
								<button className="btn btn-primary mr-1" type="submit">
									Добавить товар
								</button>
								<Link to={`/admin`} className="btn btn-primary" role="button" aria-pressed="true">
									Вернуться в Меню
								</Link>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
