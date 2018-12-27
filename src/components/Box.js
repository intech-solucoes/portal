import React, { Component } from "react";

import { Col, Row } from "./";

export default class Box extends Component {
    static defaultProps = {
        renderRow: true
    }

    renderBox = () => {
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

    render() {
        if(this.props.renderRow) {
            return (
                <Row>
                    <Col>
                        {this.renderBox()}
                    </Col>
                </Row>
            );
        } else {
            this.renderBox();
        }
    }

}