import React from "react";
import LoginForm from "../_shared/LoginForm";

const LoginPage = () => (
    <div>
        <div class="logo">
            <img src="./imagens/regius/logo.png" alt="Regius" />
        </div>

        <h4>Bem vindo ao portal da Regius</h4>

        <h5>
            <b>Área de Acesso Restrito</b><br />
            Para informações, entre em contato com a  Gerência de Previdência e Relacionamento - GEPRE<br />
            <br />
            Telefone: (61) 3035-4400
        </h5>

        <LoginForm mostrarPrimeiroAcesso={true} />
    </div>
);

export default LoginPage;
