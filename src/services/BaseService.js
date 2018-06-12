import axios from "axios";

var config = require("../config");

export default class BaseService {
    CriarRequisicao(tipo, url, data) {
        return axios({
            method: tipo,
            url: config.apiUrl + url,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    }
}
