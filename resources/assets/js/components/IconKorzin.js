import React from 'react'

export default class IconKorzin extends React.Component {
   

    constructor(props) {
        super(props);
        this.state = {int: 0};

    }


    componentDidMount() {
        if (localStorage.getItem("karzina") != null) {
            let returnObj = JSON.parse(localStorage.getItem("karzina"));
            let int = returnObj.length;
            this.setState({
                int: int
            })
        }
    }
        render()
        {
            return (
                <i className="fas fa-shopping-cart "><span className="colum-chet ml-3 iconNumver " >{this.state.int}</span></i>
            );
        }

}