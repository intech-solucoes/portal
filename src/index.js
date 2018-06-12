import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";

import { MasterPage, MasterPageLogin } from "./pages";

var page;
var loggedIn = localStorage.getItem("token");

if(loggedIn)
	page = <MasterPage />
else
	page = <MasterPageLogin />

ReactDOM.render(page, document.getElementById("root"));

registerServiceWorker();
