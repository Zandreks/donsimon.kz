import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Skidka extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inptitle: '',
            invtitle: '',
            clastitle: '',
            erortile: '',
            inpti: '',
            invti: '',
            clasti: '',
            erorti: '',
            inpart: '',
            invart: '',
            clasart: '',
            erorart: '',
            image: [],
            time:''

        }
        this.oncgangetitle = this.oncgangetitle.bind(this)
        this.oncgangetime = this.oncgangetime.bind(this)
        this.submitform = this.submitform.bind(this)

    }
    oncgangetitle(e){
        let str = e.target.value
        let int = str.replace(/\D+/g,'')

        if (int.length<=0){
            this.setState({
                inptitle:int,
                invtitle:'is-invalid',
                clastitle:'invalid-feedback',
                erortile:'Поле введено не коректно'
            })
        }else {
            this.setState({
                inptitle:int,
                invtitle:'is-valid',
                clastitle:'valid-feedback',
                erortile:'Поле введено коректно'
            })
        }
    }
    oncgangetime(e){
        let str = e.target.value
        let int = str.replace(/\D+/g,'')

        if (int.length<=0){
            this.setState({
                time:int,
                invti:'is-invalid',
                clasti:'invalid-feedback',
                erorti:'Поле введено не коректно'
            })
        }else {
            this.setState({
                time:int,
                invti:'is-valid',
                clasti:'valid-feedback',
                erorti:'Поле введено коректно'
            })
        }
    }


    submitform(e) {
        e.preventDefault()

        if (this.state.inptitle.length <=0) {
            this.setState({

                invtitle: 'is-invalid',
                clastitle: 'invalid-feedback',
                erortile: 'Поле введено не коректно'
            })
            return false
        }

        if (this.state.time.length <=0) {
            this.setState({

                invti: 'is-invalid',
                clasti: 'invalid-feedback',
                erorti: 'Поле введено не коректно'
            })
            return false
        }
        const tovar ={
            int:Number(this.state.inptitle),
            time:Number(this.state.time)
        }
        axios.post('/admin/addskid',tovar)
            .then((response)=> {
                alert(response.data)
                location.reload()

            })
            .catch((error)=> {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    }
    componentWillMount(){
        axios.post('/admin/editskid')
            .then((response)=> {
                this.setState({
                    inptitle:response.data.skid,
                    time:response.data.time/86400
                })
                console.log(response.data.time/84000)
            })
            .catch((error)=> {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
    }
    render() {
        return (
            <section className='mt-5'>
                <div className="container fonform">
                    <div className="row">
                        <h3 className='ml-2 mt-3'>Скидки</h3>
                        <div className="col-md-12 pt-5 pb-5" >
                            <form onSubmit={this.submitform} >
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title">Введите процент скидки целое число без знака процента </label>
                                        <input type="text" onChange={this.oncgangetitle} className={`form-control ${this.state.invtitle}`} id="title"
                                               placeholder="Введите процент скидки целое число без знака процента " value={this.state.inptitle} />
                                        <div className={this.state.clastitle}>
                                            {this.state.erortile}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title">Введите количество дней скидки целое число  </label>
                                        <input type="text" onChange={this.oncgangetime} className={`form-control ${this.state.invti}`} id="title"
                                               placeholder="Введите количество дней целое число " value={this.state.time} />
                                        <div className={this.state.clasti}>
                                            {this.state.erorti}
                                        </div>
                                    </div>

                                </div>
                                <button className="btn btn-primary mr-2"  type="submit">Изменить</button>
                                <Link to={`/admin`} className="btn btn-primary" role="button" aria-pressed="true">Вернуться в Меню</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}