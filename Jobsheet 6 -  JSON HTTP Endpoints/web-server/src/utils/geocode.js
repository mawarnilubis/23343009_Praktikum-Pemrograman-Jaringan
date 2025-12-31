const request = require('postman-request');

const geocode = (address, callback) => {
    const place = encodeURIComponent(address);
    const url = `${process.env.MAP}/search?q=${place}&format=json`;
    request(
        {
            url, json: true,
            headers: { 'User-Agent': 'NetworkProgramming-Project/1.0' }
        },
        (err, res) => {
            if(err) callback('Tidak dapat terkoneksi ke layanan', undefined);
            else if(res.body.length === 0) callback('Tidak dapat menemukan lokasi. Lakukan pencarian lokasi yang lain', undefined);
            else {
                callback(undefined, {
                    latitude: res.body[0].lat,
                    longitude: res.body[0].lon,
                    location: res.body[0].display_name,
                });
            }
        }
    );
}

module.exports = geocode;