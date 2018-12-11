import React, { Component } from "react";

export default class Row extends Component {
    render() {
        var className = "row";

        if(this.props.className)
            className += " " + this.props.className;

        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}