import React, { Component } from "react";

class PeopleListItem extends Component {
    render(){
        return (
            <div>
                <div className="category">Category: {this.props.category}</div>
                <div className="price">${this.props.price}</div>
                <img src="{this.props.image}" />
                <div className="product-name">{this.props.name}</div>
            </div>
        );
    }
}