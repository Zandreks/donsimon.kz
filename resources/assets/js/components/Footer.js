import React from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-12 pt-2 text-center">
                            <h2 className="pt-1 pb-1"> <Link to={'/home/about'} className="aboutcolor">Немного информации о нас</Link></h2>
                            <hr/>
                            <p className="footer-trext">
                               Наши контакты <br/>
                                Адрес: РК, 010000, г.Астана, пр.Абая, 8/1, ВП 12
                                <br/>
                                тел.: <a href="tel:+77710850808">+7(771) 085-08-08</a>
                                <br/>
                            </p>

                        </div>
                        <div className="col-md-6 copy">
                            <p>
                                Все права защищены &copy; 2018
                            </p>
                        </div>
                        <dib className="col-md-6">
                            <p className="oplfooter">
                                Принимаем к оплате <img src="/img/visa.svg" alt=""/> <img src="/img/master.svg" alt=""/>

                            </p>
                        </dib>
                    </div>
                </div>


            </footer>
        )
    }
}