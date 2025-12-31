// const request = require('postman-request');

// const url = `http://api.weatherstack.com/current?access_key=9c1b3a3b00ed8d8e3cb8452370bc20d4&query=Padang Barat`;

// request(
//     {url},
//     (err, res) => {
//         if (err)
//             return console.log('Gagal mendapatkan data cuaca.');

//         const { request, location } = JSON.parse(res.body);
//         const query = request.query;
//         const place_name = `${location.name}, ${location.region}, ${location.country}`;
//         const place_type = request.type;
        
//         console.log(`data yang anda cari adalah: ${query}`)
//         console.log(`data yang ditemukan adalah: ${place_name}`)
//         console.log(`tipe lokasi adalah: ${place_type}`)
//     }
// );


// const request = require('postman-request');

// const place = encodeURIComponent('Padang Barat');
// const geocodeURL = `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=3`;

// request(
//     {
//         url: geocodeURL,
//         json: true,
//         headers: { 'User-Agent': 'NetworkProgramming-Project/1.0' }
//     },
//     (err, res) => {
//         if(err || res.body.length === 0)
//             return console.log('Gagal mendapatkan lokasi');

//         const { display_name, type } = res.body[0];
//         console.log(`data yang anda cari adalah: ${decodeURIComponent(place)}`);
//         console.log(`data yang ditemukan adalah: ${display_name}`);
//         console.log(`tipe lokasi adalah: ${type}`);
//     }
// );


const request = require('postman-request');

const place = encodeURIComponent('Padang Barat');
const geocodeURL = `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=3`;

request(
    {
        url: geocodeURL, json: true,
        headers: { 'User-Agent': 'NetworkProgramming-Project/1.0' }
    },
    (err, res) => {
        if(err || res.body.length === 0)
            return console.log('Gagal mendapatkan lokasi');

        const { lat, lon, display_name, type } = res.body[0];
        console.log(`Koordinat lokasi anda adalah ${lat}, ${lon}`);
        console.log(`Data yang anda cari adalah: ${decodeURIComponent(place)}`);
        console.log(`Data yang ditemukan adalah: ${display_name}`);
        console.log(`Tipe lokasi adalah: ${type}`);

        const weatherURL = `http://api.weatherstack.com/current?access_key=9c1b3a3b00ed8d8e3cb8452370bc20d4&query=${lat},${lon}`;

        request(
            {url: weatherURL},
            (err, res) => {
                if (err || res.body.error)
                    return console.log('Gagal mendapatkan data cuaca.');

                const { current, location } = JSON.parse(res.body);
                console.log(
                    `Saat ini suhu di ${location.name} mencapai ${current.temperature} derajat celcius.`
                );
                console.log(
                    `Kemungkinan terjadinya hujan adalah ${current.precip}%`
                );
            }
        );
    }
);