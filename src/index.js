import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";

const config = require("./config.json");

const Rotas = require(`./pages/${config.cliente}/Rotas`).default;
const RotasAdmin = require(`./pages/_admin/Rotas`).default;

class MainRender extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					{ Rotas.map((rota, index) => <Route key={index} exact={rota.exact} path={rota.caminho} component={rota.componente} />) }
					{ RotasAdmin.map((rota, index) => <Route key={index} exact={rota.exact} path={rota.caminho} component={rota.componente} />) }
				</Switch>
			</HashRouter>
		);
	}
}

ReactDOM.render(<MainRender />, document.getElementById("root"));