import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Row extends Component {
    static propTypes = {
        formGroup: PropTypes.bool
    }

    render() {
        var formGroup = this.props.formGroup ? "form-group" : "";

        return (
            <div className={this.props.className + " row " + formGroup}>
                {this.props.children}
            </div>
        )
    }
}