import React, { Component } from "react";

export default class Col extends Component {
    render() {
        var tamanho = this.props.tamanho;
        var className = tamanho ? `col-${tamanho}` : "col";

        if(this.props.className)
            className += " " + this.props.className;
    
        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}