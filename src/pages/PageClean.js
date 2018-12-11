import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login, EsqueciSenha, ListarParticipantes } from ".";

export default class PageClean extends Component {
	render() {
		return (
			<div className="panel-login middle-box">
				<div className="logo">
                    <img src="./imagens/saofrancisco/logo.png" alt="São Francisco" />
                </div>

				{this.props.children}

				<br/>
				<br/>
			</div>
		)
	}
}
