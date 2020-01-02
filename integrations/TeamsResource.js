const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json:true});

class TeamsResource {
    /*Método que devuelve la url completa del recurso solicitado, recibiendo como parámetro el path del recurso*/
    static teamsUrl(resourceUrl){
        const teamsServer = (process.env.TEAMS_URL || "https://mercadofichajes.herokuapp.com/api/v1/");
        return urljoin(teamsServer, resourceUrl);
    }

    /*Método para añadir parámetros a las cabeceras*/
    static requestHeaders(){
        const teamsToken = ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGUyMzVjOWRmYzRkMDAwZmRiMDdiOCIsImlhdCI6MTU3Nzk5NDIyMiwiZXhwIjoxNTc3OTk3ODIyfQ.SIghSPj6QynnSuMM6XSKUq1fxcQJRpnCQTgNJWvC8NM');
        return {'x-access-token': teamsToken};
    }

    /* Ejemplo de uso de request */
    static getPlayerTransfers(player_id){
        const url = TeamsResource.teamsUrl("/transfers/player/" + player_id);
        const options = {
            headers: TeamsResource.requestHeaders(),
            json: true
        }
        return request.get(url, options);
    }

}

module.exports = TeamsResource;