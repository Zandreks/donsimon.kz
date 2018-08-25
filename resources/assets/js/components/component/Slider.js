import React from 'react'

export default class Slider extends React.Component{
    render(){
        return(
            <section className="slider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">

                    </ol>
                    <div className="carousel-inner" id="">

                        <div className="carousel-item text-center active" id="">
                            <img className="d-bloc " src="/img/slider/1.jpg" alt="Second slide"/>

                        </div>
                        <div className="carousel-item text-center" id="">
                            <img className="d-bloc " src="/img/slider/2.jpg" alt="Second slide"/>

                        </div>
                        <div className="carousel-item text-center" id="">
                            <img className="d-bloc " src="/img/slider/3.jpg" alt="Second slide"/>

                        </div>



                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </section>
        )
    }

}