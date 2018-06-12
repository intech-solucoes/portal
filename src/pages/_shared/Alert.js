import React from "react";

const Alert = (props) => (
    <div className={"alert alert-" + props.tipo}>
        {props.mensagem}
    </div>
);

export default Alert;