const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/prediksiCuaca');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const app = express();
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// setup handlewars engine dan lokasi folder views
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// static dir
app.use(express.static(publicDir));

app.get('', (_, res) => {
    res.render('index', {
        title: 'Aplikasi Cek Cuaca',
        judul: 'Aplikasi Cek Cuaca',
        nama: 'M Ilham'
    });
});

app.get('/bantuan', (_, res) => {
    res.render('bantuan', {
        title: 'Bantuan',
        judul: 'Bantuan',
        nama: 'M Ilham',
        teksBantuan: 'ini adalah teks bantuan'
    });
});

app.get('/infoCuaca', (req, res) => {
    if(!req.query.address){
        return res.send({
            err: ' Kamu harus memasukkan lokasi yang ingin dicari'
        });
    }
    
    function geoCallback(err, {latitude, longitude, location} = {}){
        if(err) return res.send({err});
     
        function forecastCallback(err, dataPrediksi){
            if(err) return res.send({err});
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            });
        }
        forecast(latitude, longitude, forecastCallback);
    };

    geocode(req.query.address, geoCallback);
});

app.get('/tentang', (_, res) => {
    res.render('tentang', {
        title: 'Tentang',
        judul: 'Tentang Saya',
        nama: 'M Ilham',
    });
});

app.get('/bantuan/*', (_, res) => {
    res.render('404', {
        title: '404',
        judul: '404',
        nama: 'M. Ilham',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});

app.get('*', (_, res) => {
    res.render('404', {
        title: '404',
        judul: '404',
        nama: 'M. Ilham',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    });
});



app.listen(4000, () => {
    console.log(`Server berjalan pada port 4000.`);
})