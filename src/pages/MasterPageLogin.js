import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Login, EsqueciSenha, ListarParticipantes } from ".";

export default class MasterPageLogin extends React.Component {
	render() {
		return (
			<div className="panel-login middle-box">
				<HashRouter basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/esqueciSenha" component={EsqueciSenha} />
						<Route path="/listarParticipantes" component={ListarParticipantes} />
					</Switch>
				</HashRouter>
			</div>
		)
	}
}
