const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const lat = encodeURIComponent(latitude);
    const lon = encodeURIComponent(longitude);
    const url = `${process.env.WEATHER}/current?access_key=${process.env.API_KEY}&query=${lat},${lon}&units=m`;
    
    request(
        { url, json: true },
        (err, res) => {
            if(err) callback('Tidak dapat terkoneksi ke layanan', undefined);
            else if(res.body.error) callback('Tidak dapat menemukan lokasi', undefined);
            else {
                const { current } = res.body;
                console.log(current);
                
                callback(undefined,
                    `Info cuaca ${current.weather_descriptions[0]}. ${current.temperature} derajat. Index UV adalah ${current.uv_index} nm. Visiblitas ${current.visibility} kilometer.`
                );
            }
        }
    );
}

module.exports = forecast;