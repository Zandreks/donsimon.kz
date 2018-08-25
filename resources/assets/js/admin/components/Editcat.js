import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Editcat extends React.Component {

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
            image: []

        }
        this.oncgangetitle = this.oncgangetitle.bind(this)
        this.submitform = this.submitform.bind(this)
        this.onchagefile = this.onchagefile.bind(this)
        this.delet = this.delet.bind(this)

    }


    delet(id){

        axios.post('/admin/delcategory',{
            id: id
        }).then((response)=> {
            alert("Категория удалена")
            window.location.replace("/admin/category");

        })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }    componentWillMount(){
      axios.post('/admin/editcat',{
            id:this.props.match.params.id
        })
            .then((response)=> {
                this.setState({
                    inptitle:response.data.title,
                })

            })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    oncgangetitle(e){
        let title = e.target.value
        if (title.length<5){
            this.setState({
                inptitle:title,
                invtitle:'is-invalid',
                clastitle:'invalid-feedback',
                erortile:'Поле введено не коректно'
            })
        }else {
            this.setState({
                inptitle:title,
                invtitle:'is-valid',
                clastitle:'valid-feedback',
                erortile:'Поле введено коректно'
            })
        }
    }


    submitform(e) {
        e.preventDefault()

        if (this.state.inptitle.length < 5) {
            this.setState({

                invtitle: 'is-invalid',
                clastitle: 'invalid-feedback',
                erortile: 'Поле введено не коректно'
            })
            return false
        }
        const tovar ={
            id:this.props.match.params.id,
            title:this.state.inptitle,
            file:this.state.image
        }
        axios.post('/admin/editcae',tovar)
            .then((response)=> {
                alert(response.data)
                location.reload()

            })
            .catch((error)=> {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }
    onchagefile(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files);

    }
    createImage(file) {


        // обходит файлы используя цикл
        for (var i = 0; i < file.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.setState({
                    image:[...this.state.image, e.target.result]
                })
            };
            reader.readAsDataURL(file[i]);

        }

    }
    render() {
        return (
            <section className='mt-5'>
                <div className="container fonform">
                    <div className="row">
                        <h3 className='ml-2 mt-3'>Добавление категории в магазин</h3>
                        <div className="col-md-12 pt-5 pb-5" >
                            <form onSubmit={this.submitform} >
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title">Наименование </label>
                                        <input type="text" onChange={this.oncgangetitle} className={`form-control ${this.state.invtitle}`} id="title"
                                               placeholder="Наименование " value={this.state.inptitle} />
                                        <div className={this.state.clastitle}>
                                            {this.state.erortile}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="file">Выберите одно изображений  </label>
                                        <input type="file" className="form-control-file" onChange={this.onchagefile}  id="file"/>

                                        <div className="">

                                        </div>
                                    </div>

                                </div>
                                <button className="btn btn-primary mr-2"  type="submit">Применить Изменения</button>
                                <Link to={`/admin`} className="btn btn-primary" role="button" aria-pressed="true">Вернуться в Меню</Link>
                                <button type="button" onClick={()=>this.delet(this.props.match.params.id)} className="btn btn-danger ml-2">Удалить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}