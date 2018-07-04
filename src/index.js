import React from "react";
import ReactDOM from "react-dom";

import { IntlProvider, addLocaleData } from 'react-intl';
import pt from 'react-intl/locale-data/pt';
import en from 'react-intl/locale-data/en';

import { MasterPage, MasterPageLogin } from "./pages";
 
addLocaleData([...pt, ...en]);

var page;
var loggedIn = localStorage.getItem("token");

if(loggedIn)
{
	page = (
		<IntlProvider locale="pt">
			<MasterPage />
		</IntlProvider>
	);
}
else {
	page = (
		<IntlProvider locale="pt">
			<MasterPageLogin />
		</IntlProvider>
	);
}

ReactDOM.render(page, document.getElementById("root"));
