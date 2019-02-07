import React, { Component } from "react";

export default class Box extends Component {
    render() {
        return (
            <div className="box">
                {this.props.titulo &&
                    <div className="box-title">
                        {this.props.titulo}
                    </div>
                }

                <div className="box-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}