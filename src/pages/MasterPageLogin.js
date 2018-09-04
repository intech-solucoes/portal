import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login, EsqueciSenha, ListarParticipantes } from ".";

export default class MasterPageLogin extends React.Component {
	render() {
		return (
			<div className="panel-login middle-box">
				<Router basename={process.env.PUBLIC_URL}>
					<div>
						<Route exact path="/" component={Login} />
						<Route path="/esqueciSenha" component={EsqueciSenha} />
						<Route path="/listarParticipantes" component={ListarParticipantes} />
					</div>
				</Router>
			</div>
		)
	}
}
