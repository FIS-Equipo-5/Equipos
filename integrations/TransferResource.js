const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json:true});

class TransferResource {
    /*Método que devuelve la url completa del recurso solicitado, recibiendo como parámetro el path del recurso*/
    static teamsUrl(resourceUrl){
        const teamsServer = (process.env.TRANSFER_URL || "https://mercadofichajes.herokuapp.com/api/v1");
        return urljoin(teamsServer, resourceUrl);
    }

    /* Ejemplo de uso de request */
    static getPlayerTransfers(player_id, token){
        const url = TransferResource.teamsUrl("/transfers/player/" + player_id);
        const options = {
            headers: {'x-access-token': token},
            json: true
        }
        return request.get(url, options);
    }

}

module.exports = TransferResource;