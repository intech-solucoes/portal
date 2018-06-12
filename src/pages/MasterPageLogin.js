import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from ".";

export default class MasterPageLogin extends React.Component {
	render() {
		return (
			<div className="panel-login middle-box">
				<Router>
					<div>
						<Route exact path="/" component={Login} />
					</div>
				</Router>
			</div>
		)
	}
}
