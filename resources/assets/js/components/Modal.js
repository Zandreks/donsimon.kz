import React from "react"
import { Link } from 'react-router-dom'
export default class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.HandelClick = this.HandelClick.bind(this);

    }
    HandelClick(){
        $('#exampleModal').modal('hide')


    }
    render(){
        return(

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Заказ товара</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Вы положили товар в корзину! хотите продолжить ?
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-outline-success" data-dismiss="modal">Продолжить
                            </button>
                            <Link type="button" to="/home/karzina" onClick={this.HandelClick()}  className="btn btn-primary">Перейти
                                в корзину</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}