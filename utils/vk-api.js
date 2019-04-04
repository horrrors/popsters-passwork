const request = require('request-promise')

//simple class for using api vk
class vkApi {
    constructor(token, ver) {
        this.params = {
            'access_token': token, //access token for vk api
            'v': ver || '5.92'           //version of api
        }
        if (token == undefined) throw(new Error('Set auth token please'))
    }

    async method(name, args) {
        //method for request vk api
        return await request({
            uri: `https://api.vk.com/method/${name}`,
            qs: { ...this.params, ...args },
            json: true,
        })
    }

}

module.exports = vkApi;





