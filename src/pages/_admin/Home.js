import React, { Component } from 'react'

import PageAdmin from "./PageAdmin";

import { Row, Col } from "../../components";

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.page = React.createRef();
    }

    render() {
        return (
            <PageAdmin {...this.props} ref={this.page}>
                


            </PageAdmin>
        )
    }
}