import React from 'react';

export default class TrocarSenha extends React.Component {
    
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="box">
                        <div className="box-content">
                            <form className="validatedForm">
                                <div className="form-group row">
                                    <label htmlFor="senha-antiga" className="col-sm-2 col-form-label"><b>Senha antiga:</b></label>
                                    <div className="col-sm-10">
                                        <input id="senha-antiga" className="form-control" type="password"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="senha-nova" className="col-sm-2  col-form-label"><b>Nova senha:</b></label>
                                    <div className="col-sm-10">
                                        <input id="senha-nova" className="form-control" type="password"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="confirmar-senha" className="col-sm-2  col-form-label"><b>Confirme nova senha:</b></label>
                                    <div className="col-sm-10">
                                        <input id="confirmar-senha" className="form-control" type="password"></input>
                                    </div>
                                </div>
                                <hr />
                                <button type="submit" id="trocar-senha" className="btn btn-primary">Trocar Senha</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
