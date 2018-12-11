import React, { Component } from "react";
import { Page } from "../";

export default class Planos extends Component {

    constructor(props) {
        super(props);

        this.page = React.createRef();
    }

    render() {
        return (
            <Page {...this.props} ref={this.page}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box">
                            <div className="box-content">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Plano</th>
                                            <th>Situação</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>BENEFÍCIO DEFINIDO</td>
                                            <td><div className="label label-sucess">ASSISTIDO</div></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>CONTRIBUIÇÃO DEFINIDA</td>
                                            <td><div className="label label-sucess">ATIVO</div></td>
                                            <td><a href="" id="plan-extract">Extrato</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Page>
        );
    }

}
