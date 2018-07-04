import React from 'react';

var ReactIntl = require('react-intl');
var FormattedNumber = ReactIntl.FormattedNumber;

function col(valor) {
    if(valor)
        return "col-" + valor;
    else
        return "col";
}

var FormFieldStatic = (props) => (

    <div className={"form-group " + col(props.col)}>
        <label className="text-primary">{props.titulo}</label>

        {props.dinheiro &&
            <div className="form-control-plaintext">
                <FormattedNumber value={props.valor} currency="BRL" style="currency" />
            </div>
        }

        {!props.dinheiro &&
            <label className="form-control-plaintext">{props.valor}</label>}

        <a href="">{props.link}</a>
    </div>
);

export default FormFieldStatic;
