import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';

export const CategoryEditConfig = {

    emptyLabel: 'Category',

    isEmpty: function(props) {
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class Category extends Component {


 constructor() {
    super();
    this.state = {
        data: [],
    };
}

  componentDidMount() {

    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjAyOTc5NTcsImV4cCI6MTY2MDMwMTU1NywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI5OTcxRkFDM0JFMEMzMzE0RTAyMjBBOEQ5MERBNDM3MSIsImlhdCI6MTY2MDI5Nzk1Nywic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.UNHT8TvD-rV30qfBsz7ESlLoUQxQbhD0utzw4V3bfKxAf2JC7OwAFux6COr8HFoOMW2n9LbniZ6xzqgrtDxERg4kmc_u4fJcqVGqCcFra2sHbWqxkMOV__RWIBiMLaq7xYpmeDa7YtjUh-ToUK8gO9kvr6UXc-CrxHi8eL9RL3Me__83NUkJNqnscJ8Jk6ST0PHgydQeJoPVXny1b9C351pqIWnMYyomptDlrllKJ72SuUCFuYYMyl3ZL376MfuavNYoqDq6OeanUIlW_8vj-vYxpW9cBnaeVKa-lrXjP_rgdrp7Ot_12L22i1tFs0JJln0XwvXyLrLpgy0ZyDbtCw";

    fetch(
      "https://rlp-qa.congacloud.io/api/catalog/v1/categories",
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
    .catch((err) => {
      console.log("error", err);
    });
  }


    render() {
 console.log(this.state.data);


        if(CategoryEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
        <div className="wrapper">
                {
            this.state.data.map(record => {
            return(
            <div>
                <h1>{record.Name}</h1>
                <a>{record.Label}</a>
                <p>{record.Description}</p>
            </div>
            )

            })
                    }
        </div>

        );
    }
}

MapTo('congaaemreact/components/category')(Category, CategoryEditConfig);