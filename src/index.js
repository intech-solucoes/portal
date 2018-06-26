import React from "react";
import ReactDOM from "react-dom";

import { MasterPage, MasterPageLogin } from "./pages";

//import registerServiceWorker from './registerServiceWorker';

var page;
var loggedIn = localStorage.getItem("token");

if(loggedIn)
{
	console.log('render home');
	page = <MasterPage />
}
else {
	console.log('render login');
	page = <MasterPageLogin />
}

ReactDOM.render(page, document.getElementById("root"));

//registerServiceWorker();
