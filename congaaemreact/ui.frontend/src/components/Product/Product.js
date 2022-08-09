import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import productsData from '../../products.json';

export const ProductEditConfig = {

    emptyLabel: 'Product',

    isEmpty: function(props) {
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class Product extends Component {

    render() {

//        fetch('https://jsonplaceholder.typicode.com/todos/1')
//        .then(response => response.json())
//        .then(json => console.log());

        if(ProductEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
//            <div className="ProductComponent">
//                <h2 className="ProductComponent__message">{this.props.message}</h2>
//            </div>


            <div className="product-card">
                {
                productsData.map(record => {
                    return(
                        <div className="product-box">
                            {record.Name}
                            {record.ProductCode}
                            <img class="product-img" src={record.ImageURL}/>
                        </div>
                    )
                })
                }
            </div>


        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);
