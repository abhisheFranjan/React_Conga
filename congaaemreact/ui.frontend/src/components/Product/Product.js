import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import NoImage from '../../media/No-image-found.jpg';
// include product style file
require('./Product.scss');

export const ProductEditConfig = {

    emptyLabel: 'Product',

    isEmpty: function(props) {
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class Product extends Component {


 constructor() {
    super();
    this.state = {
        data: [],
    };
}

  componentDidMount() {
    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjAzMDU3MjMsImV4cCI6MTY2MDMwOTMyMywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiIyM0JCRERDMDU3MkFCQUU3OUNGRDA1NDlCRkEzRTlFNCIsImlhdCI6MTY2MDMwNTcyMywic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.ElVL8_DRbRSvS5K9zF8iPxWkXCFFGm8JQbnmwvoqbDbTGLgtsn3S080qHWR4PwrU1fuPZWNLrL5NCwzVA12ZTT6DhOxpGKrH9Nwm2_Z3EvABKuxptszR8e-PxCFVCW4j4QGkEh0p10DubqdOnV-YHbdmCjtUNZ9jzYTaGGffaAd7ANbWv7DfT4tAl02baMkL-LEhX8J3RDkEjw8wNh4Tf4p9SfmqD3DXSbl4R2a6_ohRs0yhlVLpS30OS3ADy1Fy9bnJybpFgUh5L-iw_gpIVcUO9FXDGHa2QayiC6YOeuLYZ0URZDA3eoQV9rxwDpvAqCdGlA-Fwi_10FZkZDJgRA";
    fetch(
      "https://rlp-qa.congacloud.io/api/catalog/v1/products?includes=prices",
      {
        method: "GET",
        headers: {
              "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          pricelistid: "62ad6108-6abc-465c-b137-3bd3327a2fe6",
          OrganizationId: "a5b2b6fe-02b7-47aa-b7ec-ecb619cc2f23",
          OrganizationFriendlyId: "rlp-qa-org2",
          UserId: "89761836-4d5e-4716-a320-764fedf7c0e8"
        }
      }
    )
    .then(results => results.json())
        .then(data => this.setState({ data: data }))
        //.then(console.log(this.state.data))
    .catch((err) => {
      console.log("error", err);
    });
  }


    render() {
 console.log(this.state.data);

        if(ProductEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
        <div className="wrapper">
        {
          this.state.data.map(record => {
            return(
                <div className="card" key={ record.Id }>
                <div className="card__body">
                    <h5 className="card__title">{record.Name}</h5>
                    <img src={record.ImageURL !== 'NULL' ? record.ImageURL : NoImage} class="card__image"/>
                    <p className="card__description">Standard Price</p>


                    { record.Prices && record.Prices.map(price=> {
                        return(
                        <div className="card__price" key={ record.Id }>
                            ${price.ListPrice}
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