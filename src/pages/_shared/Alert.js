import React from "react";

const Alert = (props) => (
    <div id="alert" className={"alert alert-" + props.tipo}>
        {props.mensagem}
    </div>
);

export default Alert;