import React, { Component } from 'react';
import { PageClean } from ".";

export default class ListarParticipantes extends Component {

    render() {
        return (
            <PageClean {...this.props}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="box">
                            <div className="box-title">
                                Listagem de Participantes
                            </div>
                        </div>
                    </div>
                </div>
            </PageClean>
        );
    }
    
}