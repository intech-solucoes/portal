import React from 'react';

function col(valor) {
    if(valor)
        return "col-" + valor;
    else
        return "col";
}

var FormFieldStatic = (props) => (

    <div className={"form-group " + col(props.col)}>
        <label className="text-primary">{props.titulo}</label>
        <label className="form-control-plaintext">{props.valor}</label>
        <a href="">{props.link}</a>
    </div>
);

export default FormFieldStatic;
