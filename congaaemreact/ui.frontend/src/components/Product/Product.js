import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import productsData from '../../products.json';

// include product style file
require('./Product.scss');

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


//            <div className="product-card">
//                {
//                productsData.map(record => {
//                    return(
//                        <div className="product-box">
//                            {record.Name}
//                            {record.ProductCode}
//                            <img class="product-img" src={record.ImageURL}/>
//                        </div>
//                    )
//                })
//                }
//            </div>


        <div className="wrapper">
        {
          productsData && productsData.map(record => {
            return(
                <div className="card" key={ record.Id }>
                <div className="card__body">
                    <h5 className="card__title">{record.Name}</h5>
                    <img src={record.ImageURL}
                    class="card__image"/>
                    <p className="card__description">Standard Price</p>


                    { record.Prices && record.Prices.map(data => {
                        return(
                        <div className="card__price" key={ record.Id }>
                            ${data.ListPrice}
                        </div>
                        )
                    })}

                </div>
                <hr/>
                <div class="align-items-center d-flex justify-content-center input-group-sm ng-star-inserted">
                <label class="mr-3">Quantity</label>
                <input type="number" min="1" name="quantity" class="form-control w-25"/>
                </div>
                <button className="card__btn">Add to Cart</button>
                </div>
            )
        })
        }
        </div>


        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);
