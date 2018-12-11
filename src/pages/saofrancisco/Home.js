import React, { Component } from "react";
import { Page } from "../";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.page = React.createRef();
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <h1>Home São Francisco</h1>
            </Page>
        );
    }
}