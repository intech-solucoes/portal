import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
import Rotas from './pages/saofrancisco/Rotas';

class MainRender extends Component {
	render() {
		return (
			<HashRouter basename={process.env.PUBLIC_URL}>
				<Switch>
					{ Rotas.map((rota, index) => <Route key={index} exact={rota.exact} path={rota.caminho} component={rota.componente} />) }
				</Switch>
			</HashRouter>
		);
	}
}

ReactDOM.render(<MainRender />, document.getElementById("root"));
