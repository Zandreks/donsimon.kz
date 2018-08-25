import React from "react"
import axios from "axios";

export default class Listofrml extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:{}, img:[]};

    }
    componentWillMount() {

        axios.post('/tovar', {
            id: this.props.id
        })
            .then((response)=> {
                let img = response.data.img.split(' ');

                this.setState({
                    data: response.data,
                    img: img
                })
            })
            .catch( (error)=> {
                this.forceUpdate();

                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }
    render() {
        return (
            <tr  >
                <th data-label="Тип товара" scope="row"><img src={`/img/sokis/${this.state.img[0]}`}
                                                             className="img-kar img-thumbnail "/></th>
                <td data-label="Наименование">{this.state.data.title}</td>
                <td data-label="Количество">
                    {this.props.val}
                </td>
                <td data-label="Цена за еденицу">{(this.props.option === 'ed')? this.state.data.sena+" тг за еденицу":this.state.data.sena2 * this.state.data.kolichestvo + " тг за упаковку"}</td>


            </tr>
        );
    }
}