import React from "react";
import Header from "./Header";

export default class NotFound extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <section className="error-container">

                    <span><span>4</span></span>
                    <span>0</span>
                    <span><span>4</span></span>
                    <h3>Страница не найдена</h3>
                </section>


            </div>
        )
    }
}