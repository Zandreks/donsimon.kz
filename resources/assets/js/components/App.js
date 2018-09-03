import React from 'react'
import Routeuser from './Routeuser'
import "jquery/dist/jquery"
import 'bootstrap/dist/css/bootstrap.css';
import "../css/style.css"
import "../css/animate.min.css"
import "@fancyapps/fancybox/dist/jquery.fancybox.css"
import "@fancyapps/fancybox/dist/jquery.fancybox"
import Footer from "./Footer";
import Modal from "./Modal"
import CKEditor from 'react-ckeditor-component';

export default class App extends React.Component {

    render() {
        return (
            <div className="wraper">
                <Routeuser/>
                <Footer/>
                <Modal/>
            </div>

        );
    }
}
