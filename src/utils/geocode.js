const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&units=metric&APPID=c8567bd75bb265d351138e3a13de6035'

    request(url, {json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.cod !== 200) {
            callback('There was an error in the request, Error: ' + body.cod)
        } else if (body.features && body.features.length === 0) {
            callback('There was an error in the request, Place not found')
        } else {
            callback(undefined, {
                lattitude: body.coord.lat,
                longtitude: body.coord.lon
            })
        }
    })
}

module.exports= {'geocode': geocode}