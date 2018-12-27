import React, { Component } from "react";

export default class PageClean extends Component {
	render() {
		return (
			<div className="panel-login middle-box">
				<div className="logo">
                    <img src="./imagens/logo.png" alt="Logo" />
                </div>

				{this.props.children}

				<br/>
				<br/>
			</div>
		)
	}
}
